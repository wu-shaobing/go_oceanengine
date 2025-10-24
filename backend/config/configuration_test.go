package config

import (
	"net/http"
	"testing"
	"time"
)

func TestNewConfiguration(t *testing.T) {
	cfg := NewConfiguration()

	if cfg.Host != "api.oceanengine.com" {
		t.Errorf("Expected default host 'api.oceanengine.com', got: %s", cfg.Host)
	}

	if cfg.Scheme != "https" {
		t.Errorf("Expected default scheme 'https', got: %s", cfg.Scheme)
	}

	if cfg.LogEnable != false {
		t.Error("Expected LogEnable to be false by default")
	}

	if cfg.UseLogMw != true {
		t.Error("Expected UseLogMw to be true by default")
	}

	if cfg.UserAgent != "Bytedance Ads Openapi SDK" {
		t.Errorf("Expected default user agent, got: %s", cfg.UserAgent)
	}

	if cfg.DefaultHeader == nil {
		t.Error("DefaultHeader should be initialized")
	}
}

func TestAddDefaultHeader(t *testing.T) {
	cfg := NewConfiguration()
	cfg.AddDefaultHeader("X-Custom-Header", "test-value")

	if cfg.DefaultHeader["X-Custom-Header"] != "test-value" {
		t.Errorf("Expected header value 'test-value', got: %s", cfg.DefaultHeader["X-Custom-Header"])
	}
}

func TestGetBasePath(t *testing.T) {
	cfg := NewConfiguration()
	basePath := cfg.GetBasePath()

	expected := "https://api.oceanengine.com"
	if basePath != expected {
		t.Errorf("Expected base path '%s', got: %s", expected, basePath)
	}

	// Test with custom host
	cfg.Host = "custom.example.com"
	cfg.Scheme = "http"
	basePath = cfg.GetBasePath()

	expected = "http://custom.example.com"
	if basePath != expected {
		t.Errorf("Expected base path '%s', got: %s", expected, basePath)
	}
}

func TestCustomHTTPClient(t *testing.T) {
	cfg := NewConfiguration()
	
	customClient := &http.Client{
		Timeout: 60 * time.Second,
	}
	cfg.HTTPClient = customClient

	if cfg.HTTPClient.Timeout != 60*time.Second {
		t.Errorf("Expected custom timeout 60s, got: %v", cfg.HTTPClient.Timeout)
	}
}

func TestContextKeyString(t *testing.T) {
	key := contextKey("test-key")
	str := key.String()

	expected := "ck test-key"
	if str != expected {
		t.Errorf("Expected '%s', got: %s", expected, str)
	}
}

func TestVersion(t *testing.T) {
	if Version == "" {
		t.Error("Version should not be empty")
	}
}
