# GitHub 仓库设置指南

## 1. 在GitHub上创建新仓库

1. 访问 https://github.com/new
2. 仓库名: `go_oceanengine` (或你喜欢的名字)
3. 描述: AI智能投放全栈项目 - 千川+巨量广告管理平台
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize with README" (我们已经有了)
6. 点击 "Create repository"

## 2. 推送代码到GitHub

在本地项目目录执行：

```bash
# 添加远程仓库 (替换YOUR_USERNAME为你的GitHub用户名)
git remote add origin https://github.com/YOUR_USERNAME/ai-ad-platform.git

# 推送代码
git branch -M main
git push -u origin main
```

## 3. 推送后的操作

### 设置仓库描述
在GitHub仓库页面：
- Settings -> Repository details
- 添加 Topics: `react`, `typescript`, `go`, `oauth2`, `ad-platform`, `qianchuan`

### 配置 GitHub Pages (可选)
如果要部署前端：
- Settings -> Pages
- Source: GitHub Actions
- 可使用提供的 `.github/workflows/deploy.yml`

### 保护敏感信息
确保 `.env` 文件已在 `.gitignore` 中：
```
.env
*.env
.env.local
```

## 4. OAuth回调地址更新

代码推送后，你需要更新OAuth应用的回调地址为实际的GitHub Pages URL或你的部署域名。

当前配置：`http://localhost:8080/callback`
生产环境需改为：`https://yourdomain.com/callback`
