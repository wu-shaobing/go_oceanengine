# Warp AI 项目上下文文档

> 本文档专为 **Warp AI** 优化，提供完整的项目上下文和使用指南

---

## 📁 项目概述

**项目名称**: 巨量引擎营销API Go SDK 示例项目  
**项目类型**: 全栈应用 (Go + React + TypeScript)  
**项目根目录**: `/Users/wushaobing911/Desktop/go`

### 核心功能
- 🎯 巨量引擎广告管理系统
- 📊 数据分析和可视化
- 🔄 前后端分离架构
- 🚀 API代理和SDK集成

---

## 🗂 完整目录结构 (绝对路径)

```
/Users/wushaobing911/Desktop/go/
│
├── frontend/                                          # 前端项目根目录
│   ├── src/
│   │   ├── App.tsx                                   # 主应用组件
│   │   ├── main.tsx                                  # 应用入口
│   │   ├── index.css                                 # 全局样式
│   │   │
│   │   ├── components/                               # 组件库
│   │   │   ├── business/                            # 业务组件
│   │   │   │   ├── DataCard.tsx                     # 数据卡片
│   │   │   │   ├── TablePage.tsx                    # 表格页面
│   │   │   │   └── index.ts                         # 导出
│   │   │   ├── layout/                              # 布局组件
│   │   │   │   ├── MainLayout.tsx                   # 主布局
│   │   │   │   └── Layout.tsx                       # 通用布局
│   │   │   ├── ui/                                  # UI组件
│   │   │   │   ├── Button.tsx                       # 按钮
│   │   │   │   ├── Input.tsx                        # 输入框
│   │   │   │   ├── Table.tsx                        # 表格
│   │   │   │   ├── Modal.tsx                        # 模态框
│   │   │   │   ├── Card.tsx                         # 卡片
│   │   │   │   ├── Select.tsx                       # 选择器
│   │   │   │   ├── Spinner.tsx                      # 加载动画
│   │   │   │   ├── Badge.tsx                        # 徽章
│   │   │   │   ├── Pagination.tsx                   # 分页
│   │   │   │   ├── LoadingSkeleton.tsx              # 骨架屏
│   │   │   │   ├── EmptyState.tsx                   # 空状态
│   │   │   │   └── index.ts                         # 导出
│   │   │   ├── ErrorMessage.tsx                     # 错误消息
│   │   │   ├── QueryBoundary.tsx                    # 查询边界
│   │   │   └── __tests__/                           # 组件测试
│   │   │       ├── Button.test.tsx                  # 按钮测试
│   │   │       ├── Input.test.tsx                   # 输入框测试
│   │   │       └── Table.test.tsx                   # 表格测试
│   │   │
│   │   ├── pages/                                   # 页面组件
│   │   │   ├── Home.tsx                             # 首页
│   │   │   ├── ProjectList.tsx                      # 项目列表
│   │   │   ├── AdList.tsx                           # 广告列表
│   │   │   ├── Report.tsx                           # 数据报告
│   │   │   └── property/                            # 资产管理页面
│   │   │       ├── ShopLink.tsx                     # 店铺链接
│   │   │       ├── Audience.tsx                     # 受众管理
│   │   │       ├── TitleLibrary.tsx                 # 标题库
│   │   │       ├── LandingPage.tsx                  # 落地页
│   │   │       ├── AssetCategory.tsx                # 资产分类
│   │   │       ├── OpenUrl.tsx                      # 外链管理
│   │   │       ├── Activity.tsx                     # 活动管理
│   │   │       ├── AudiencePackage.tsx              # DMP人群包
│   │   │       └── EventManagement.tsx              # 事件管理
│   │   │
│   │   ├── hooks/                                   # 自定义Hooks
│   │   │   ├── index.ts                             # Hooks导出
│   │   │   ├── useProjects.ts                       # 项目Hook
│   │   │   ├── useAds.ts                            # 广告Hook
│   │   │   ├── useReport.ts                         # 报告Hook
│   │   │   └── useProperty.ts                       # 资产Hook
│   │   │
│   │   ├── lib/                                     # 工具库
│   │   │   ├── api.ts                               # API工具
│   │   │   ├── api/                                 # API服务层
│   │   │   │   ├── client.ts                        # API客户端
│   │   │   │   ├── error.ts                         # 错误处理
│   │   │   │   ├── index.ts                         # API导出
│   │   │   │   ├── projects.ts                      # 项目API
│   │   │   │   ├── ads.ts                           # 广告API
│   │   │   │   ├── report.ts                        # 报告API
│   │   │   │   ├── shop-link.ts                     # 店铺链接API
│   │   │   │   └── property.ts                      # 资产API
│   │   │   └── utils/                               # 工具函数
│   │   │       ├── cn.ts                            # className工具
│   │   │       └── display.ts                       # 显示工具
│   │   │
│   │   ├── store/                                   # 状态管理
│   │   │   └── auth.ts                              # 认证状态
│   │   │
│   │   ├── contexts/                                # React Context
│   │   │   └── ThemeContext.tsx                     # 主题Context
│   │   │
│   │   ├── types/                                   # TypeScript类型
│   │   │   ├── api.ts                               # API类型
│   │   │   └── models/                              # 数据模型
│   │   │       ├── audience.ts                      # 受众模型
│   │   │       └── shop-link.ts                     # 店铺链接模型
│   │   │
│   │   ├── theme/                                   # 主题配置
│   │   │   └── index.ts                             # 主题导出
│   │   │
│   │   └── test/                                    # 测试配置
│   │       └── setup.ts                             # 测试设置
│   │
│   ├── public/                                       # 静态资源
│   ├── dist/                                         # 构建产物
│   │
│   ├── package.json                                  # 依赖配置
│   ├── vite.config.ts                               # Vite配置
│   ├── tsconfig.json                                # TypeScript配置
│   ├── tsconfig.node.json                           # Node TS配置
│   ├── vitest.config.ts                             # Vitest配置
│   ├── eslint.config.js                             # ESLint配置
│   ├── postcss.config.js                            # PostCSS配置
│   ├── tailwind.config.js                           # Tailwind配置
│   └── playwright.config.ts                         # E2E测试配置
│
├── backend/                                          # 后端项目根目录
│   ├── cmd/                                         # 命令行程序
│   │   └── proxy/
│   │       └── main.go                              # 代理服务器主程序
│   │
│   ├── middleware/                                  # 中间件
│   │   ├── auth.go                                  # 认证中间件
│   │   ├── log.go                                   # 日志中间件
│   │   ├── retry.go                                 # 重试中间件
│   │   ├── header.go                                # Header处理
│   │   └── middleware_test.go                       # 中间件测试
│   │
│   ├── config/                                      # 配置管理
│   │   ├── configuration.go                         # SDK配置
│   │   └── configuration_test.go                    # 配置测试
│   │
│   ├── models/                                      # 数据模型 (2000+ files)
│   │   └── model_*.go                               # 自动生成的模型文件
│   │
│   ├── api/                                         # API客户端 (SDK生成)
│   │
│   ├── examples/                                    # API调用示例
│   │   └── *_example.go                             # 各种API示例
│   │
│   ├── tools/                                       # 工具脚本
│   │   └── get_token.go                             # Token获取工具 (有问题)
│   │
│   ├── client.go                                    # SDK客户端封装
│   ├── go.mod                                       # Go依赖配置
│   └── go.sum                                       # Go依赖锁定
│
├── .WARP/                                           # Warp配置目录
│   └── agents/                                      # AI Agent定义 (91个文件)
│       ├── agents-overview                          # Agent概览
│       └── (其他90个agent文件)
│
├── .mcp.json                                        # MCP任务配置文件
├── .env.example                                     # 环境变量示例
├── .env                                             # 环境变量 (git忽略)
├── .gitignore                                       # Git忽略配置
├── README.md                                        # 项目主文档
└── WARP.md                                          # 本文件
```

