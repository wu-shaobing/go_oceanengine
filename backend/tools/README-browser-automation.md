# 🤖 浏览器自动化工具使用指南

## 📦 安装 Playwright

在项目根目录运行以下命令:

```bash
# 方式一: 安装到当前项目
npm install --save-dev playwright

# 方式二: 全局安装 (推荐)
npm install -g playwright

# 安装浏览器 (必需)
npx playwright install chromium
```

## 🚀 使用方法

### 1. 运行半自动登录脚本

```bash
# 在项目根目录运行
node tools/browser-login.js
```

### 2. 操作流程

1. **脚本自动打开浏览器**
   - Chrome 浏览器会自动打开
   - 自动访问 http://cl.mobgi.com/login

2. **您手动登录**
   - 在浏览器中输入账号: `11489573@qq.com`
   - 输入密码: `Aa123456`
   - 点击登录按钮
   - 如需修改密码，按提示修改

3. **按 Enter 继续**
   - 登录完成后，回到终端
   - 按 `Enter` 键继续

4. **脚本自动提取信息**
   - 自动截图
   - 提取页面文本
   - 分析页面结构
   - 保存 HTML 文件

### 3. 输出文件

脚本会在 `tools/` 目录生成以下文件:

```
tools/
├── dashboard-screenshot.png  # 完整页面截图
└── dashboard-page.html       # 完整页面HTML
```

## 📋 脚本功能

### ✅ 已实现功能

1. **自动打开浏览器** - 使用 Chromium
2. **访问登录页面** - 自动导航到登录URL
3. **等待手动登录** - 您完全控制登录过程
4. **全页面截图** - 保存高质量截图
5. **提取页面文本** - 获取所有可见文本
6. **分析页面结构**:
   - 提取所有标题 (H1-H6)
   - 提取所有链接 (前20个)
   - 提取所有按钮
   - 提取表格数据 (前5个)
7. **保存完整HTML** - 供后续分析

### 📊 输出信息

脚本会在终端显示:

```
📝 页面信息:
   - 页面标题
   - 当前URL

📋 页面文本内容:
   - 完整的文本内容

🔍 页面结构分析:
   - 所有标题
   - 主要链接 (前20个)
   - 所有按钮
   - 表格数据 (前5个表格)
```

## 🛠️ 高级用法

### 自定义截图区域

编辑 `tools/browser-login.js`，找到截图部分:

```javascript
// 截取特定元素
await page.locator('#dashboard').screenshot({ path: 'element.png' });

// 截取视口内容 (不滚动)
await page.screenshot({ 
  path: 'viewport.png',
  fullPage: false 
});
```

### 提取特定数据

在脚本中添加自定义提取逻辑:

```javascript
// 提取特定的数据
const customData = await page.evaluate(() => {
  // 在浏览器上下文中运行
  return {
    username: document.querySelector('.username')?.innerText,
    balance: document.querySelector('.balance')?.innerText,
    // ... 其他数据
  };
});

console.log('自定义数据:', customData);
```

### 自动化导航

```javascript
// 点击菜单项
await page.click('text=数据报表');
await page.waitForLoadState('networkidle');

// 填写表单
await page.fill('#search-input', '搜索关键词');
await page.click('#search-button');
```

## 🔍 故障排除

### 问题 1: Playwright 未安装

**错误信息**:
```
Error: Cannot find module 'playwright'
```

**解决方案**:
```bash
npm install playwright
npx playwright install chromium
```

### 问题 2: 浏览器启动失败

**错误信息**:
```
browserType.launch: Executable doesn't exist
```

**解决方案**:
```bash
# 安装浏览器
npx playwright install chromium

# 或者安装所有浏览器
npx playwright install
```

### 问题 3: 页面加载超时

**解决方案**:
编辑脚本，增加超时时间:

```javascript
await page.goto('http://cl.mobgi.com/login', {
  waitUntil: 'networkidle',
  timeout: 60000  // 增加到 60 秒
});
```

### 问题 4: 权限问题 (MacOS)

如果遇到权限提示，请在 **系统偏好设置 → 安全性与隐私** 中允许。

## 📚 Playwright 文档

- 官方文档: https://playwright.dev/
- API 文档: https://playwright.dev/docs/api/class-playwright
- 中文文档: https://playwright.bootcss.com/

## 🎯 下一步

1. **运行脚本**: `node tools/browser-login.js`
2. **查看截图**: `tools/dashboard-screenshot.png`
3. **查看 HTML**: `tools/dashboard-page.html`
4. **分析数据**: 根据终端输出的信息进行分析

## ⚠️ 安全提醒

- ✅ 脚本不会保存您的账号密码
- ✅ 所有数据仅保存在本地
- ✅ 可以随时关闭浏览器
- ⚠️ 请勿在公共网络中运行
- ⚠️ 注意保护截图和 HTML 文件中的敏感信息
