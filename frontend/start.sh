#!/bin/bash

set -e

echo "🚀 Marketing SDK Frontend - MVP Launcher"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -n "Checking Node.js... "
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js >= 18 from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version too old ($NODE_VERSION)${NC}"
    echo "Please upgrade to Node.js >= 18"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check npm
echo -n "Checking npm... "
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo ""
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
fi

echo ""
echo "========================================"
echo -e "${GREEN}✨ Starting development server...${NC}"
echo ""
echo "Preview URL: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo "========================================"
echo ""

# Start dev server
npm run dev