---

## 🎯 常用命令速查表

### 前端命令 (frontend/)

```bash
# 开发
npm run dev              # 启动开发服务器 (http://localhost:5173)
npm run build            # 构建生产版本
npm run preview          # 预览生产构建

# 代码质量
npm run lint             # 运行ESLint检查
npm run lint:fix         # 自动修复代码问题
npm run format           # 格式化代码 (Prettier)
npm run format:check     # 检查代码格式

# 测试
npm run test             # 运行所有测试 (watch模式)
npm run test:run         # 运行测试一次
npm run test:ui          # 打开测试UI
npm run test:coverage    # 生成覆盖率报告

# 依赖管理
npm install              # 安装依赖
npm update               # 更新依赖
npm ci                   # 清洁安装 (CI环境)
```

### 后端命令 (backend/)

```bash
# 开发
go run cmd/proxy/main.go                # 启动代理服务器
go build -o bin/proxy cmd/proxy/main.go # 构建可执行文件

# 测试
go test ./...                          # 运行所有测试
go test ./middleware -v                # 运行中间件测试 (详细输出)
go test ./config -v                    # 运行配置测试
go test -cover ./...                   # 测试覆盖率

# 代码质量
go fmt ./...                           # 格式化代码
go vet ./...                           # 静态分析
go mod tidy                            # 整理依赖

# 依赖管理
go mod download                        # 下载依赖
go mod verify                          # 验证依赖
go mod vendor                          # Vendor依赖

# 交叉编译
GOOS=linux GOARCH=amd64 go build -o bin/proxy-linux cmd/proxy/main.go
GOOS=windows GOARCH=amd64 go build -o bin/proxy.exe cmd/proxy/main.go
GOOS=darwin GOARCH=amd64 go build -o bin/proxy-darwin cmd/proxy/main.go
```

