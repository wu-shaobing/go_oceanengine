package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	ad_open_sdk_go "github.com/oceanengine/ad_open_sdk_go"
	"github.com/oceanengine/ad_open_sdk_go/config"

	"github.com/oceanengine/ad_open_sdk_go/internal/api"
)

// ProxyServer handles API requests from frontend
type ProxyServer struct {
	client            *ad_open_sdk_go.Client
	accessToken       string
	advertiserId      string
	appType           string
	appID             string
	appSecret         string
	refreshToken      string
	qianchuanClient   *api.QianchuanClient
	oceanengineClient *api.OceanengineClient
	useMockData       bool
}

// Config holds server configuration
type Config struct {
	Port         string
	AccessToken  string
	AdvertiserId string
	AppType      string
	AppID        string
	AppSecret    string
	RefreshToken string
}

func loadConfig() *Config {
	return &Config{
		Port:         getEnv("PROXY_PORT", "8080"),
		AccessToken:  getEnv("ACCESS_TOKEN", ""),
		AdvertiserId: getEnv("ADVERTISER_ID", ""),
		AppType:      getEnv("APP_TYPE", "qianchuan"),
		AppID:        getEnv("APP_ID", ""),
		AppSecret:    getEnv("APP_SECRET", ""),
		RefreshToken: getEnv("REFRESH_TOKEN", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// NewProxyServer creates a new proxy server instance
func NewProxyServer(cfg *Config) *ProxyServer {
	sdkConfig := config.NewConfiguration()
	sdkConfig.LogEnable = true
	sdkConfig.UseLogMw = true
	
	client := ad_open_sdk_go.Init(sdkConfig)
	
	s := &ProxyServer{
		client:       client,
		accessToken:  cfg.AccessToken,
		advertiserId: cfg.AdvertiserId,
		appType:      cfg.AppType,
		appID:        cfg.AppID,
		appSecret:    cfg.AppSecret,
		refreshToken: cfg.RefreshToken,
		useMockData:  cfg.AccessToken == "",
	}
	
	// 初始化API客户端
	if cfg.AccessToken != "" && cfg.AdvertiserId != "" {
		if cfg.AppType == "qianchuan" {
			s.qianchuanClient = api.NewQianchuanClient(cfg.AccessToken, cfg.AdvertiserId)
			log.Printf("[初始化] ✅ 千川API客户端已创建 (App ID: %s)", cfg.AppID)
		} else if cfg.AppType == "oceanengine" {
			s.oceanengineClient = api.NewOceanengineClient(cfg.AccessToken, cfg.AdvertiserId)
			log.Printf("[初始化] ✅ 巨量广告API客户端已创建 (App ID: %s)", cfg.AppID)
		}
		s.useMockData = false
		log.Printf("[初始化] 使用真实API数据")
	} else {
		log.Printf("[初始化] ⚠️  ACCESS_TOKEN未配置，将使用Mock数据")
	}
	
	return s
}

// CORS middleware
func (s *ProxyServer) corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next(w, r)
	}
}

// Health check endpoint
func (s *ProxyServer) handleHealth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "ok",
		"service": "marketing-sdk-proxy",
	})
}

