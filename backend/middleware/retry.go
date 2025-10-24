package middleware

import (
	"context"
	"math"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/oceanengine/ad_open_sdk_go/api"
)

// RetryOptions controls retry behavior.
// Defaults: MaxRetries=2, InitialBackoff=200ms, MaxBackoff=2s, RetryMethods=["GET"].
type RetryOptions struct {
	MaxRetries     int
	InitialBackoff time.Duration
	MaxBackoff     time.Duration
	RetryMethods   []string
}

func (o *RetryOptions) withDefaults() RetryOptions {
	ro := *o
	if ro.MaxRetries <= 0 {
		ro.MaxRetries = 2
	}
	if ro.InitialBackoff <= 0 {
		ro.InitialBackoff = 200 * time.Millisecond
	}
	if ro.MaxBackoff <= 0 {
		ro.MaxBackoff = 2 * time.Second
	}
	if len(ro.RetryMethods) == 0 {
		ro.RetryMethods = []string{"GET"}
	}
	return ro
}

// RetryMiddleware adds simple retry with exponential backoff (+ jitter) for idempotent requests.
func RetryMiddleware(opts RetryOptions) api.Middleware {
	ro := opts.withDefaults()
	allowed := make(map[string]struct{}, len(ro.RetryMethods))
	for _, m := range ro.RetryMethods {
		allowed[strings.ToUpper(m)] = struct{}{}
	}

	return func(next api.Endpoint) api.Endpoint {
		return func(ctx context.Context, req *http.Request) (*http.Response, error) {
			if _, ok := allowed[strings.ToUpper(req.Method)]; !ok {
				return next(ctx, req)
			}
			var (
				resp *http.Response
				err  error
			)
			for attempt := 0; attempt <= ro.MaxRetries; attempt++ {
				resp, err = next(ctx, req)
				if !shouldRetry(resp, err) || attempt == ro.MaxRetries {
					return resp, err
				}
				// backoff with jitter
				d := backoff(ro.InitialBackoff, attempt)
				if d > ro.MaxBackoff {
					d = ro.MaxBackoff
				}
				// jitter 0-100ms
				j := time.Duration(rand.Intn(100)) * time.Millisecond
				select {
				case <-ctx.Done():
					return nil, ctx.Err()
				case <-time.After(d + j):
				}
			}
			return resp, err
		}
	}
}

func shouldRetry(resp *http.Response, err error) bool {
	if err != nil {
		return true
	}
	if resp == nil {
		return true
	}
	switch resp.StatusCode {
	case http.StatusTooManyRequests:
		return true
	case http.StatusInternalServerError, http.StatusBadGateway, http.StatusServiceUnavailable, http.StatusGatewayTimeout:
		return true
	default:
		return false
	}
}

func backoff(base time.Duration, attempt int) time.Duration {
	pow := math.Pow(2, float64(attempt))
	return time.Duration(float64(base) * pow)
}