---

## 📍 关键文件位置索引

### 前端核心文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 主应用 | `/Users/wushaobing911/Desktop/go/frontend/src/App.tsx` | 路由和应用入口 |
| 主布局 | `/Users/wushaobing911/Desktop/go/frontend/src/components/layout/MainLayout.tsx` | 侧边栏和导航 |
| API客户端 | `/Users/wushaobing911/Desktop/go/frontend/src/lib/api/client.ts` | HTTP客户端配置 |
| Vite配置 | `/Users/wushaobing911/Desktop/go/frontend/vite.config.ts` | 构建和开发服务器 |
| TS配置 | `/Users/wushaobing911/Desktop/go/frontend/tsconfig.json` | TypeScript配置 |
| 测试配置 | `/Users/wushaobing911/Desktop/go/frontend/vitest.config.ts` | Vitest配置 |

### 后端核心文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 主程序 | `/Users/wushaobing911/Desktop/go/backend/cmd/proxy/main.go` | 代理服务器入口 |
| SDK客户端 | `/Users/wushaobing911/Desktop/go/backend/client.go` | SDK客户端封装 |
| 认证中间件 | `/Users/wushaobing911/Desktop/go/backend/middleware/auth.go` | Token认证 |
| 日志中间件 | `/Users/wushaobing911/Desktop/go/backend/middleware/log.go` | 请求日志 |
| Go配置 | `/Users/wushaobing911/Desktop/go/backend/go.mod` | Go依赖 |

### 配置文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 环境变量 | `/Users/wushaobing911/Desktop/go/.env` | 敏感配置 |
| MCP配置 | `/Users/wushaobing911/Desktop/go/.mcp.json` | MCP任务 |
| Git忽略 | `/Users/wushaobing911/Desktop/go/.gitignore` | Git配置 |

---

## 📚 文档位置

| 文档 | 路径 | 用途 |
|------|------|------|
| 项目README | `/Users/wushaobing911/Desktop/go/README.md` | 完整项目文档 |
| Warp文档 | `/Users/wushaobing911/Desktop/go/WARP.md` | 本文件,Warp AI上下文 |
| 环境变量示例 | `/Users/wushaobing911/Desktop/go/.env.example` | 配置模板 |

---

## 🤖 MCP任务配置

配置文件: `/Users/wushaobing911/Desktop/go/.mcp.json`

### 可用MCP任务

1. **frontend-dev** - 前端开发任务
   - 启动开发服务器
   - 实时预览

2. **frontend-build** - 前端构建任务  
   - 生产环境构建
   - 优化和压缩

3. **backend-dev** - 后端开发任务
   - 启动代理服务器
   - 热重载

4. **backend-test** - 后端测试任务
   - 运行所有测试
   - 生成报告

---

## 🤖 AI Agents (91个)

配置目录: `/Users/wushaobing911/Desktop/go/.WARP/agents/`

### 主要Agents

