# Marketing SDK Proxy Server

安全的后端代理服务，用于管理巨量引擎API的访问令牌。

## 特性

- ✅ 后端Token管理，避免前端暴露敏感信息
- ✅ CORS支持，允许前端跨域访问
- ✅ 请求日志，方便调试
- ✅ 健康检查端点
- ✅ 环境变量配置

## 使用方法

### 1. 配置环境变量

复制根目录的 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入你的配置：

```env
PROXY_PORT=8080
ACCESS_TOKEN=your_real_access_token
ADVERTISER_ID=your_advertiser_id
```

### 2. 启动代理服务器

```bash
# 从项目根目录运行
go run cmd/proxy/main.go
```

或者构建后运行：

```bash
# 构建
go build -o bin/proxy cmd/proxy/main.go

# 运行
./bin/proxy
```

### 3. 验证服务

访问健康检查端点：

```bash
curl http://localhost:8080/health
```

应该返回：

```json
{
  "status": "ok",
  "service": "marketing-sdk-proxy"
}
```

### 4. 配置前端

更新前端的 Vite 配置（`frontend/vite.config.ts`），将代理指向本地服务器：

```typescript
server: {
  port: 3001,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      // 不需要 rewrite，因为后端会处理 /api 前缀
    }
  }
}
```

## API路径说明

前端请求：`http://localhost:3001/api/open_api/v3.0/project/list?...`  
↓ Vite代理转发  
代理服务器：`http://localhost:8080/api/open_api/v3.0/project/list?...`  
↓ 添加Access-Token  
巨量引擎API：`https://api.oceanengine.com/open_api/v3.0/project/list?...`

## 安全说明

⚠️ **重要**：
- 代理服务器应部署在受信任的内部网络
- 生产环境请添加适当的身份验证和授权
- 使用HTTPS保护通信
- 定期轮换ACCESS_TOKEN
- 不要将 `.env` 文件提交到版本控制

## 开发建议

1. 本地开发时，前后端都运行在本地
2. 生产环境建议使用Docker部署代理服务器
3. 添加监控和告警，跟踪API调用情况
4. 实现请求限流，防止滥用

## 故障排查

### 问题：前端请求失败，提示CORS错误
**解决**：确保代理服务器正在运行，检查Vite代理配置

### 问题：401认证失败
**解决**：检查 `.env` 中的 `ACCESS_TOKEN` 是否正确

### 问题：代理服务器无法启动
**解决**：检查端口8080是否被占用，尝试更改 `PROXY_PORT`
