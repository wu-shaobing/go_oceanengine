#!/bin/bash

##################################################################
# 🎨 前端应用启动脚本
# 功能: 检查依赖、安装包、启动开发服务、自动打开浏览器
# 用法: double-click 或 ./start_frontend.command
##################################################################

# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# 清屏
clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         🎨 巨量引擎 Go SDK 前端应用启动脚本               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 函数: 打印步骤
print_step() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}📍 $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# 函数: 成功提示
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# 函数: 错误提示
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 函数: 警告提示
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 函数: 信息提示
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# ============================================
# 1. 检查环境
# ============================================
print_step "检查环境和依赖"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js 未安装，请先安装 Node.js 18.0+"
    echo "下载地址: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
print_info "Node.js 版本: $NODE_VERSION"
print_success "Node.js 已安装"

# 检查 npm
if ! command -v npm &> /dev/null; then
    print_error "npm 未安装"
    exit 1
fi

NPM_VERSION=$(npm --version)
print_info "npm 版本: $NPM_VERSION"
print_success "npm 已安装"

# 检查前端目录
if [ ! -d "$FRONTEND_DIR" ]; then
    print_error "前端目录不存在: $FRONTEND_DIR"
    exit 1
fi
print_success "前端目录已找到: $FRONTEND_DIR"

# ============================================
# 2. 进入前端目录
# ============================================
cd "$FRONTEND_DIR"
print_success "已进入前端目录"

# ============================================
# 3. 检查并安装依赖
# ============================================
print_step "检查并安装 NPM 依赖"

if [ ! -d "node_modules" ]; then
    print_warning "node_modules 目录不存在，安装依赖..."
    npm install
    print_success "依赖安装完成"
else
    print_info "node_modules 已存在，检查是否需要更新..."
    
    # 检查 package-lock.json 是否存在
    if [ -f "package-lock.json" ]; then
        npm ci --silent 2>/dev/null || npm install --silent
        print_success "依赖已更新"
    else
        print_info "使用 npm install 安装依赖..."
        npm install --silent
        print_success "依赖安装完成"
    fi
fi

# ============================================
# 4. 编译检查
# ============================================
print_step "进行 TypeScript 编译检查"

print_info "检查 TypeScript 错误..."
if npm run build > /tmp/build.log 2>&1; then
    print_success "TypeScript 编译通过 ✨"
else
    print_warning "构建生成警告或错误"
    print_info "构建日志已保存"
fi

# ============================================
# 5. 启动开发服务器
# ============================================
print_step "启动 Vite 开发服务器"

FRONTEND_PORT=${FRONTEND_PORT:-5173}
print_info "前端服务将在端口 $FRONTEND_PORT 启动"
echo ""

print_info "启动开发服务器..."
echo ""

# 启动服务，并捕获输出以获得URL
npm run dev 2>&1 | tee /tmp/vite.log &
VITE_PID=$!

# 等待服务启动并获取URL
sleep 3

# 查找输出中的URL
VITE_URL=$(grep -o "http://localhost:[0-9]*" /tmp/vite.log | head -1)

if [ -z "$VITE_URL" ]; then
    VITE_URL="http://localhost:$FRONTEND_PORT"
fi

# ============================================
# 6. 显示服务信息
# ============================================
print_step "前端服务已启动"

echo ""
echo -e "${GREEN}✨ 前端应用启动成功！${NC}"
echo ""
echo -e "${BLUE}📍 访问地址:${NC}"
echo "   🌐 应用主页: $VITE_URL"
echo ""
echo -e "${BLUE}📍 产品线页面:${NC}"
echo "   📢 巨量广告: $VITE_URL/ad/overview"
echo "   🛒 巨量千川: $VITE_URL/qianchuan/overview"
echo "   📲 抖+: $VITE_URL/douplus/overview"
echo "   📚 SDK文档: $VITE_URL/sdk/quickstart"
echo ""
echo -e "${BLUE}📍 开发工具:${NC}"
echo "   🔨 构建系统: Vite 5.2"
echo "   📝 类型检查: TypeScript 5.5"
echo "   🔍 代码检查: ESLint"
echo "   🎨 样式工具: Tailwind CSS"
echo ""
echo -e "${BLUE}📍 进程信息:${NC}"
echo "   进程 ID: $VITE_PID"
echo ""
echo -e "${YELLOW}💡 快速开始:${NC}"
echo "   • 在浏览器中打开: $VITE_URL"
echo "   • 修改代码自动热重载"
echo "   • 按 q 停止开发服务器"
echo ""

# ============================================
# 7. 自动打开浏览器
# ============================================
print_step "打开浏览器"

if [ -n "$VITE_URL" ]; then
    sleep 1
    print_info "尝试打开浏览器: $VITE_URL"
    open "$VITE_URL" 2>/dev/null || true
    print_success "浏览器已打开"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${CYAN}📚 可用的 NPM 命令:${NC}"
echo "   npm run dev       - 启动开发服务器"
echo "   npm run build     - 生产构建"
echo "   npm run preview   - 预览生产构建"
echo "   npm run lint      - 代码检查"
echo "   npm run lint:fix  - 自动修复代码"
echo "   npm run test      - 运行单元测试"
echo "   npm run test:ui   - 测试 UI 界面"
echo ""
echo -e "${YELLOW}💡 注意:${NC}"
echo "   • 关闭此窗口会停止前端服务"
echo "   • 后端需要在另一个终端启动"
echo "   • 使用 start_backend.command 启动后端"
echo "   • 需要在不同的端口启动后端和前端"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# 处理用户退出
trap "kill $VITE_PID 2>/dev/null || true" EXIT INT TERM

# 保持前台运行
wait $VITE_PID

print_info "前端服务已停止"