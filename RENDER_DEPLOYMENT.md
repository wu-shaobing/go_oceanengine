# 🚀 Render.com 免费部署指南

## ✨ 为什么选择 Render？

- ✅ **完全免费** - 无需信用卡
- ✅ **自动 HTTPS** - 免费 SSL 证书
- ✅ **自动部署** - 推送代码自动构建
- ✅ **支持 Go** - 原生支持 Go 应用
- ✅ **免费域名** - 提供 `.onrender.com` 域名
- ✅ **750小时/月** - 足够使用

## 📋 部署步骤

### 第一步：创建 Render 账户

1. **访问** https://render.com
2. 点击 "Get Started" 或 "Sign Up"
3. 选择 "Sign up with GitHub"
4. 授权 Render 访问 GitHub

### 第二步：部署后端服务

#### 2.1 创建新服务
1. 登录后，点击 "New +"
2. 选择 "Web Service"
3. 连接 GitHub 仓库：`wu-shaobing/go_oceanengine`

#### 2.2 配置服务
填写以下信息：

**Name**: `go-oceanengine-backend`

**Region**: 选择 `Oregon (US West)` 或离你最近的区域

**Branch**: `main`

**Root Directory**: `backend`

**Runtime**: `Go`

**Build Command**:
```bash
go build -o main cmd/proxy/main.go
```

**Start Command**:
```bash
./main
```

**Instance Type**: 选择 `Free` (免费)

#### 2.3 添加环境变量
点击 "Advanced"，添加以下环境变量：

```bash
PROXY_PORT=8080
APP_TYPE=qianchuan
APP_ID=1846842779198378
APP_SECRET=b541c7b611dc34b0755802818539631b5d766d67
```

**暂时留空的变量**（后面获取 token 后再添加）：
```bash
QIANCHUAN_ACCESS_TOKEN=
QIANCHUAN_REFRESH_TOKEN=
QIANCHUAN_ADVERTISER_ID=
```

#### 2.4 部署
1. 点击 "Create Web Service"
2. 等待部署完成（约 2-5 分钟）
3. 部署成功后，你会看到一个域名，格式：
   ```
   https://go-oceanengine-backend.onrender.com
   ```

### 第三步：测试后端

访问健康检查接口：
```
https://go-oceanengine-backend.onrender.com/health
```

应该返回：
```json
{
  "status": "ok",
  "service": "marketing-sdk-proxy"
}
```

---

## 第四步：更新 OAuth 回调地址

### 4.1 千川应用配置
1. 访问：https://qianchuan.jinritemai.com/openapi/qc/audit/list
2. 找到应用 (App ID: 1846842779198378)
3. 修改回调地址为：
   ```
   https://go-oceanengine-backend.onrender.com/callback
   ```
4. 提交审核

### 4.2 巨量广告应用配置
1. 访问：https://open.oceanengine.com/app/
2. 找到应用 (App ID: 1846842779198394)
3. 修改回调地址为：
   ```
   https://go-oceanengine-backend.onrender.com/callback
   ```
4. 提交审核

---

## 第五步：部署前端到 GitHub Pages

### 5.1 更新前端 API 地址

编辑本地文件：`frontend/.env.production`
```bash
VITE_API_BASE_URL=https://go-oceanengine-backend.onrender.com
```

### 5.2 推送代码
```bash
cd /Users/wushaobing911/Desktop/go
git add -A
git commit -m "feat: Configure Render deployment"
git push origin main
```

### 5.3 启用 GitHub Pages
1. 访问：https://github.com/wu-shaobing/go_oceanengine/settings/pages
2. Source 选择 "GitHub Actions"
3. 等待自动部署完成

### 5.4 访问前端
```
https://wu-shaobing.github.io/go_oceanengine/
```

---

## 第六步：完成 OAuth 授权

### 6.1 访问 OAuth 测试页面
```
https://wu-shaobing.github.io/go_oceanengine/oauth-test.html
```

### 6.2 进行授权
1. 点击"千川授权测试"
2. 完成授权
3. 授权成功后，查看 Render 日志

### 6.3 查看日志
1. 在 Render Dashboard 找到你的服务
2. 点击 "Logs" 标签
3. 应该能看到：
   ```
   ✅ [Token Exchange] 成功获取 Token！
   📝 Access Token: xxxxx
   ```

### 6.4 更新环境变量
1. 复制日志中的 token 信息
2. 在 Render 服务页面，点击 "Environment"
3. 添加/更新：
   - `QIANCHUAN_ACCESS_TOKEN`
   - `QIANCHUAN_REFRESH_TOKEN`
   - `QIANCHUAN_ADVERTISER_ID`
4. 保存后，Render 会自动重启服务

---

## 🎯 Render 免费套餐说明

### 免费额度
- ✅ 750小时/月运行时间
- ✅ 512MB 内存
- ✅ 自动休眠（15分钟无请求后）
- ✅ 唤醒时间：约 30 秒
- ✅ 免费 SSL 证书
- ✅ 自定义域名支持

### 自动休眠
- 15分钟无请求后自动休眠
- 下次请求时自动唤醒（约30秒）
- 可以设置定时 ping 保持唤醒

### 保持唤醒（可选）
使用 cron-job.org 或 UptimeRobot 定时 ping：
```
https://go-oceanengine-backend.onrender.com/health
```
每 10 分钟 ping 一次即可保持服务运行

---

## 🔧 常见问题

### 1. 部署失败
- 检查 Build Logs
- 确认 Go 版本兼容
- 检查依赖是否完整

### 2. 服务无法访问
- 确认端口设置为 8080
- 检查环境变量是否正确
- 查看服务日志

### 3. OAuth 回调失败
- 确认回调地址审核通过
- 检查后端日志
- 验证 app_secret 正确

### 4. 服务响应慢
- 首次请求需要唤醒（约30秒）
- 考虑使用定时 ping 保持唤醒
- 或升级到付费套餐（$7/月）

---

## 📊 对比：Render vs Railway

| 特性 | Render (免费) | Railway (试用) |
|------|---------------|----------------|
| 需要信用卡 | ❌ 不需要 | ⚠️ 需要验证 |
| 运行时间 | 750小时/月 | 500小时/月 |
| 内存 | 512MB | 512MB |
| 自动休眠 | ✅ 15分钟 | ❌ |
| SSL | ✅ 免费 | ✅ 免费 |
| 自定义域名 | ✅ 支持 | ✅ 支持 |
| 构建时间 | ~2-5分钟 | ~1-3分钟 |

**推荐**: Render 更适合完全免费的部署需求

---

## 🎉 部署完成清单

- [ ] Render 账户创建
- [ ] 后端服务部署成功
- [ ] 获取 Render 域名
- [ ] 更新 OAuth 回调地址（等待审核）
- [ ] 配置前端 API 地址
- [ ] GitHub Pages 部署成功
- [ ] 完成 OAuth 授权
- [ ] 获取并配置 access_token
- [ ] 测试所有功能

---

## 📞 需要帮助？

- Render 文档: https://render.com/docs
- Render 社区: https://community.render.com
- 项目仓库: https://github.com/wu-shaobing/go_oceanengine
