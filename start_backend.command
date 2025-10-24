#!/bin/bash

##################################################################
# 🚀 后端服务启动脚本
# 功能: 编译Go服务、检查依赖、启动服务、验证健康检查
# 用法: double-click 或 ./start_backend.command
##################################################################

# 定义颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$SCRIPT_DIR"
BACKEND_DIR="$PROJECT_ROOT/backend"

# 清屏
clear

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         🚀 巨量引擎 Go SDK 后端服务启动脚本               ║${NC}"
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

# 检查Go版本
if ! command -v go &> /dev/null; then
    print_error "Go 未安装，请先安装 Go 1.21+"
    echo "下载地址: https://golang.org/dl/"
    exit 1
fi

GO_VERSION=$(go version | awk '{print $3}')
print_info "Go 版本: $GO_VERSION"
print_success "Go 已安装"

# 检查后端目录
if [ ! -d "$BACKEND_DIR" ]; then
    print_error "后端目录不存在: $BACKEND_DIR"
    exit 1
fi
print_success "后端目录已找到: $BACKEND_DIR"

# ============================================
# 2. 检查环境变量配置
# ============================================
print_step "检查环境变量配置"

ENV_FILE="$PROJECT_ROOT/.env"

if [ ! -f "$ENV_FILE" ]; then
    print_warning ".env 文件不存在，创建默认配置..."
    cat > "$ENV_FILE" << 'EOF'
# Proxy Server Configuration
PROXY_PORT=8080

# Marketing API Credentials
# For development/testing - using mock data
ACCESS_TOKEN=test_token_placeholder
ADVERTISER_ID=123456789
EOF
    print_success ".env 文件已创建"
else
    print_success ".env 文件已存在"
    print_info "当前配置:"
    grep -E "^(PROXY_PORT|ACCESS_TOKEN|ADVERTISER_ID)" "$ENV_FILE" | sed 's/^/  /'
fi

# ============================================
# 3. 检查依赖和模块
# ============================================
print_step "检查 Go 模块依赖"

cd "$BACKEND_DIR"

if [ ! -f "go.mod" ]; then
    print_warning "go.mod 不存在，初始化模块..."
    go mod init github.com/oceanengine/ad_open_sdk_go 2>/dev/null || true
fi

print_info "更新模块依赖..."
go mod tidy
print_success "模块依赖已更新"

# ============================================
# 4. 编译后端服务
# ============================================
print_step "编译后端服务"

print_info "编译主程序: cmd/proxy/main.go"
mkdir -p "$BACKEND_DIR/bin"

if go build -o "$BACKEND_DIR/bin/proxy" cmd/proxy/main.go; then
    BINARY_SIZE=$(du -h "$BACKEND_DIR/bin/proxy" | cut -f1)
    print_success "编译成功 (大小: $BINARY_SIZE)"
else
    print_error "编译失败，请检查代码错误"
    exit 1
fi

# ============================================
# 5. 启动服务
# ============================================
print_step "启动服务"

# 加载环境变量
if [ -f "$ENV_FILE" ]; then
    export $(cat "$ENV_FILE" | grep -v '^#' | xargs)
fi

PROXY_PORT=${PROXY_PORT:-8080}

print_info "读取配置:"
echo "  🔌 端口: $PROXY_PORT"
echo "  🔐 Token: ${ACCESS_TOKEN:0:20}***"
echo "  📊 广告主ID: $ADVERTISER_ID"
echo ""

print_info "启动 Proxy 服务..."
echo ""

# 在后台启动服务，并保存PID
"$BACKEND_DIR/bin/proxy" &
PROXY_PID=$!
echo "  进程 ID: $PROXY_PID"

# 等待服务启动
sleep 2

# ============================================
# 6. 验证服务
# ============================================
print_step "验证服务健康状态"

HEALTH_CHECK_URL="http://localhost:$PROXY_PORT/health"
print_info "健康检查 URL: $HEALTH_CHECK_URL"

# 重试逻辑
RETRY_COUNT=0
MAX_RETRIES=10

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s "$HEALTH_CHECK_URL" > /dev/null 2>&1; then
        HEALTH_RESPONSE=$(curl -s "$HEALTH_CHECK_URL")
        print_success "服务已启动 ✨"
        print_info "健康检查响应: $HEALTH_RESPONSE"
        break
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
        print_info "等待服务启动... ($RETRY_COUNT/$MAX_RETRIES)"
        sleep 1
    else
        print_error "服务启动超时，请检查端口是否被占用"
        kill $PROXY_PID 2>/dev/null || true
        exit 1
    fi
done

# ============================================
# 7. 显示服务信息
# ============================================
print_step "服务已启动，信息如下"

echo ""
echo -e "${GREEN}✨ 后端服务启动成功！${NC}"
echo ""
echo -e "${BLUE}📍 服务地址:${NC}"
echo "   🏠 主服务: http://localhost:$PROXY_PORT"
echo "   💚 健康检查: http://localhost:$PROXY_PORT/health"
echo ""
echo -e "${BLUE}📍 可用的 Mock API:${NC}"
echo "   📋 项目列表: http://localhost:$PROXY_PORT/api/projects"
echo "   📢 广告列表: http://localhost:$PROXY_PORT/api/ads"
echo "   📊 报表数据: http://localhost:$PROXY_PORT/api/report"
echo "   🎨 素材列表: http://localhost:$PROXY_PORT/api/material"
echo "   💰 账户余额: http://localhost:$PROXY_PORT/api/account/balance"
echo ""
echo -e "${BLUE}📍 测试命令:${NC}"
echo "   curl http://localhost:$PROXY_PORT/health"
echo "   curl http://localhost:$PROXY_PORT/api/projects"
echo ""
echo -e "${BLUE}📍 进程信息:${NC}"
echo "   进程 ID: $PROXY_PID"
echo ""
echo -e "${YELLOW}💡 提示:${NC}"
echo "   • 关闭此窗口会停止服务"
echo "   • 前端需要在另一个终端启动"
echo "   • 使用 start_frontend.command 启动前端"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# 保持窗口打开
wait $PROXY_PID

# 服务被中断时的清理
trap "kill $PROXY_PID 2>/dev/null || true" EXIT INT TERM

print_info "服务已停止"