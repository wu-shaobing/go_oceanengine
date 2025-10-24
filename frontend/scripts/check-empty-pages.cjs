#!/usr/bin/env node

/**
 * 检查所有页面，识别空模板页面
 */

const fs = require('fs');
const path = require('path');

// 需要检查的空模板特征
const EMPTY_INDICATORS = [
  '待实现具体业务逻辑',
  'dataSource={[]}',
  'dataSource={[ ]}',
  '暂无视频素材',
];

// 扫描页面文件
function scanPages(dir, prefix = '') {
  const results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results.push(...scanPages(filePath, file + '/'));
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const isEmpty = EMPTY_INDICATORS.some(indicator => content.includes(indicator));
      
      results.push({
        file: prefix + file,
        path: filePath,
        isEmpty,
        hasData: content.includes('dataSource') && !content.includes('dataSource={[]}'),
        lines: content.split('\n').length,
      });
    }
  }
  
  return results;
}

// 主程序
const pagesDir = path.join(__dirname, '../src/pages');
console.log('🔍 正在检查所有页面文件...\n');

const adPages = scanPages(path.join(pagesDir, 'ad'), 'ad/');
const qcPages = scanPages(path.join(pagesDir, 'qianchuan'), 'qianchuan/');
const dpPages = scanPages(path.join(pagesDir, 'douplus'), 'douplus/');
const sdkPages = scanPages(path.join(pagesDir, 'sdk'), 'sdk/');

// 检查property目录是否存在
let propPages = [];
const propDir = path.join(pagesDir, 'property');
if (fs.existsSync(propDir)) {
  propPages = scanPages(propDir, 'property/');
}

const allPages = [...adPages, ...qcPages, ...dpPages, ...sdkPages, ...propPages];

// 统计
const emptyPages = allPages.filter(p => p.isEmpty);
const totalPages = allPages.length;

console.log('📊 统计结果:\n');
console.log(`总页面数: ${totalPages}`);
console.log(`空模板页面: ${emptyPages.length}`);
console.log(`完成页面: ${totalPages - emptyPages.length}\n`);

// 按产品线分组显示
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🔴 巨量广告 - 空模板页面:');
const adEmpty = adPages.filter(p => p.isEmpty);
if (adEmpty.length === 0) {
  console.log('  ✅ 无空模板页面');
} else {
  adEmpty.forEach(p => console.log(`  ❌ ${p.file}`));
}
console.log(`  状态: ${adPages.length - adEmpty.length}/${adPages.length} 完成\n`);

console.log('🟠 巨量千川 - 空模板页面:');
const qcEmpty = qcPages.filter(p => p.isEmpty);
if (qcEmpty.length === 0) {
  console.log('  ✅ 无空模板页面');
} else {
  qcEmpty.forEach(p => console.log(`  ❌ ${p.file}`));
}
console.log(`  状态: ${qcPages.length - qcEmpty.length}/${qcPages.length} 完成\n`);

console.log('🔵 抖+ - 空模板页面:');
const dpEmpty = dpPages.filter(p => p.isEmpty);
if (dpEmpty.length === 0) {
  console.log('  ✅ 无空模板页面');
} else {
  dpEmpty.forEach(p => console.log(`  ❌ ${p.file}`));
}
console.log(`  状态: ${dpPages.length - dpEmpty.length}/${dpPages.length} 完成\n`);

console.log('⚙️  SDK - 空模板页面:');
const sdkEmpty = sdkPages.filter(p => p.isEmpty);
if (sdkEmpty.length === 0) {
  console.log('  ✅ 无空模板页面');
} else {
  sdkEmpty.forEach(p => console.log(`  ❌ ${p.file}`));
}
console.log(`  状态: ${sdkPages.length - sdkEmpty.length}/${sdkPages.length} 完成\n`);

if (propPages.length > 0) {
  console.log('⚠️  Property目录 (未在路由中配置):');
  console.log(`  发现 ${propPages.length} 个文件，建议删除或移到归档目录\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// 检查抖+侧边栏配置中缺失的页面
console.log('🔍 检查抖+侧边栏配置的页面...\n');

const douplusRequired = [
  'dp-quick-boost',    // 快速加热
  'dp-api-tools',      // API工具
  'dp-video',          // 视频管理
  'dp-live',           // 直播管理
  'dp-order',          // 订单列表
  'dp-order-detail',   // 订单详情
];

const douplusExistingFiles = dpPages.map(p => p.file.replace('.tsx', '').replace('douplus/', ''));
const douplusMissing = [];

for (const pageId of douplusRequired) {
  const fileName = pageId.replace('dp-', '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  if (!douplusExistingFiles.some(f => f.toLowerCase().includes(fileName.toLowerCase()))) {
    douplusMissing.push({ pageId, fileName });
  }
}

if (douplusMissing.length > 0) {
  console.log('❌ 抖+侧边栏缺失的页面:');
  douplusMissing.forEach(m => console.log(`  - ${m.pageId} (${m.fileName}.tsx)`));
  console.log('');
}

// 详细列出所有空模板页面
if (emptyPages.length > 0) {
  console.log('📝 需要填充内容的空模板页面清单:\n');
  emptyPages.forEach((p, i) => {
    console.log(`${i + 1}. ${p.file} (${p.lines} 行)`);
  });
}

console.log('\n✅ 检查完成！');
