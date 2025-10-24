# AI智能投放 - 巨量引擎广告管理平台

<div align="center">

![Go Version](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript)

**AI智能投放 - 基于巨量引擎 Marketing API 的智能广告管理系统**

[功能特性](#功能特性) • [快速开始](#快速开始) • [项目架构](#项目架构) • [开发指南](#开发指南)

</div>

---

## 📋 项目概述

本项目是基于**巨量引擎 Marketing API Go SDK** 的全栈示例应用，展示如何构建完整的广告管理系统。采用前后端分离架构，提供从API调用到UI展示的完整解决方案。

### 适用场景

- ✅ 广告投放管理系统开发
- ✅ 营销数据分析平台搭建
- ✅ 巨量引擎API集成参考
- ✅ Go + React 全栈项目模板

---

## 🔑 功能特性

### 双应用支持

- 🎯 **AI智能千川** - 巨量千川电商直播带货 (App ID: 1846842779198378)
- 📢 **AI智能广告** - 巨量广告Pc版信息流广告 (App ID: 1846842779198394)
- 🔐 **OAuth授权** - 完整的OAuth 2.0授权流程
- 🎨 **可视化授权助手** - 一键开始授权

### 前端功能

- 🎨 **现代化UI** - Ant Design 5.x，支持深色/浅色主题
- 📊 **数据可视化** - Recharts 图表，实时数据分析
- 🔄 **状态管理** - Zustand + React Query
- 🌐 **路由管理** - React Router v7
- 📱 **响应式布局** - 适配桌面和移动设备
- 🎯 **类型安全** - 完整 TypeScript 类型定义
- ✅ **单元测试** - Vitest + Testing Library

### 后端功能

- 🚀 **API代理服务** - CORS处理，请求转发
- 🔐 **认证中间件** - Access Token 自动注入
- 🔑 **OAuth回调** - 完整的授权回调处理
- 📝 **请求日志** - 完整日志记录
- 🔄 **重试机制** - 自动重试失败请求
- 🛡️ **错误处理** - 统一错误处理
- 📦 **SDK集成** - 完整API调用示例

---

## 🛠 技术栈

### 前端
- React 18.2 + TypeScript 5.5
- Vite 5.2 (构建工具)
- Ant Design 5.27 (UI组件)
- React Query 5.50 (数据管理)
- Zustand 4.5 (状态管理)
- Recharts 3.3 (图表)
- Axios 1.12 (HTTP客户端)
- Vitest 3.2 (测试框架)
- Tailwind CSS 3.4

### 后端
- Go 1.21+
- 巨量引擎 SDK 1.1.71
- net/http 标准库

---

## 🏗 项目架构

```
/Users/wushaobing911/Desktop/go/
├── frontend/                          # 前端项目
│   ├── src/
│   │   ├── components/               # 组件
│   │   │   ├── business/            # 业务组件
│   │   │   ├── layout/              # 布局组件
│   │   │   ├── ui/                  # UI组件
│   │   │   └── __tests__/           # 测试
│   │   ├── pages/                   # 页面
│   │   ├── hooks/                   # 自定义Hooks
│   │   ├── lib/api/                 # API客户端
│   │   ├── store/                   # 状态管理
│   │   └── types/                   # TS类型
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                          # 后端项目
│   ├── cmd/proxy/main.go            # 主程序
│   ├── middleware/                  # 中间件
│   ├── config/                      # 配置
│   ├── models/                      # 数据模型 (2000+ files)
│   ├── api/                         # API客户端
│   └── go.mod
│
├── .WARP/agents/                    # 91个AI Agent
├── .mcp.json                        # MCP任务配置
├── .env.example
└── README.md
```

### 系统架构

```
浏览器 → React Frontend (5173)
           ↓
       HTTP /api/*
           ↓
    Go Proxy Server (8080)
    - CORS Handler
    - Auth Middleware
    - Log Middleware
    - Retry Mechanism
           ↓
    Marketing API SDK
           ↓
    巨量引擎 API
    (api.oceanengine.com)
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0
- Go >= 1.21
- 巨量引擎账号 ([注册](https://open.oceanengine.com/))

### 1. 选择应用配置

项目支持两个应用：

**巨量千川**：
```bash
cp .env.qianchuan .env
# App ID: 1846842779198378
# 授权: http://localhost:5173/oauth-helper.html
```

**巨量广告**：
```bash
cp .env.juliangguanggao .env
# App ID: 1846842779198394
# 授权: http://localhost:5173/oauth-oceanengine.html
```

### 2. OAuth 授权获取 Token

**使用可视化授权助手**：

千川授权：`http://localhost:5173/oauth-helper.html`  
广告授权：`http://localhost:5173/oauth-oceanengine.html`

或者**手动打开授权链接**：

```javascript
// 千川：浏览器控制台运行
window.open('https://qianchuan.jinritemai.com/openapi/qc/audit/oauth.html?app_id=1846842779198378&state=test&material_auth=1&rid=wce13kagvdd&redirect_uri=http://localhost:8080/callback');

// 广告：浏览器控制台运行
window.open('https://open.oceanengine.com/audit/oauth.html?app_id=1846842779198394&state=test&material_auth=1&rid=b5757qizsb5&redirect_uri=http://localhost:8080/callback');
```

授权后编辑 `.env` 文件：
```bash
ACCESS_TOKEN=获取到的token
ADVERTISER_ID=获取到的广告主ID
```

### 3. 启动后端

```bash
cd backend
go run cmd/proxy/main.go
```

验证：`curl http://localhost:8080/health`

### 4. 启动前端

```bash
cd frontend
npm install
npm run dev
```

### 5. 访问应用

浏览器打开: **http://localhost:5173**

---

## 💻 开发指南

### 前端开发

#### 常用命令
```bash
npm run dev          # 开发服务器
npm run build        # 生产构建
npm run lint         # 代码检查
npm run test         # 运行测试
npm run test:ui      # 测试UI
```

#### 添加新页面
```typescript
// src/pages/NewPage.tsx
export default function NewPage() {
  return <div>Content</div>
}

// App.tsx
<Route path="new-page" element={<NewPage />} />
```

#### API调用
```typescript
import { useProjects } from '@/hooks'

function ProjectList() {
  const { data, isLoading } = useProjects({ page: 1 })
  return <Table data={data?.list} loading={isLoading} />
}
```

### 后端开发

#### 常用命令
```bash
go run cmd/proxy/main.go              # 启动
go test ./...                         # 测试
go build -o bin/proxy cmd/proxy/main.go  # 构建
```

#### 添加API端点
```go
func (s *ProxyServer) handleNewAPI(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "code": 0,
        "data": "Hello",
    })
}

// 注册路由
mux.HandleFunc("/api/new", server.corsMiddleware(server.handleNewAPI))
```

---

## 🧪 测试

### 前端测试
```bash
cd frontend
npm run test         # 运行测试
npm run test:coverage # 覆盖率报告
```

**测试状态**:
- ✅ 16个测试，15个通过
- ✅ Button组件 (5/5)
- ✅ Input组件 (6/6)
- ⚠️ Table组件 (4/5)

### 后端测试
```bash
cd backend
go test ./... -v
```

**测试状态**:
- ✅ config包 - 全部通过
- ✅ middleware包 - 全部通过
- ⚠️ tools包 - 编译失败
- ⚠️ examples包 - 编译失败

---

## 📦 部署

### 前端构建
```bash
cd frontend
npm run build
# 产物在 dist/ 目录
```

### 后端构建
```bash
cd backend
go build -o bin/proxy cmd/proxy/main.go

# 交叉编译
GOOS=linux GOARCH=amd64 go build -o bin/proxy-linux cmd/proxy/main.go
```

### Docker部署

```dockerfile
# Dockerfile示例
FROM golang:1.21-alpine AS backend
WORKDIR /app
COPY backend/ .
RUN go build -o proxy cmd/proxy/main.go

FROM node:18-alpine AS frontend
WORKDIR /app
COPY frontend/ .
RUN npm ci && npm run build

FROM alpine:latest
COPY --from=backend /app/proxy .
COPY --from=frontend /app/dist ./frontend/dist
EXPOSE 8080
CMD ["./proxy"]
```

```bash
docker build -t marketing-sdk .
docker run -p 8080:8080 --env-file .env marketing-sdk
```

---

## ⚠️ 已知问题

### 严重问题

1. **后端编译错误** - `tools/get_token.go` API签名不匹配
2. **Examples编译失败** - 多个main函数冲突

### 轻微问题

3. **Table组件测试失败** - 空表格测试用例
4. **Ant Design Bundle过大** - 1MB (gzip后315KB)

详见项目Issue列表

---

## ❓ 常见问题

**Q: 后端提示 "ACCESS_TOKEN not set"?**  
A: 检查 `.env` 文件配置或设置环境变量

**Q: 前端无法连接后端?**  
A: 确认后端服务启动，访问 http://localhost:8080/health 验证

**Q: 如何获取Access Token?**  
A: 参考 [官方文档](https://open.oceanengine.com/doc/index.html?id=5)

**Q: 生产环境配置?**  
A: 使用环境变量，启用HTTPS，配置Nginx反向代理

---

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码规范
- 前端: 遵循 ESLint + Prettier
- 后端: 遵循 Go 代码规范 (`go fmt`, `go vet`)

---

## 🔗 相关链接

- [巨量引擎开放平台](https://open.oceanengine.com/)
- [Marketing API文档](https://open.oceanengine.com/doc/index.html)
- [Go SDK GitHub](https://github.com/oceanengine/ad_open_sdk_go)
- [React 官方文档](https://react.dev/)
- [Ant Design 文档](https://ant.design/)

---

<div align="center">

**⭐ 如果对你有帮助，请给个Star！**

Made with ❤️

</div>
