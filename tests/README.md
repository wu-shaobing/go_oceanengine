# Playwright 自动化测试

本目录包含使用 Playwright 编写的自动化测试。

## 安装

浏览器已安装。如需重新安装：

```bash
npx playwright install
```

## 运行测试

### 运行所有测试
```bash
npx playwright test
```

### 运行特定测试文件
```bash
npx playwright test tests/login.spec.ts
```

### 以调试模式运行
```bash
npx playwright test --debug
```

### 以 UI 模式运行
```bash
npx playwright test --ui
```

### 运行特定浏览器
```bash
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# Webkit (Safari)
npx playwright test --project=webkit
```

## 查看测试报告

测试运行后，可以查看 HTML 报告：

```bash
npx playwright show-report
```

## 测试文件

- `login.spec.ts` - 登录功能测试（cl.mobgi.com）

## 配置

测试配置位于根目录的 `playwright.config.ts` 文件中。

测试凭据存储在 `.env.test` 文件中（不会提交到 Git）。

## 注意事项

1. 测试中的选择器（selectors）可能需要根据实际页面结构进行调整
2. 截图和视频将保存在 `test-results/` 和 `tests/screenshots/` 目录
3. 不要将包含敏感信息的 `.env.test` 文件提交到版本控制
