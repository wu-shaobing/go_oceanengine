package middleware

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/oceanengine/ad_open_sdk_go/config"
)

// Test redactHeaders functionality
func TestRedactHeaders(t *testing.T) {
	h := http.Header{}
	h.Set("Access-Token", "secret123")
	h.Set("Authorization", "Bearer token")
	h.Set("Content-Type", "application/json")
	h.Set("X-Api-Key", "key456")

	redacted := redactHeaders(h)

	if redacted.Get("Access-Token") != "[REDACTED]" {
		t.Errorf("Access-Token should be redacted, got: %s", redacted.Get("Access-Token"))
	}
	if redacted.Get("Authorization") != "[REDACTED]" {
		t.Errorf("Authorization should be redacted, got: %s", redacted.Get("Authorization"))
	}
	if redacted.Get("X-Api-Key") != "[REDACTED]" {
		t.Errorf("X-Api-Key should be redacted, got: %s", redacted.Get("X-Api-Key"))
	}
	if redacted.Get("Content-Type") != "application/json" {
		t.Errorf("Content-Type should not be redacted, got: %s", redacted.Get("Content-Type"))
	}
}

// Test LogMiddleware with logging disabled
func TestLogMiddleware_Disabled(t *testing.T) {
	called := false
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		called = true
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(bytes.NewBufferString("OK")),
		}, nil
	}

	mw := LogMiddleware(next)
	ctx := context.Background()
	req := httptest.NewRequest("GET", "http://example.com", nil)

	resp, err := mw(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
	if !called {
		t.Error("Next middleware should have been called")
	}
	if resp.StatusCode != 200 {
		t.Errorf("Expected status 200, got: %d", resp.StatusCode)
	}
}

// Test LogMiddleware with logging enabled
func TestLogMiddleware_Enabled(t *testing.T) {
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		return &http.Response{
			StatusCode: 200,
			Body:       io.NopCloser(bytes.NewBufferString("response body")),
			Header:     http.Header{"Content-Type": []string{"application/json"}},
		}, nil
	}

	mw := LogMiddleware(next)
	ctx := context.WithValue(context.Background(), config.ContextEnableLog, true)
	req := httptest.NewRequest("GET", "http://example.com", nil)
	req.Header.Set("Access-Token", "secret")

	resp, err := mw(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
	if resp.StatusCode != 200 {
		t.Errorf("Expected status 200, got: %d", resp.StatusCode)
	}

	// Verify response body can still be read after logging
	body, _ := io.ReadAll(resp.Body)
	if string(body) != "response body" {
		t.Errorf("Expected 'response body', got: %s", string(body))
	}
}

// Test RetryMiddleware with no retries needed
func TestRetryMiddleware_Success(t *testing.T) {
	callCount := 0
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		callCount++
		return &http.Response{StatusCode: 200}, nil
	}

	mw := RetryMiddleware(RetryOptions{MaxRetries: 2})
	ctx := context.Background()
	req := httptest.NewRequest("GET", "http://example.com", nil)

	resp, err := mw(next)(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
	if callCount != 1 {
		t.Errorf("Expected 1 call, got: %d", callCount)
	}
	if resp.StatusCode != 200 {
		t.Errorf("Expected status 200, got: %d", resp.StatusCode)
	}
}

// Test RetryMiddleware with 429 status
func TestRetryMiddleware_Retry429(t *testing.T) {
	callCount := 0
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		callCount++
		if callCount < 3 {
			return &http.Response{StatusCode: 429}, nil
		}
		return &http.Response{StatusCode: 200}, nil
	}

	mw := RetryMiddleware(RetryOptions{MaxRetries: 2})
	ctx := context.Background()
	req := httptest.NewRequest("GET", "http://example.com", nil)

	resp, err := mw(next)(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
	if callCount != 3 {
		t.Errorf("Expected 3 calls (1 initial + 2 retries), got: %d", callCount)
	}
	if resp.StatusCode != 200 {
		t.Errorf("Expected final status 200, got: %d", resp.StatusCode)
	}
}

// Test RetryMiddleware doesn't retry POST
func TestRetryMiddleware_NoRetryPost(t *testing.T) {
	callCount := 0
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		callCount++
		return &http.Response{StatusCode: 500}, nil
	}

	mw := RetryMiddleware(RetryOptions{MaxRetries: 2})
	ctx := context.Background()
	req := httptest.NewRequest("POST", "http://example.com", nil)

	resp, err := mw(next)(ctx, req)

	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
	if callCount != 1 {
		t.Errorf("Expected only 1 call (no retries for POST), got: %d", callCount)
	}
	if resp.StatusCode != 500 {
		t.Errorf("Expected status 500, got: %d", resp.StatusCode)
	}
}

// Test AuthMiddleware
func TestAuthMiddleware(t *testing.T) {
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		if req.Header.Get("Access-Token") != "test-token" {
			t.Error("Access-Token header not set correctly")
		}
		return &http.Response{StatusCode: 200}, nil
	}

	mw := AuthMiddleware(next)
	ctx := context.WithValue(context.Background(), config.ContextAccessToken, "test-token")
	req := httptest.NewRequest("GET", "http://example.com", nil)

	_, err := mw(ctx, req)
	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
}

// Test HeaderMiddleware
func TestHeaderMiddleware(t *testing.T) {
	next := func(ctx context.Context, req *http.Request) (*http.Response, error) {
		sdkVersion := req.Header.Get("X-Sdk-Version")
		sdkSource := req.Header.Get("X-Sdk-Source")
		
		if !strings.Contains(sdkVersion, "1.1") {
			t.Errorf("X-Sdk-Version header incorrect: %s", sdkVersion)
		}
		if sdkSource != "api-sdk" {
			t.Errorf("X-Sdk-Source header incorrect: %s", sdkSource)
		}
		return &http.Response{StatusCode: 200}, nil
	}

	mw := HeaderMiddleware(next)
	ctx := context.Background()
	req := httptest.NewRequest("GET", "http://example.com", nil)

	_, err := mw(ctx, req)
	if err != nil {
		t.Errorf("Expected no error, got: %v", err)
	}
}

// Test isText helper
func TestIsText(t *testing.T) {
	tests := []struct {
		name     string
		input    []byte
		expected bool
	}{
		{"plain text", []byte("Hello World"), true},
		{"json", []byte(`{"key": "value"}`), true},
		{"with tab", []byte("hello\tworld"), true},
		{"with newline", []byte("hello\nworld"), true},
		{"binary data", []byte{0x00, 0x01, 0x02}, false},
		{"null byte", []byte("hello\x00world"), false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isText(tt.input)
			if result != tt.expected {
				t.Errorf("isText(%q) = %v, want %v", tt.input, result, tt.expected)
			}
		})
	}
}

// Test firstN helper
func TestFirstN(t *testing.T) {
	tests := []struct {
		name     string
		input    []byte
		n        int
		expected []byte
	}{
		{"shorter than n", []byte("hello"), 10, []byte("hello")},
		{"exactly n", []byte("hello"), 5, []byte("hello")},
		{"longer than n", []byte("hello world"), 5, []byte("hello")},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := firstN(tt.input, tt.n)
			if string(result) != string(tt.expected) {
				t.Errorf("firstN(%q, %d) = %q, want %q", tt.input, tt.n, result, tt.expected)
			}
		})
	}
}
