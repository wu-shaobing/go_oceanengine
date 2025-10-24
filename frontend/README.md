# Marketing SDK 前端 (Marketing SDK Frontend)

Vite + React 18 + TypeScript + Tailwind CSS v3 + React Query + Zustand

## 快速开始 (Quickstart)

### 1. 安装依赖

```bash
npm install
# or
yarn
# or
pnpm install
```

### 2. 启动Go代理服务器

⚠️ **重要：前端需要Go代理服务器运行才能访问API**

```bash
# 在项目根目录配置环境变量
cp ../.env.example ../.env
# 编辑 .env 文件，填入你的 ACCESS_TOKEN

# 启动代理服务器
cd ..
go run cmd/proxy/main.go
```

详细代理配置请查看: `../cmd/proxy/README.md`

### 3. 启动前端开发服务器

```bash
npm run dev
```

开发端口由 `.env.development` 的 `VITE_DEV_PORT` 控制（默认 3001）。

打开 http://localhost:3001

## 架构说明

```
浏览器 (http://localhost:3001)
  ↓ Vite Dev Proxy
Go代理服务器 (http://localhost:8080)
  ↓ 添加 Access-Token
巨量引擎API (https://api.oceanengine.com)
```

**安全优势：**
- ✅ Access-Token 保存在后端，前端不再直接持有
- ✅ 避免XSS攻击窃取Token
- ✅ 生产环境更安全

## 说明 (Notes)

- **开发代理**：Vite将 `/api` 请求代理到 `http://localhost:8080`（Go代理服务器）
- **生产环境**：部署Go代理服务器，前端构建后的静态文件与代理一起服务
- **状态管理**：使用 Zustand + React Query 管理前端状态
- **更多**：详见 `docs/` 目录下的文档
