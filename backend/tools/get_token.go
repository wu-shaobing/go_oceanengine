package main

import (
	"context"
	"fmt"
	"log"
	"os"

	ad_open_sdk_go "github.com/oceanengine/ad_open_sdk_go"
	"github.com/oceanengine/ad_open_sdk_go/config"
	"github.com/oceanengine/ad_open_sdk_go/models"
)

// 获取 Access Token 的辅助工具
// 使用方法：
//   go run tools/get_token.go <auth_code>
//
// 或者使用环境变量：
//   export APP_ID=1842619406722968
//   export SECRET=3d9f1823b2d8c59a8048bfc68f3f6c44ceb8f7d31
//   export AUTH_CODE=your_auth_code
//   go run tools/get_token.go

func main() {
	// 从环境变量或默认值获取配置
	appID := getEnv("APP_ID", "1842619406722968")
	secret := getEnv("SECRET", "3d9f1823b2d8c59a8048bfc68f3f6c44ceb8f7d31")
	authCode := getEnv("AUTH_CODE", "")

	// 如果命令行提供了 auth_code，使用命令行参数
	if len(os.Args) > 1 {
		authCode = os.Args[1]
	}

	if authCode == "" {
		fmt.Println("❌ 错误: 未提供 AUTH_CODE")
		fmt.Println("")
		fmt.Println("使用方法:")
		fmt.Println("  1. 通过命令行参数:")
		fmt.Println("     go run tools/get_token.go <auth_code>")
		fmt.Println("")
		fmt.Println("  2. 通过环境变量:")
		fmt.Println("     export AUTH_CODE=your_auth_code")
		fmt.Println("     go run tools/get_token.go")
		fmt.Println("")
		fmt.Println("如何获取 AUTH_CODE:")
		fmt.Println("  访问以下URL进行授权:")
		fmt.Printf("  https://ad.oceanengine.com/openapi/audit/oauth.html?app_id=%s&state=test&redirect_uri=http://localhost:8080/callback\n", appID)
		fmt.Println("")
		os.Exit(1)
	}

	fmt.Println("🔧 正在获取 Access Token...")
	fmt.Printf("   APP_ID: %s\n", appID)
	fmt.Printf("   Secret: %s...\n", secret[:20])
	fmt.Printf("   Auth Code: %s...\n", authCode[:min(20, len(authCode))])
	fmt.Println("")

	// 初始化 SDK
	cfg := config.NewConfiguration()
	cfg.LogEnable = false // 关闭日志以保持输出清晰
	client := ad_open_sdk_go.Init(cfg)

	// 构建请求
	appIDInt := int64(1842619406722968)
	req := models.Oauth2AccessTokenRequest{
		AppId:     &appIDInt,
		Secret:    &secret,
		GrantType: models.PtrString("auth_code"),
		AuthCode:  &authCode,
	}

	// 调用 API
	resp, httpResp, err := client.Oauth2AccessTokenApi().
		Post(context.Background()).
		Oauth2AccessTokenRequest(req).
		Execute()

	if err != nil {
		log.Printf("❌ 获取 Token 失败: %v\n", err)
		if httpResp != nil {
			log.Printf("   HTTP Status: %d\n", httpResp.StatusCode)
		}
		os.Exit(1)
	}

	// 检查响应
	if resp.Data == nil {
		log.Println("❌ 响应数据为空")
		if resp.Message != nil {
			log.Printf("   错误信息: %s\n", *resp.Message)
		}
		os.Exit(1)
	}

	// 输出结果
	fmt.Println("✅ 成功获取 Access Token!")
	fmt.Println("")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Printf("Access Token:  %s\n", resp.Data.GetAccessToken())
	fmt.Printf("Refresh Token: %s\n", resp.Data.GetRefreshToken())
	fmt.Printf("Expires In:    %d 秒 (约 %d 小时)\n", 
		resp.Data.GetExpiresIn(), 
		resp.Data.GetExpiresIn()/3600)
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("")
	fmt.Println("💡 使用方法:")
	fmt.Println("   1. 设置环境变量:")
	fmt.Printf("      export ACCESS_TOKEN='%s'\n", resp.Data.GetAccessToken())
	fmt.Println("")
	fmt.Println("   2. 启动后端服务:")
	fmt.Println("      ./start-backend.sh")
	fmt.Println("")
	fmt.Println("⚠️  注意: Token 会在一段时间后过期，届时需要使用 Refresh Token 刷新")
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

