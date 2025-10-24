#!/usr/bin/env node

/**
 * 半自动浏览器登录脚本
 * 使用 Playwright 打开浏览器，您手动输入账号密码
 * 
 * 使用方法:
 *   node tools/browser-login.js
 */

const { chromium } = require('playwright');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 启动浏览器自动化脚本...\n');
  
  // 启动浏览器 (非无头模式，这样您可以看到界面)
  console.log('📱 正在启动 Chrome 浏览器...');
  const browser = await chromium.launch({
    headless: false,  // 显示浏览器界面
    slowMo: 500,      // 减慢操作速度，方便观察
    args: [
      '--start-maximized',  // 最大化窗口
    ]
  });
  
  const context = await browser.newContext({
    viewport: null,  // 使用最大化窗口
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    // 访问登录页面
    console.log('🌐 正在访问登录页面...');
    await page.goto('http://cl.mobgi.com/login', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log('✅ 页面加载完成！');
    console.log('\n' + '='.repeat(60));
    console.log('📝 页面信息:');
    console.log('   标题:', await page.title());
    console.log('   URL:', page.url());
    console.log('='.repeat(60) + '\n');
    
    // 等待用户手动登录
    console.log('⏸️  请在浏览器中手动完成以下操作:');
    console.log('   1. 输入账号: 11489573@qq.com');
    console.log('   2. 输入密码: Aa123456');
    console.log('   3. 点击登录按钮');
    console.log('   4. 如果需要修改密码，请修改后继续\n');
    
    await question('完成登录后，按 Enter 键继续...');
    
    // 等待页面跳转
    console.log('\n⏳ 等待页面加载...');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 登录后的页面信息:');
    console.log('   标题:', await page.title());
    console.log('   URL:', page.url());
    console.log('='.repeat(60) + '\n');
    
    // 获取页面内容
    console.log('📸 正在截图...');
    const screenshotPath = '/Users/wushaobing911/Desktop/go/tools/dashboard-screenshot.png';
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });
    console.log(`✅ 截图已保存: ${screenshotPath}\n`);
    
    // 获取页面文本内容
    console.log('📄 正在提取页面内容...\n');
    const bodyText = await page.evaluate(() => {
      return document.body.innerText;
    });
    
    console.log('='.repeat(60));
    console.log('📋 页面文本内容:');
    console.log('='.repeat(60));
    console.log(bodyText);
    console.log('='.repeat(60) + '\n');
    
    // 获取页面结构
    console.log('🔍 页面结构分析:');
    const pageStructure = await page.evaluate(() => {
      const structure = {
        headings: [],
        links: [],
        buttons: [],
        forms: [],
        tables: []
      };
      
      // 提取标题
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        structure.headings.push({
          tag: h.tagName,
          text: h.innerText.trim()
        });
      });
      
      // 提取主要链接
      document.querySelectorAll('a[href]').forEach((a, i) => {
        if (i < 20) {  // 只取前20个
          structure.links.push({
            text: a.innerText.trim(),
            href: a.getAttribute('href')
          });
        }
      });
      
      // 提取按钮
      document.querySelectorAll('button').forEach(btn => {
        structure.buttons.push(btn.innerText.trim());
      });
      
      // 提取表单
      document.querySelectorAll('form').forEach(form => {
        structure.forms.push({
          action: form.action,
          method: form.method
        });
      });
      
      // 提取表格数据
      document.querySelectorAll('table').forEach((table, i) => {
        if (i < 5) {  // 只取前5个表格
          const headers = Array.from(table.querySelectorAll('th')).map(th => th.innerText.trim());
          const rows = Array.from(table.querySelectorAll('tbody tr')).slice(0, 5).map(tr => {
            return Array.from(tr.querySelectorAll('td')).map(td => td.innerText.trim());
          });
          structure.tables.push({ headers, rows });
        }
      });
      
      return structure;
    });
    
    console.log('\n📌 标题 (Headings):');
    pageStructure.headings.forEach(h => {
      console.log(`   ${h.tag}: ${h.text}`);
    });
    
    console.log('\n🔗 主要链接 (前20个):');
    pageStructure.links.slice(0, 20).forEach(link => {
      console.log(`   ${link.text} → ${link.href}`);
    });
    
    console.log('\n🔘 按钮:');
    pageStructure.buttons.forEach(btn => {
      console.log(`   - ${btn}`);
    });
    
    if (pageStructure.tables.length > 0) {
      console.log('\n📊 表格数据:');
      pageStructure.tables.forEach((table, i) => {
        console.log(`\n   表格 ${i + 1}:`);
        console.log('   表头:', table.headers.join(' | '));
        table.rows.forEach((row, j) => {
          console.log(`   行 ${j + 1}:`, row.join(' | '));
        });
      });
    }
    
    // 保存完整HTML
    console.log('\n💾 正在保存完整HTML...');
    const htmlPath = '/Users/wushaobing911/Desktop/go/tools/dashboard-page.html';
    const htmlContent = await page.content();
    require('fs').writeFileSync(htmlPath, htmlContent, 'utf-8');
    console.log(`✅ HTML已保存: ${htmlPath}\n`);
    
    // 询问是否继续浏览
    const continueAnswer = await question('\n🤔 是否要继续浏览其他页面? (y/n): ');
    
    if (continueAnswer.toLowerCase() === 'y') {
      console.log('\n✅ 浏览器将保持打开状态。');
      console.log('   您可以手动浏览网站，完成后关闭浏览器窗口。');
      console.log('   或按 Ctrl+C 关闭此脚本。\n');
      
      await question('按 Enter 键关闭浏览器...');
    }
    
  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
    console.error('\n详细错误:');
    console.error(error);
  } finally {
    console.log('\n🔒 正在关闭浏览器...');
    await browser.close();
    rl.close();
    console.log('✅ 完成！\n');
  }
}

// 运行脚本
main().catch(error => {
  console.error('❌ 脚本执行失败:', error);
  process.exit(1);
});