// Proxy API requests
// Projects list - support real API and mock fallback
func (s *ProxyServer) handleProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Parse pagination params
	q := r.URL.Query()
	page, _ := strconv.Atoi(q.Get("page"))
	if page == 0 { page = 1 }
	pageSize, _ := strconv.Atoi(q.Get("page_size"))
	if pageSize == 0 { pageSize = 20 }
	
	// Use real API if configured
	if !s.useMockData {
		var data interface{}
		var err error
		
		if s.appType == "qianchuan" && s.qianchuanClient != nil {
			data, err = s.qianchuanClient.GetProjects(page, pageSize)
		} else if s.appType == "oceanengine" && s.oceanengineClient != nil {
			data, err = s.oceanengineClient.GetProjects(page, pageSize)
		}
		
		if err != nil {
			log.Printf("[错误] 获取项目列表失败: %v", err)
			http.Error(w, fmt.Sprintf("获取项目列表失败: %v", err), http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Fallback to mock data
	log.Printf("[Mock] 使用Mock项目数据")
	list := []map[string]any{}
	for i := 0; i < 10; i++ {
		list = append(list, map[string]any{
			"project_id": fmt.Sprintf("%d", 10000+i),
			"name": fmt.Sprintf("示例项目 %d", i+1),
			"status": "AD_STATUS_DELIVERY_OK",
			"landing_type": "LINK",
			"operation": "-",
		})
	}

	resp := map[string]any{
		"code": 0,
		"message": "OK",
		"data": map[string]any{
			"list": list,
			"page_info": map[string]any{
				"page": page,
				"page_size": pageSize,
				"total_number": 100,
			},
		},
	}
	_ = json.NewEncoder(w).Encode(resp)
}

// Ads list - support real API and mock fallback
func (s *ProxyServer) handleAds(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Parse pagination params
	q := r.URL.Query()
	page, _ := strconv.Atoi(q.Get("page"))
	if page == 0 { page = 1 }
	pageSize, _ := strconv.Atoi(q.Get("pageSize"))
	if pageSize == 0 { pageSize = 20 }
	
	// Use real API if configured
	if !s.useMockData {
		var data interface{}
		var err error
		
		if s.appType == "qianchuan" && s.qianchuanClient != nil {
			data, err = s.qianchuanClient.GetAdList(page, pageSize)
		} else if s.appType == "oceanengine" && s.oceanengineClient != nil {
			data, err = s.oceanengineClient.GetAdList(page, pageSize)
		}
		
		if err != nil {
			log.Printf("[错误] 获取广告列表失败: %v", err)
			http.Error(w, fmt.Sprintf("获取广告列表失败: %v", err), http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Fallback to mock data
	log.Printf("[Mock] 使用Mock广告数据")
	list := []map[string]any{}
	for i := 0; i < 15; i++ {
		list = append(list, map[string]any{
			"id": 20000 + i,
			"name": fmt.Sprintf("广告计划 %d", i+1),
			"status": "AD_STATUS_DELIVERY_OK",
			"budget": 5000 + i*100,
			"landing_type": "LINK",
			"advertiser_id": "123456789",
			"project_id": fmt.Sprintf("%d", 10000+i%10),
		})
	}

	resp := map[string]any{
		"code": 0,
		"message": "OK",
		"data": map[string]any{
			"data": list,
			"total": 150,
			"page": page,
			"pageSize": pageSize,
		},
	}
	_ = json.NewEncoder(w).Encode(resp)
}

// Report data - support real API and mock fallback
func (s *ProxyServer) handleReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Parse date params
	q := r.URL.Query()
	startDate := q.Get("start_date")
	endDate := q.Get("end_date")
	
	// Default to last 7 days
	if startDate == "" {
		startDate = time.Now().AddDate(0, 0, -7).Format("2006-01-02")
	}
	if endDate == "" {
		endDate = time.Now().Format("2006-01-02")
	}
	
	// Use real API if configured
	if !s.useMockData {
		var data interface{}
		var err error
		
		if s.appType == "qianchuan" && s.qianchuanClient != nil {
			data, err = s.qianchuanClient.GetReport(startDate, endDate)
		} else if s.appType == "oceanengine" && s.oceanengineClient != nil {
			data, err = s.oceanengineClient.GetReport(startDate, endDate)
		}
		
		if err != nil {
			log.Printf("[错误] 获取报表数据失败: %v", err)
			http.Error(w, fmt.Sprintf("获取报表数据失败: %v", err), http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Fallback to mock data
	log.Printf("[Mock] 使用Mock报表数据")
	data := []map[string]any{}
	for i := 1; i <= 7; i++ {
		data = append(data, map[string]any{
			"date": fmt.Sprintf("2024-01-%02d", 15+i),
			"cost": 5000 + i*500,
			"show": 100000 + i*10000,
			"click": 5000 + i*500,
			"ctr": 5.0 + float64(i)*0.1,
			"conversion": 100 + i*10,
			"cpc": 1.0 + float64(i)*0.05,
			"cpm": 50.0 + float64(i)*2,
		})
	}

	resp := map[string]any{
		"code": 0,
		"message": "OK",
		"data": map[string]any{
			"data": data,
			"summary": map[string]any{
				"cost": 40000,
				"show": 750000,
				"click": 37500,
				"ctr": 5.0,
				"conversion": 750,
				"cpc": 1.07,
				"cpm": 53.33,
			},
		},
	}
	_ = json.NewEncoder(w).Encode(resp)
}

// Material/creative list - support real API and mock fallback
func (s *ProxyServer) handleMaterial(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Parse pagination params
	q := r.URL.Query()
	page, _ := strconv.Atoi(q.Get("page"))
	if page == 0 { page = 1 }
	pageSize, _ := strconv.Atoi(q.Get("page_size"))
	if pageSize == 0 { pageSize = 20 }
	
	// Use real API if configured
	if !s.useMockData {
		var data interface{}
		var err error
		
		if s.appType == "qianchuan" && s.qianchuanClient != nil {
			data, err = s.qianchuanClient.GetMaterials(page, pageSize)
		} else if s.appType == "oceanengine" && s.oceanengineClient != nil {
			data, err = s.oceanengineClient.GetMaterials(page, pageSize)
		}
		
		if err != nil {
			log.Printf("[错误] 获取素材列表失败: %v", err)
			http.Error(w, fmt.Sprintf("获取素材列表失败: %v", err), http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Fallback to mock data
	log.Printf("[Mock] 使用Mock素材数据")
	list := []map[string]any{}
	for i := 0; i < 8; i++ {
		list = append(list, map[string]any{
			"id": 30000 + i,
			"name": fmt.Sprintf("素材 %d", i+1),
			"type": "IMAGE",
			"url": fmt.Sprintf("https://example.com/image_%d.jpg", i),
			"status": "APPROVED",
		})
	}

	resp := map[string]any{
		"code": 0,
		"message": "OK",
		"data": map[string]any{
			"list": list,
			"total": 8,
		},
	}
	_ = json.NewEncoder(w).Encode(resp)
}

// Account balance - support real API and mock fallback
func (s *ProxyServer) handleAccountBalance(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	// Use real API if configured
	if !s.useMockData {
		var data interface{}
		var err error
		
		if s.appType == "qianchuan" && s.qianchuanClient != nil {
			data, err = s.qianchuanClient.GetAccountBalance()
		} else if s.appType == "oceanengine" && s.oceanengineClient != nil {
			data, err = s.oceanengineClient.GetAccountBalance()
		}
		
		if err != nil {
			log.Printf("[错误] 获取账户余额失败: %v", err)
			http.Error(w, fmt.Sprintf("获取账户余额失败: %v", err), http.StatusInternalServerError)
			return
		}
		
		json.NewEncoder(w).Encode(data)
		return
	}
	
	// Fallback to mock data
	log.Printf("[Mock] 使用Mock账户数据")
	resp := map[string]any{
		"code": 0,
		"message": "OK",
		"data": map[string]any{
			"advertiser_id": 123456789,
			"balance": 1000000,
			"cash": 800000,
			"grant": 200000,
		},
	}
	_ = json.NewEncoder(w).Encode(resp)
}

// OAuth 回调处理
func (s *ProxyServer) handleCallback(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	
	// 获取授权码
	authCode := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	
	if authCode == "" {
		http.Error(w, "Missing authorization code", http.StatusBadRequest)
		return
	}
	
	log.Printf("[OAuth] Received auth code: %s, state: %s", authCode, state)
	
	// 返回成功页面
	html := `<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>AI智能投放 - 授权成功</title>
	<style>
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100vh;
			margin: 0;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		}
		.container {
			background: white;
			padding: 3rem;
			border-radius: 1rem;
			box-shadow: 0 20px 60px rgba(0,0,0,0.3);
			text-align: center;
			max-width: 500px;
		}
		.success-icon {
			font-size: 4rem;
			margin-bottom: 1rem;
		}
		h1 { color: #2d3748; margin-bottom: 1rem; }
		.code { 
			background: #f7fafc; 
			padding: 1rem; 
			border-radius: 0.5rem; 
			word-break: break-all;
			font-family: monospace;
			color: #4a5568;
		}
		.tip { color: #718096; margin-top: 1.5rem; }
	</style>
</head>
<body>
	<div class="container">
		<div class="success-icon">✅</div>
		<h1>授权成功！</h1>
		<p>已成功获取授权码</p>
		<div class="code">` + authCode + `</div>
		<p class="tip">请返回应用继续操作<br>页面将3秒后自动关闭</p>
	</div>
	<script>
		console.log('OAuth callback received');
		console.log('Auth code:', '` + authCode + `');
		console.log('State:', '` + state + `');
		
		// 立即发送消息给父窗口
		if (window.opener) {
			console.log('Sending postMessage to opener...');
			window.opener.postMessage({
				type: 'oauth_callback',
				code: '` + authCode + `',
				state: '` + state + `'
			}, '*');
		} else {
			console.warn('No window.opener found');
		}
		
		// 3秒后关闭窗口
		setTimeout(() => {
			console.log('Closing window...');
			window.close();
		}, 3000);
	</script>
</body>
</html>`
	w.Write([]byte(html))
}

func (s *ProxyServer) handleProxy(w http.ResponseWriter, r *http.Request) {
	// Remove /api prefix
	path := strings.TrimPrefix(r.URL.Path, "/api")
	if path == "" {
		path = "/"
	}
	
	// Build upstream URL
	upstreamURL := fmt.Sprintf("https://api.oceanengine.com%s", path)
	if r.URL.RawQuery != "" {
		upstreamURL += "?" + r.URL.RawQuery
	}
	
	log.Printf("[Proxy] %s %s -> %s", r.Method, r.URL.Path, upstreamURL)
	
	// Create upstream request
	upstreamReq, err := http.NewRequest(r.Method, upstreamURL, r.Body)
	if err != nil {
		log.Printf("[Proxy] Error creating request: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	
	// Copy headers (excluding host-specific ones)
	for key, values := range r.Header {
		if key == "Host" || key == "Connection" {
			continue
		}
		for _, value := range values {
			upstreamReq.Header.Add(key, value)
		}
	}
	
	// Add authentication if token is configured
	if s.accessToken != "" {
		upstreamReq.Header.Set("Access-Token", s.accessToken)
		log.Printf("[Proxy] Added Access-Token header")
	}
	
	// Make request
	client := &http.Client{}
	upstreamResp, err := client.Do(upstreamReq)
	if err != nil {
		log.Printf("[Proxy] Error making request: %v", err)
		http.Error(w, "Failed to connect to upstream API", http.StatusBadGateway)
		return
	}
	defer upstreamResp.Body.Close()
	
	// Copy response headers
	for key, values := range upstreamResp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}
	
	// Set status code
	w.WriteHeader(upstreamResp.StatusCode)
	
	// Copy response body
	bodyBytes, err := io.ReadAll(upstreamResp.Body)
	if err != nil {
		log.Printf("[Proxy] Error reading response body: %v", err)
		return
	}
	
	w.Write(bodyBytes)
	
	log.Printf("[Proxy] Response: %d (%d bytes)", upstreamResp.StatusCode, len(bodyBytes))
}

func main() {
	cfg := loadConfig()
	
	if cfg.AccessToken == "" {
		log.Println("[Warning] ACCESS_TOKEN not set - requests will fail authentication")
	}
	
	server := NewProxyServer(cfg)
	
	mux := http.NewServeMux()
	
	// Health check
	mux.HandleFunc("/health", server.corsMiddleware(server.handleHealth))
	
	// Mock APIs for frontend development
	mux.HandleFunc("/api/projects", server.corsMiddleware(server.handleProjects))
	mux.HandleFunc("/api/ads", server.corsMiddleware(server.handleAds))
	mux.HandleFunc("/api/report", server.corsMiddleware(server.handleReport))
	mux.HandleFunc("/api/material", server.corsMiddleware(server.handleMaterial))
	mux.HandleFunc("/api/creative", server.corsMiddleware(server.handleMaterial)) // 复用material
	mux.HandleFunc("/api/account/balance", server.corsMiddleware(server.handleAccountBalance))
	
	// OAuth 回调处理
	mux.HandleFunc("/callback", server.corsMiddleware(server.handleCallback))
	
	// API proxy - fallback to real API
	mux.HandleFunc("/api/", server.corsMiddleware(server.handleProxy))
	
	addr := ":" + cfg.Port
	log.Printf("[Proxy Server] Starting on http://localhost%s", addr)
	log.Printf("[Proxy Server] Proxying to https://api.oceanengine.com")
	log.Printf("[Proxy Server] Health check: http://localhost%s/health", addr)
	
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("[Proxy Server] Failed to start: %v", err)
	}
}