- **agents-overview** - Warp AI功能概览
- **using-agents/** - Agent使用指南
- **agent-conversations** - 对话管理
- **agent-context/** - 上下文管理
- **managing-agents** - Agent管理
- **agent-profiles-permissions** - 权限配置
- **agent-tasklists** - 任务列表
- **model-choice** - 模型选择
- **active-ai** - 主动AI
- **generate** - 命令生成
- **voice** - 语音交互

### 使用建议

使用Warp AI时，可以：
1. 📝 询问项目结构和文件位置
2. 🔍 搜索和理解代码
3. 🐛 调试和修复问题
4. ✨ 生成新代码
5. 📚 查询文档和最佳实践

---

## ⚠️ 已知问题和注意事项

### 严重问题

#### 1. 后端编译错误
**文件**: `/Users/wushaobing911/Desktop/go/backend/tools/get_token.go`  
**错误**: API签名不匹配
- `Oauth2AccessTokenRequest` 结构体字段类型错误
- 缺少Getter方法

**解决方案**: 需要更新以匹配SDK 1.1.71版本

#### 2. Examples目录编译失败
**目录**: `/Users/wushaobing911/Desktop/go/backend/examples/`  
**问题**: 多个文件包含main函数

**临时方案**: 构建时排除examples目录
```bash
go build -o bin/proxy ./cmd/proxy
```

### 轻微问题

#### 3. 前端Table组件测试失败
**文件**: `/Users/wushaobing911/Desktop/go/frontend/src/components/__tests__/Table.test.tsx`  
**测试**: "renders empty table when no data"  
**状态**: 1/16个测试失败，不影响功能

#### 4. Ant Design Bundle过大
**影响**: antd-vendor chunk 约1MB (gzip后315KB)  
**优化**: 考虑按需加载或CDN

---

## 💡 开发提示 (For Warp AI)

### 常见任务

#### 添加新页面
```bash
# 1. 创建页面组件
touch frontend/src/pages/NewPage.tsx

# 2. 编辑App.tsx添加路由
# 路径: /Users/wushaobing911/Desktop/go/frontend/src/App.tsx
```

#### 添加新API端点
```bash
# 编辑代理服务器
# 路径: /Users/wushaobing911/Desktop/go/backend/cmd/proxy/main.go
```

#### 运行测试
```bash
# 前端测试
cd /Users/wushaobing911/Desktop/go/frontend && npm run test

# 后端测试
cd /Users/wushaobing911/Desktop/go/backend && go test ./middleware -v
```

### 调试技巧

1. **前端调试**
   - 浏览器DevTools
   - React DevTools扩展
   - React Query DevTools (内置)

2. **后端调试**
   - 日志中间件输出
   - 访问 `/health` 端点检查服务状态
   - 使用 `curl` 测试API

---

## 🔧 问题排查

### 问题1: 前端无法连接后端

**检查步骤**:
1. 后端是否启动: `curl http://localhost:8080/health`
2. 检查端口冲突
3. 查看Vite代理配置: `/Users/wushaobing911/Desktop/go/frontend/vite.config.ts`

### 问题2: 后端编译失败

**检查步骤**:
1. Go版本: `go version` (需要 >= 1.21)
2. 依赖完整性: `go mod verify`
3. 排除问题目录: 避免构建 `examples/` 和 `tools/`

### 问题3: 前端测试失败

**检查步骤**:
1. 依赖安装: `npm install`
2. 查看测试输出: `npm run test`
3. 查看具体测试文件: `/Users/wushaobing911/Desktop/go/frontend/src/components/__tests__/`

---

## 📦 依赖版本

### 前端主要依赖
- React: 18.2.0
- TypeScript: 5.5.0
- Vite: 5.2.0
- Ant Design: 5.27.6
- React Query: 5.50.0
- Zustand: 4.5.4
- Recharts: 3.3.0

### 后端依赖
- Go: 1.21+
- Marketing API SDK: 1.1.71

---

## 🎨 代码风格

### 前端
- **ESLint**: 遵循 `eslint.config.js`
- **Prettier**: 自动格式化
- **TypeScript**: 严格模式
- **导入顺序**: React → 第三方 → 本地

### 后端
- **Go Fmt**: 标准格式化
- **Go Vet**: 静态分析
- **注释**: 导出函数需要注释

---

## 📞 技术支持

**项目维护**: 开发团队  
**SDK支持**: [巨量引擎开放平台](https://open.oceanengine.com/)  
**问题反馈**: GitHub Issues

---

<div align="center">

**本文档专为 Warp AI 优化，提供最完整的项目上下文**

🚀 Happy Coding with Warp AI! 🤖

</div>
