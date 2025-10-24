# OAuth 授权完成指南

## 当前状态

✅ **已完成：**
- 千川应用已上线 (App ID: 1846842779198378)
- 巨量广告应用已上线 (App ID: 1846842779198394)
- 后端OAuth回调处理器 (`/callback`)
- 前端OAuth测试工具 (`/oauth-test.html`)
- postMessage通信机制

⏳ **需要完成：**
- 获取有效的access_token
- 配置到 `.env` 文件
- 重启后端服务器

## 问题诊断

### 问题1: Authorization code 已过期
**现象：** 使用之前的auth_code返回HTML页面而不是JSON

**原因：** 
- Authorization code 有效期只有10分钟
- 每个code只能使用一次
- 使用过的code会被立即失效

**解决方案：** 重新进行OAuth授权获取新code

### 问题2: 后端参数不匹配
**现象：** 后端获取 `code` 参数为空

**原因：** 
- 千川回调返回 `auth_code` 参数
- 后端代码中获取的是 `code` 参数

**解决方案：** 修改后端代码或确认千川回调URL参数

## 完整OAuth流程（推荐方案）

### 方案A：使用OAuth测试工具 + 手动交换Token

#### 步骤1: 获取Authorization Code
```bash
# 1. 确保前端正在运行
cd /Users/wushaobing911/Desktop/go/frontend
pnpm dev

# 2. 打开OAuth测试工具
# 浏览器访问: http://localhost:3001/oauth-test.html

# 3. 点击"千川授权测试"按钮
# 4. 在弹出窗口中完成授权
# 5. 授权成功后，复制显示的 auth_code
```

#### 步骤2: 立即交换Access Token
```bash
# 在10分钟内执行以下命令（替换 YOUR_AUTH_CODE）
curl -X POST 'https://qianchuan.jinritemai.com/open_api/oauth2/access_token/' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "app_id": 1846842779198378,
    "secret": "b541c7b611dc34b0755802818539631b5d766d67",
    "auth_code": "YOUR_AUTH_CODE"
  }' | jq '.'
```

#### 步骤3: 保存Token到环境变量
```bash
# 编辑 .env 文件
cd /Users/wushaobing911/Desktop/go/backend
nano .env

# 添加以下内容（替换为实际的token）
QIANCHUAN_ACCESS_TOKEN=your_access_token_here
QIANCHUAN_REFRESH_TOKEN=your_refresh_token_here
QIANCHUAN_ADVERTISER_ID=your_advertiser_id_here
```

#### 步骤4: 重启后端服务器
```bash
# 停止当前服务器 (Ctrl+C)
# 重新启动
cd /Users/wushaobing911/Desktop/go/backend
go run cmd/proxy/main.go
```

### 方案B：修改后端自动交换Token（推荐）

创建一个增强版的callback处理器，自动交换token并保存到 `.env`。

#### 修改建议：

```go
// 在 backend/cmd/proxy/main.go 的 handleCallback 中添加

func (s *ProxyServer) handleCallback(w http.ResponseWriter, r *http.Request) {
    // 同时支持 code 和 auth_code 参数
    authCode := r.URL.Query().Get("auth_code")
    if authCode == "" {
        authCode = r.URL.Query().Get("code")
    }
    state := r.URL.Query().Get("state")
    appID := r.URL.Query().Get("app_id")
    
    if authCode == "" {
        http.Error(w, "Missing authorization code", http.StatusBadRequest)
        return
    }
    
    log.Printf("[OAuth] Received: code=%s, state=%s, app_id=%s", authCode, state, appID)
    
    // 自动交换token
    go s.exchangeTokenAndSave(authCode, appID)
    
    // 返回成功页面...
}

func (s *ProxyServer) exchangeTokenAndSave(authCode, appID string) {
    // 1. 调用token交换API
    // 2. 解析响应获取 access_token, refresh_token
    // 3. 更新 .env 文件
    // 4. 打印成功信息
}
```

## API 参数说明

### 千川Token交换API
```
POST https://qianchuan.jinritemai.com/open_api/oauth2/access_token/
Content-Type: application/json

Request:
{
  "app_id": 1846842779198378,
  "secret": "b541c7b611dc34b0755802818539631b5d766d67",
  "auth_code": "your_authorization_code"
}

Success Response:
{
  "code": 0,
  "message": "OK",
  "data": {
    "access_token": "xxx",
    "refresh_token": "xxx",
    "expires_in": 86400,
    "advertiser_ids": [123456789]
  }
}

Error Response:
{
  "code": 40002,
  "message": "授权码已过期或无效"
}
```

### 千川OAuth回调参数
千川回调URL格式：
```
http://localhost:8080/callback?
  uid=2265468344478205&
  app_id=1846842779198378&
  material_auth_status=1&
  state=qc_xxxxx&
  auth_code=xxxxxxxxxxxx&
  scope=[...]
```

**注意：** 参数名是 `auth_code` 不是 `code`！

## 调试技巧

### 1. 查看后端日志
```bash
# 后端会打印OAuth回调信息
[OAuth] Received: code=xxx, state=xxx, app_id=xxx
```

### 2. 查看浏览器控制台
```javascript
// OAuth测试工具会打印详细日志
[OAuth Test] 收到 postMessage: {"type":"oauth_callback","code":"xxx","state":"xxx"}
```

### 3. 测试Token是否有效
```bash
# 使用获取的access_token测试API
curl -X GET 'https://qianchuan.jinritemai.com/open_api/v1.0/advertiser/info/' \\
  -H 'Access-Token: YOUR_ACCESS_TOKEN' \\
  -H 'Content-Type: application/json'
```

## 常见错误

### 错误1: `code 40002` - 授权码已过期
**解决方案：** 重新授权获取新的auth_code

### 错误2: `code 40004` - access_token 无效
**解决方案：** 使用refresh_token刷新access_token

### 错误3: 回调参数为空
**解决方案：** 
- 检查OAuth应用配置的回调URL是否正确
- 确认后端代理服务器正在运行
- 查看后端日志确认收到回调请求

## 下一步行动

1. ✅ 刷新浏览器页面（前端修复已完成）
2. 🔄 重新进行OAuth授权：访问 `http://localhost:3001/oauth-test.html`
3. ⚡ 立即交换token（10分钟内）
4. 💾 保存到 `.env` 文件
5. 🔄 重启后端服务器
6. ✨ 开始使用真实API数据

## Token刷新

Access token 过期后，使用refresh token刷新：

```bash
curl -X POST 'https://qianchuan.jinritemai.com/open_api/oauth2/refresh_token/' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "app_id": 1846842779198378,
    "secret": "b541c7b611dc34b0755802818539631b5d766d67",
    "refresh_token": "YOUR_REFRESH_TOKEN"
  }'
```

## 参考资料

- 千川开放平台: https://qianchuan.jinritemai.com/openapi/qc/doc
- 巨量开放平台: https://open.oceanengine.com/doc/
- OAuth 2.0 RFC: https://tools.ietf.org/html/rfc6749
