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

// OceanengineClient 巨量广告API客户端
type OceanengineClient struct {
	AccessToken  string
	AdvertiserID string
	BaseURL      string
	HTTPClient   *http.Client
}

// NewOceanengineClient 创建巨量广告客户端
func NewOceanengineClient(accessToken, advertiserID string) *OceanengineClient {
	return &OceanengineClient{
		AccessToken:  accessToken,
		AdvertiserID: advertiserID,
		BaseURL:      "https://api.oceanengine.com/open_api/v1.0",
		HTTPClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// GetAdList 获取广告列表
func (c *OceanengineClient) GetAdList(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/ad/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[巨量广告API] 获取广告列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// GetReport 获取报表数据
func (c *OceanengineClient) GetReport(startDate, endDate string) (interface{}, error) {
	url := fmt.Sprintf("%s/report/ad/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"start_date":    startDate,
		"end_date":      endDate,
	}
	
	log.Printf("[巨量广告API] 获取报表数据 - %s 到 %s", startDate, endDate)
	return c.makeRequest("GET", url, body)
}

// GetMaterials 获取素材列表
func (c *OceanengineClient) GetMaterials(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/file/video/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[巨量广告API] 获取素材列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// GetAccountBalance 获取账户余额
func (c *OceanengineClient) GetAccountBalance() (interface{}, error) {
	url := fmt.Sprintf("%s/advertiser/info/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_ids": []string{c.AdvertiserID},
	}
	
	log.Printf("[巨量广告API] 获取账户余额")
	return c.makeRequest("GET", url, body)
}

// GetProjects 获取项目列表（广告计划）
func (c *OceanengineClient) GetProjects(page, pageSize int) (interface{}, error) {
	url := fmt.Sprintf("%s/campaign/get/", c.BaseURL)
	
	body := map[string]interface{}{
		"advertiser_id": c.AdvertiserID,
		"page":          page,
		"page_size":     pageSize,
	}
	
	log.Printf("[巨量广告API] 获取项目列表 - page: %d, size: %d", page, pageSize)
	return c.makeRequest("GET", url, body)
}

// makeRequest 发起HTTP请求
func (c *OceanengineClient) makeRequest(method, url string, body interface{}) (interface{}, error) {
	jsonBody, err := json.Marshal(body)
	if err != nil {
		log.Printf("[巨量广告API] JSON序列化失败: %v", err)
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}
	
	req, err := http.NewRequest(method, url, bytes.NewBuffer(jsonBody))
	if err != nil {
		log.Printf("[巨量广告API] 创建请求失败: %v", err)
		return nil, fmt.Errorf("failed to create request: %w", err)
	}
	
	// 设置请求头
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Access-Token", c.AccessToken)
	
	// 发起请求
	startTime := time.Now()
	resp, err := c.HTTPClient.Do(req)
	if err != nil {
		log.Printf("[巨量广告API] 请求失败: %v", err)
		return nil, fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()
	
	duration := time.Since(startTime)
	
	// 读取响应
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[巨量广告API] 读取响应失败: %v", err)
		return nil, fmt.Errorf("failed to read response: %w", err)
	}
	
	log.Printf("[巨量广告API] 请求完成 - 状态: %d, 耗时: %v, 大小: %d bytes", 
		resp.StatusCode, duration, len(respBody))
	
	// 检查HTTP状态码
	if resp.StatusCode != http.StatusOK {
		log.Printf("[巨量广告API] HTTP错误: %d - %s", resp.StatusCode, string(respBody))
		return nil, fmt.Errorf("API returned status %d", resp.StatusCode)
	}
	
	// 解析响应
	var result map[string]interface{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		log.Printf("[巨量广告API] JSON解析失败: %v", err)
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}
	
	// 检查API业务码
	if code, ok := result["code"].(float64); ok && code != 0 {
		message := result["message"].(string)
		log.Printf("[巨量广告API] 业务错误: code=%v, message=%s", code, message)
		return nil, fmt.Errorf("API error: %s (code: %.0f)", message, code)
	}
	
	return result, nil
}

// RefreshToken 刷新访问令牌
func (c *OceanengineClient) RefreshToken(appID, secret, refreshToken string) (string, string, error) {
	url := "https://api.oceanengine.com/open_api/oauth2/refresh_token/"
	
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
	
	log.Printf("[巨量广告API] Token刷新成功")
	return newAccessToken, newRefreshToken, nil
}
