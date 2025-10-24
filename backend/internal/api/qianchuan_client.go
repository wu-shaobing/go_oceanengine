package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"
)

// QianchuanClient 千川API客户端
type QianchuanClient struct {
	AccessToken  string
	AdvertiserID string
	BaseURL      string
	HTTPClient   *http.Client
}

// NewQianchuanClient 创建千川客户端
func NewQianchuanClient(accessToken, advertiserID string) *QianchuanClient {
	return &QianchuanClient{
		AccessToken:  accessToken,
		AdvertiserID: advertiserID,
		BaseURL:      "https://qianchuan.jinritemai.com/open_api/v1.0",
		HTTPClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// APIResponse 通用API响应结构
type APIResponse struct {
	Code    int                    `json:"code"`
	Message string                 `json:"message"`
	Data    map[string]interface{} `json:"data"`
}

// GetAdList 获取广告列表
func (c *QianchuanClient) GetAdList(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/qianchuan/ad/list/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[千川API] 获取广告列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// GetReport 获取报表数据
func (c *QianchuanClient) GetReport(startDate, endDate string) (interface{}, error) {
	url := fmt.Sprintf("%s/qianchuan/report/ad/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"start_date":    startDate,
		"end_date":      endDate,
	}
	
	log.Printf("[千川API] 获取报表数据 - %s 到 %s", startDate, endDate)
	return c.makeRequest("GET", url, body)
}

// GetMaterials 获取素材列表
func (c *QianchuanClient) GetMaterials(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/qianchuan/file/video/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[千川API] 获取素材列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// GetAccountBalance 获取账户余额
func (c *QianchuanClient) GetAccountBalance() (interface{}, error) {
	url := fmt.Sprintf("%s/qianchuan/advertiser/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
	}
	
	log.Printf("[千川API] 获取账户余额")
	return c.makeRequest("GET", url, body)
}

// GetProjects 获取项目列表（千川推广计划）
func (c *QianchuanClient) GetProjects(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/qianchuan/campaign/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[千川API] 获取项目列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// makeRequest 发起HTTP请求
func (c *QianchuanClient) makeRequest(method, url string, body interface{}) (interface{}, error) {
	jsonBody, err := json.Marshal(body)
	if err != nil {
		log.Printf("[千川API] JSON序列化失败: %v", err)
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}
	
	req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Printf("[千川API] 创建请求失败: %v", err)
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	
	// 设置请求头
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Access-Token", c.AccessToken)
	
	// 发起请求
	startTime := time.Now()
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		log.Printf("[千川API] 请求失败: %v", err)
		return nil, fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()
	
	duration := time.Since(startTime)
	
	// 读取响应
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[千川API] 读取响应失败: %v", err)
		return nil, fmt.Errorf("failed to read response: %w", err)
	}
	
	log.Printf("[千川API] 请求完成 - 状态: %d, 耗时: %v, 大小: %d bytes", 
		resp.StatusCode, duration, len(respBody))
	
	// 检查HTTP状态码
	if resp.StatusCode != http.StatusOK {
		log.Printf("[千川API] HTTP错误: %d - %s", resp.StatusCode, string(respBody))
		return nil, fmt.Errorf("API returned status %d", resp.StatusCode)
	}
	
	// 解析响应
	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		log.Printf("[千川API] JSON解析失败: %v", err)
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}
	
	// 检查API业务码
	if code, ok := result["code"].(float64); ok && code != 0 {
		message := result["message"].(string)
		log.Printf("[千川API] 业务错误: code=%v, message=%s", code, message)
		return nil, fmt.Errorf("API error: %s (code: %.0f)", message, code)
	}
	
	return result, nil
}

// RefreshToken 刷新访问令牌
func (c *QianchuanClient) RefreshToken(appID, secret, refreshToken string) (string, string, error) {
	url := "https://qianchuan.jinritemai.com/open_api/oauth2/refresh_token/"
	
	body := map[string]interface{}{
		"app_id":        appID,
		"secret":        secret,
		"refresh_token": refreshToken,
	}
	
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return "", "", fmt.Errorf("failed to marshal request: %w", err)
	}
	
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", "", fmt.Errorf("failed to create request: %w", err)
	}
	
	req.Header.Set("Content-Type", "application/json")
	
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()
	
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", fmt.Errorf("failed to read response: %w", err)
	}
	
	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return "", "", fmt.Errorf("failed to unmarshal response: %w", err)
	}
	
	if code, ok := result["code"].(float64); ok && code != 0 {
		message := result["message"].(string)
		return "", "", fmt.Errorf("API error: %s", message)
	}
	
	data := result["data"].(map[string]interface{})
	newAccessToken := data["access_token"].(string)
	newRefreshToken := data["refresh_token"].(string)
	
	log.Printf("[千川API] Token刷新成功")
	return newAccessToken, newRefreshToken, nil
}
