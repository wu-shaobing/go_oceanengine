#!/usr/bin/env node

/**
 * 全面检查所有导航标签是否有对应的路由和页面
 */

const fs = require('fs');
const path = require('path');

// 读取产品配置
const productsConfigPath = path.join(__dirname, '../src/config/products.ts');
const routesConfigPath = path.join(__dirname, '../src/config/routes.ts');

const productsContent = fs.readFileSync(productsConfigPath, 'utf-8');
const routesContent = fs.readFileSync(routesConfigPath, 'utf-8');

console.log('🔍 全面检查所有导航标签的路由配置...\n');

// 提取所有的pageId
const pageIdPattern = /page:\s*['"]([^'"]+)['"]/g;
const allPageIds = [];
let match;

while ((match = pageIdPattern.exec(productsContent)) !== null) {
  allPageIds.push(match[1]);
}

// 去重
const uniquePageIds = [...new Set(allPageIds)];

console.log(`📊 总共找到 ${uniquePageIds.length} 个唯一的 pageId\n`);

// 检查每个pageId是否在routes.ts中有对应的路由
const missingRoutes = [];
const existingRoutes = [];

uniquePageIds.forEach(pageId => {
  const routePattern = new RegExp(`pageId:\\s*['"]${pageId}['"]`);
  if (routePattern.test(routesContent)) {
    existingRoutes.push(pageId);
  } else {
    missingRoutes.push(pageId);
  }
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (missingRoutes.length === 0) {
  console.log('✅ 所有导航标签都有对应的路由配置！\n');
  console.log(`✓ 已配置路由: ${existingRoutes.length}/${uniquePageIds.length}\n`);
} else {
  console.log(`❌ 发现 ${missingRoutes.length} 个缺失的路由配置:\n`);
  missingRoutes.forEach((pageId, index) => {
    console.log(`${index + 1}. ${pageId}`);
  });
  console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 按产品线分组显示
console.log('📋 按产品线分组检查:\n');

// 巨量广告
console.log('🔴 巨量广告:');
const adPageIds = uniquePageIds.filter(id => 
  id.startsWith('ad-') || 
  id === 'material-upload' || 
  id === 'negative-keywords' ||
  id === 'account-funds' ||
  id === 'account-budget' ||
  id === 'shared-wallet' ||
  id === 'async-report' ||
  id === 'oauth-manage' ||
  id === 'security-compliance' ||
  id === 'best-practices' ||
  id === 'error-codes' ||
  id === 'service-market'
);
const adMissing = adPageIds.filter(id => missingRoutes.includes(id));
console.log(`  总计: ${adPageIds.length} 个`);
console.log(`  缺失: ${adMissing.length} 个`);
if (adMissing.length > 0) {
  adMissing.forEach(id => console.log(`    ❌ ${id}`));
}
console.log('');

// 巨量千川
console.log('🟠 巨量千川:');
const qcPageIds = uniquePageIds.filter(id => id.startsWith('qc-'));
const qcMissing = qcPageIds.filter(id => missingRoutes.includes(id));
console.log(`  总计: ${qcPageIds.length} 个`);
console.log(`  缺失: ${qcMissing.length} 个`);
if (qcMissing.length > 0) {
  qcMissing.forEach(id => console.log(`    ❌ ${id}`));
}
console.log('');

// 抖+
console.log('🔵 抖+:');
const dpPageIds = uniquePageIds.filter(id => id.startsWith('dp-'));
const dpMissing = dpPageIds.filter(id => missingRoutes.includes(id));
console.log(`  总计: ${dpPageIds.length} 个`);
console.log(`  缺失: ${dpMissing.length} 个`);
if (dpMissing.length > 0) {
  dpMissing.forEach(id => console.log(`    ❌ ${id}`));
}
console.log('');

// SDK
console.log('⚙️  SDK:');
const sdkPageIds = uniquePageIds.filter(id => 
  id.startsWith('sdk-') || 
  id === 'api-list' ||
  id === 'api-debugger' ||
  id === 'batch-operations'
);
const sdkMissing = sdkPageIds.filter(id => missingRoutes.includes(id));
console.log(`  总计: ${sdkPageIds.length} 个`);
console.log(`  缺失: ${sdkMissing.length} 个`);
if (sdkMissing.length > 0) {
  sdkMissing.forEach(id => console.log(`    ❌ ${id}`));
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 检查页面文件是否存在
console.log('📁 检查页面文件存在性...\n');

const pagesDir = path.join(__dirname, '../src/pages');
const missingFiles = [];

// 检查函数
function checkPageFile(pageId) {
  // 根据pageId推断文件路径
  let filePath = '';
  
  if (pageId.startsWith('ad-')) {
    const fileName = pageId.replace('ad-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    filePath = path.join(pagesDir, 'ad', `${fileName}.tsx`);
  } else if (pageId.startsWith('qc-')) {
    const fileName = pageId.replace('qc-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    filePath = path.join(pagesDir, 'qianchuan', `${fileName}.tsx`);
  } else if (pageId.startsWith('dp-')) {
    const fileName = pageId.replace('dp-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    filePath = path.join(pagesDir, 'douplus', `${fileName}.tsx`);
  } else if (pageId.startsWith('sdk-')) {
    const fileName = pageId.replace('sdk-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    filePath = path.join(pagesDir, 'sdk', `${fileName}.tsx`);
  } else {
    // 特殊处理
    if (pageId === 'material-upload') {
      filePath = path.join(pagesDir, 'ad', 'MaterialUpload.tsx');
    } else if (pageId === 'negative-keywords') {
      filePath = path.join(pagesDir, 'ad', 'NegativeWords.tsx');
    } else if (pageId === 'api-list') {
      filePath = path.join(pagesDir, 'sdk', 'ApiList.tsx');
    } else if (pageId === 'api-debugger') {
      filePath = path.join(pagesDir, 'sdk', 'ApiDebugger.tsx');
    } else if (pageId === 'batch-operations') {
      filePath = path.join(pagesDir, 'sdk', 'BatchOperations.tsx');
    } else {
      return null;
    }
  }
  
  return fs.existsSync(filePath) ? filePath : null;
}

existingRoutes.forEach(pageId => {
  const filePath = checkPageFile(pageId);
  if (!filePath) {
    missingFiles.push(pageId);
  }
});

if (missingFiles.length === 0) {
  console.log('✅ 所有已配置路由的页面文件都存在！\n');
} else {
  console.log(`⚠️  发现 ${missingFiles.length} 个页面文件缺失:\n`);
  missingFiles.forEach((pageId, index) => {
    console.log(`${index + 1}. ${pageId}`);
  });
  console.log('');
}

console.log('✅ 检查完成！\n');

// 退出码
process.exit(missingRoutes.length > 0 || missingFiles.length > 0 ? 1 : 0);
