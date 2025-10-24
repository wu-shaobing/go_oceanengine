# 🚀 部署指南 - 生产环境部署

## 📋 方案概述

- **前端**: GitHub Pages (免费，自动部署)
- **后端**: Railway.app (免费额度，支持Go)
- **域名**: 使用提供的免费域名
- **HTTPS**: 自动配置
- **总成本**: 免费

## 🎯 部署架构

```
用户浏览器
    ↓
GitHub Pages (前端)
    ↓
Railway.app (后端API)
    ↓
千川/巨量API
```

---

## 第一步：部署后端到 Railway

### 1.1 访问 Railway
1. 打开 https://railway.app
2. 点击 "Start a New Project"
3. 选择 "Deploy from GitHub repo"
4. 授权 GitHub 访问
5. 选择 `wu-shaobing/go_oceanengine` 仓库

### 1.2 配置后端项目
在 Railway 项目设置中：

**Root Directory**: `backend`

**Build Command**: 
```bash
go build -o main cmd/proxy/main.go
```

**Start Command**:
```bash
./main
```

### 1.3 配置环境变量
在 Railway 的 "Variables" 标签页添加：

```bash
PROXY_PORT=8080
ACCESS_TOKEN=待获取
ADVERTISER_ID=待获取
APP_TYPE=qianchuan
APP_ID=1846842779198378
APP_SECRET=b541c7b611dc34b0755802818539631b5d766d67
QIANCHUAN_ACCESS_TOKEN=待获取
QIANCHUAN_REFRESH_TOKEN=待获取
QIANCHUAN_ADVERTISER_ID=待获取
```

### 1.4 获取后端域名
部署成功后，Railway 会提供一个域名，格式类似：
```
https://your-app-name.railway.app
```

**记录这个域名！** 后面配置前端时需要用到。

---

## 第二步：配置 OAuth 回调地址

### 2.1 更新千川应用配置
1. 访问：https://qianchuan.jinritemai.com/openapi/qc/audit/list
2. 找到你的应用 (App ID: 1846842779198378)
3. 修改回调地址为：
   ```
   https://your-app-name.railway.app/callback
   ```
4. 保存并等待审核通过

### 2.2 更新巨量广告应用配置
1. 访问：https://open.oceanengine.com/app/
2. 找到你的应用 (App ID: 1846842779198394)
3. 修改回调地址为：
   ```
   https://your-app-name.railway.app/callback
   ```
4. 保存并等待审核通过

---

## 第三步：部署前端到 GitHub Pages

### 3.1 创建 GitHub Actions 工作流

我已经为你创建了自动部署配置文件：`.github/workflows/deploy-frontend.yml`

### 3.2 配置前端环境变量

编辑 `frontend/.env.production`：
```bash
VITE_API_BASE_URL=https://your-app-name.railway.app
```

### 3.3 推送代码触发部署
```bash
cd /Users/wushaobing911/Desktop/go
git add -A
git commit -m "feat: Add production deployment config"
git push origin main
```

### 3.4 启用 GitHub Pages
1. 访问 GitHub 仓库设置
2. 进入 "Pages" 设置
3. Source 选择 "GitHub Actions"
4. 等待部署完成

### 3.5 访问前端应用
部署完成后，访问：
```
https://wu-shaobing.github.io/go_oceanengine/
```

---

## 第四步：完成 OAuth 授权

### 4.1 访问 OAuth 测试页面
```
https://wu-shaobing.github.io/go_oceanengine/oauth-test.html
```

### 4.2 进行授权
1. 点击"千川授权测试"
2. 完成授权
3. 查看 Railway 后端日志

### 4.3 检查 Token
在 Railway 的日志中应该能看到：
```
✅ [Token Exchange] 成功获取 Token！
📝 Access Token: xxxxx
```

### 4.4 更新环境变量
1. 复制获取的 access_token 和 refresh_token
2. 在 Railway 的 Variables 中更新：
   - `QIANCHUAN_ACCESS_TOKEN`
   - `QIANCHUAN_REFRESH_TOKEN`
   - `QIANCHUAN_ADVERTISER_ID`
3. Railway 会自动重启应用

---

## 🔧 故障排查

### 后端无法访问
1. 检查 Railway 部署日志
2. 确认端口配置正确 (8080)
3. 检查环境变量是否设置

### OAuth 回调失败
1. 确认回调地址已更新
2. 等待应用审核通过
3. 检查后端日志

### 前端 API 调用失败
1. 检查 CORS 配置
2. 确认 `VITE_API_BASE_URL` 配置正确
3. 查看浏览器控制台错误

### Token 未保存
1. Railway 不支持文件持久化
2. Token 需要通过环境变量配置
3. 使用数据库存储（可选）

---

## 📊 成本估算

### Railway 免费额度
- ✅ 500小时/月运行时间
- ✅ 512MB 内存
- ✅ 1GB 磁盘空间
- ✅ 自定义域名支持

### GitHub Pages 免费
- ✅ 无限流量
- ✅ HTTPS 自动配置
- ✅ 全球 CDN 加速

### 总成本
**完全免费！** 适合开发和小规模生产环境

---

## 🔐 安全建议

### 1. 环境变量保护
- ❌ 不要将 `.env` 文件提交到 Git
- ✅ 使用 Railway Variables 管理敏感信息
- ✅ 定期轮换 access_token

### 2. API 限流
- 建议添加请求限流中间件
- 监控 API 调用量
- 设置告警

### 3. 日志管理
- 不要记录敏感信息
- 定期清理旧日志
- 使用日志聚合服务

---

## 🎉 部署完成清单

- [ ] Railway 后端部署成功
- [ ] 获取后端域名
- [ ] 更新 OAuth 回调地址
- [ ] GitHub Pages 前端部署成功
- [ ] 完成 OAuth 授权
- [ ] 获取 access_token
- [ ] 更新 Railway 环境变量
- [ ] 测试 API 调用
- [ ] 验证所有功能

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 Railway 部署日志
2. 查看 GitHub Actions 日志
3. 检查浏览器控制台
4. 参考项目文档

## 🔗 相关链接

- Railway 文档: https://docs.railway.app/
- GitHub Pages 文档: https://docs.github.com/pages
- 千川开放平台: https://qianchuan.jinritemai.com/openapi/qc/doc
- 项目仓库: https://github.com/wu-shaobing/go_oceanengine
