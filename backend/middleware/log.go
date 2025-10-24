package middleware

import (
	"bytes"
	"context"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/oceanengine/ad_open_sdk_go/api"
	"github.com/oceanengine/ad_open_sdk_go/config"
)

const maxBodyLogBytes = 2048

var sensitiveHeaders = []string{
	"Access-Token", "Authorization", "Set-Cookie", "Cookie", "X-Api-Key",
}

func redactHeaders(h http.Header) http.Header {
	if h == nil {
		return nil
	}
	cpy := h.Clone()
	for _, k := range sensitiveHeaders {
		if cpy.Get(k) != "" {
			cpy.Set(k, "[REDACTED]")
		}
	}
	return cpy
}

func firstN(b []byte, n int) []byte {
	if len(b) <= n {
		return b
	}
	return b[:n]
}

func LogMiddleware(next api.Endpoint) api.Endpoint {
	return func(ctx context.Context, req *http.Request) (resp *http.Response, err error) {
		enableLog := ctx.Value(config.ContextEnableLog)
		if enableLog == nil {
			return next(ctx, req)
		}

		start := time.Now()
		// Request line + headers (redacted). Do not read request body to avoid side effects.
		log.Printf("[ad_open_sdk_go] --> %s %s", req.Method, req.URL.String())
		for k, vs := range redactHeaders(req.Header) {
			log.Printf("[ad_open_sdk_go] hdr> %s: %s", k, strings.Join(vs, ", "))
		}

		resp, err = next(ctx, req)
		if err != nil {
			log.Printf("[ad_open_sdk_go] <-- ERROR: %v (dur=%s)", err, time.Since(start))
			return
		}

		// Response status + headers + truncated body; restore body afterward.
		log.Printf("[ad_open_sdk_go] <-- %s (dur=%s)", resp.Status, time.Since(start))
		for k, vs := range redactHeaders(resp.Header) {
			log.Printf("[ad_open_sdk_go] rhdr> %s: %s", k, strings.Join(vs, ", "))
		}

		if resp.Body != nil {
			bodyBytes, _ := io.ReadAll(resp.Body)
			resp.Body.Close()
			resp.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
			toLog := firstN(bodyBytes, maxBodyLogBytes)
			if len(bodyBytes) > maxBodyLogBytes {
				log.Printf("[ad_open_sdk_go] rbody> %s... (%d bytes truncated)", string(toLog), len(bodyBytes)-maxBodyLogBytes)
			} else {
				// Limit potentially binary data by printing as %q when non-printable chars exist
				if isText(toLog) {
					log.Printf("[ad_open_sdk_go] rbody> %s", string(toLog))
				} else {
					log.Printf("[ad_open_sdk_go] rbody> %q", toLog)
				}
			}
		}
		return
	}
}

func isText(b []byte) bool {
	for _, c := range b {
		if c < 0x09 || (c > 0x0D && c < 0x20) {
			return false
		}
	}
	return true
}
