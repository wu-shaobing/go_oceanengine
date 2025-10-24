# 创建 GitHub 仓库步骤

## 方法1: 通过 GitHub 网页创建（推荐）

1. 访问：https://github.com/new

2. 填写信息：
   - Repository name: `go_oceanengine`
   - Description: `AI智能投放全栈项目 - 千川+巨量广告管理平台`
   - 选择 Public 或 Private
   - **不要勾选** "Add a README file"
   - **不要勾选** "Add .gitignore"  
   - **不要勾选** "Choose a license"

3. 点击 "Create repository" 绿色按钮

4. 创建成功后，在本地执行：
   ```bash
   cd /Users/wushaobing911/Desktop/go
   git push -u origin main
   ```

## 方法2: 使用 GitHub CLI（如果已安装）

```bash
# 检查是否已安装 gh
gh --version

# 创建仓库
cd /Users/wushaobing911/Desktop/go
gh repo create go_oceanengine --public --source=. --remote=origin --push
```

## 检查远程仓库配置

```bash
cd /Users/wushaobing911/Desktop/go
git remote -v
```

应该看到：
```
origin  https://github.com/wushaobing911/go_oceanengine.git (fetch)
origin  https://github.com/wushaobing911/go_oceanengine.git (push)
```
