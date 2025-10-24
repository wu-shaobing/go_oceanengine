#!/usr/bin/env node

/**
 * 完整页面爬虫脚本
 * 登录后自动遍历所有页面,提取结构信息
 * 
 * 使用方法:
 *   node tools/crawl-all-pages.js
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// 配置
const BASE_URL = 'https://cl.mobgi.com';
const OUTPUT_DIR = path.join(__dirname, '../frontend/docs/development-guide/screenshots');
const DATA_FILE = path.join(__dirname, '../frontend/docs/development-guide/page-structure.json');

// 确保输出目录存在
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 页面爬取函数
async function crawlAllPages(page) {
  const pageData = {
    crawlTime: new Date().toISOString(),
    pages: []
  };

  console.log('\n📋 开始分析页面结构...\n');

  try {
    // 等待页面完全加载
    await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // 提取顶部导航菜单
    console.log('🔍 正在提取顶部导航菜单...');
    const topNavMenus = await page.evaluate(() => {
      const navItems = [];
      // 查找顶部导航栏的菜单项
      const selectors = [
        'nav a',
        '[class*="nav"] a',
        '[class*="menu"] > a',
        'header a'
      ];
      
      for (const selector of selectors) {
        const items = document.querySelectorAll(selector);
        if (items.length > 0) {
          items.forEach(item => {
            const text = item.textContent.trim();
            const href = item.getAttribute('href');
            if (text && text.length < 20 && text.length > 1) {
              navItems.push({ text, href });
            }
          });
          break;
        }
      }
      
      return navItems;
    });

    console.log(`✅ 发现 ${topNavMenus.length} 个顶部导航菜单:`);
    topNavMenus.forEach(menu => console.log(`   - ${menu.text} (${menu.href})`));

    // 遍历每个导航菜单
    for (let i = 0; i < topNavMenus.length; i++) {
      const menu = topNavMenus[i];
      console.log(`\n\n📄 [${i + 1}/${topNavMenus.length}] 正在处理: ${menu.text}`);
      console.log('='.repeat(60));

      try {
        // 点击导航菜单
        if (menu.href && !menu.href.startsWith('http') && menu.href !== '#') {
          const targetUrl = menu.href.startsWith('/') 
            ? `${BASE_URL}${menu.href}` 
            : `${BASE_URL}/${menu.href}`;
          
          console.log(`🌐 访问: ${targetUrl}`);
          await page.goto(targetUrl, { 
            waitUntil: 'networkidle', 
            timeout: 10000 
          }).catch(() => {});
          
          await page.waitForTimeout(1500);
        }

        // 提取当前页面信息
        const pageInfo = await extractPageInfo(page, menu.text);
        pageData.pages.push(pageInfo);

        // 截图
        const screenshotName = `${i + 1}-${menu.text.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.png`;
        const screenshotPath = path.join(OUTPUT_DIR, screenshotName);
        await page.screenshot({ 
          path: screenshotPath, 
          fullPage: false 
        });
        console.log(`📸 截图已保存: ${screenshotName}`);

        // 如果有侧边栏菜单,遍历子页面
        if (pageInfo.sidebar && pageInfo.sidebar.length > 0) {
          console.log(`\n   📂 发现 ${pageInfo.sidebar.length} 个侧边栏菜单,开始遍历子页面...`);
          
          for (let j = 0; j < Math.min(pageInfo.sidebar.length, 10); j++) {
            const sidebarItem = pageInfo.sidebar[j];
            console.log(`\n   ├─ [${j + 1}/${pageInfo.sidebar.length}] ${sidebarItem.text}`);
            
            try {
              // 查找并点击侧边栏菜单
              const clicked = await page.evaluate((itemText) => {
                const selectors = [
                  '.sidebar a',
                  '[class*="sidebar"] a',
                  '[class*="side-menu"] a',
                  'aside a'
                ];
                
                for (const selector of selectors) {
                  const items = document.querySelectorAll(selector);
                  for (const item of items) {
                    if (item.textContent.trim() === itemText) {
                      item.click();
                      return true;
                    }
                  }
                }
                return false;
              }, sidebarItem.text);

              if (clicked) {
                await page.waitForTimeout(1000);
                
                // 提取子页面信息
                const subPageInfo = await extractPageInfo(page, sidebarItem.text);
                
                if (!pageInfo.subPages) {
                  pageInfo.subPages = [];
                }
                pageInfo.subPages.push(subPageInfo);

                // 子页面截图
                const subScreenshotName = `${i + 1}-${menu.text}-${j + 1}-${sidebarItem.text.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_')}.png`;
                const subScreenshotPath = path.join(OUTPUT_DIR, subScreenshotName);
                await page.screenshot({ 
                  path: subScreenshotPath, 
                  fullPage: false 
                });
                console.log(`   │  📸 子页面截图: ${subScreenshotName}`);
              }
            } catch (err) {
              console.log(`   │  ⚠️  跳过: ${err.message}`);
            }
          }
        }

      } catch (error) {
        console.log(`❌ 处理 ${menu.text} 时出错: ${error.message}`);
        pageData.pages.push({
          nav: menu.text,
          url: menu.href,
          error: error.message
        });
      }
    }

  } catch (error) {
    console.error('❌ 爬取过程出错:', error);
  }

  // 保存数据
  console.log('\n\n💾 正在保存数据...');
  fs.writeFileSync(DATA_FILE, JSON.stringify(pageData, null, 2), 'utf-8');
  console.log(`✅ 数据已保存到: ${DATA_FILE}`);
  console.log(`✅ 截图已保存到: ${OUTPUT_DIR}`);
  console.log(`✅ 共爬取 ${pageData.pages.length} 个主页面`);

  return pageData;
}

// 提取页面信息
async function extractPageInfo(page, pageName) {
  return await page.evaluate((name) => {
    const info = {
      name: name,
      title: document.title,
      url: window.location.href,
      sidebar: [],
      tabs: [],
      filters: [],
      tableHeaders: [],
      buttons: [],
      cards: []
    };

    // 提取侧边栏
    const sidebarSelectors = [
      '.sidebar a',
      '[class*="sidebar"] a',
      '[class*="side-menu"] a',
      'aside a'
    ];
    
    for (const selector of sidebarSelectors) {
      const items = document.querySelectorAll(selector);
      if (items.length > 0) {
        info.sidebar = Array.from(items).map(item => ({
          text: item.textContent.trim(),
          href: item.getAttribute('href'),
          active: item.classList.contains('active') || item.classList.contains('selected')
        })).filter(item => item.text && item.text.length < 50);
        break;
      }
    }

    // 提取标签页
    const tabSelectors = [
      '[role="tab"]',
      '.tab',
      '[class*="tab-item"]',
      '[class*="tabs"] > *'
    ];
    
    for (const selector of tabSelectors) {
      const items = document.querySelectorAll(selector);
      if (items.length > 0) {
        info.tabs = Array.from(items)
          .map(item => item.textContent.trim())
          .filter(t => t && t.length < 30);
        break;
      }
    }

    // 提取筛选器
    const filterInputs = document.querySelectorAll('input[placeholder], select');
    info.filters = Array.from(filterInputs).map(input => ({
      type: input.tagName.toLowerCase(),
      placeholder: input.placeholder || input.getAttribute('aria-label') || '',
      name: input.name || ''
    })).filter(f => f.placeholder || f.name);

    // 提取表格表头
    const tableHeaders = document.querySelectorAll('th');
    info.tableHeaders = Array.from(tableHeaders)
      .map(th => th.textContent.trim())
      .filter(t => t && t.length < 50);

    // 提取按钮
    const buttons = document.querySelectorAll('button');
    info.buttons = Array.from(buttons)
      .map(btn => btn.textContent.trim())
      .filter(t => t && t.length > 0 && t.length < 30)
      .slice(0, 20);

    // 提取卡片
    const cardSelectors = [
      '.card',
      '[class*="card"]',
      '[class*="item-card"]'
    ];
    
    for (const selector of cardSelectors) {
      const cards = document.querySelectorAll(selector);
      if (cards.length > 0) {
        info.cards = Array.from(cards).slice(0, 10).map(card => ({
          title: card.querySelector('h3, h4, [class*="title"]')?.textContent.trim() || '',
          content: card.textContent.substring(0, 200).trim()
        }));
        break;
      }
    }

    return info;
  }, pageName);
}

async function main() {
  console.log('🚀 启动完整页面爬虫...\\n');
  
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    args: ['--start-maximized']
  });
  
  const context = await browser.newContext({
    viewport: null,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  });
  
  const page = await context.newPage();
  
  try {
    // 访问登录页面
    console.log('🌐 正在访问登录页面...');
    await page.goto(`${BASE_URL}/login`, {
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
    console.log('⏸️  请在浏览器中手动完成登录:');
    console.log('   1. 输入账号: 11489573@qq.com');
    console.log('   2. 输入密码: Aa123456');
    console.log('   3. 点击登录按钮\n');
    
    await question('✅ 完成登录后，按 Enter 键开始爬取...');
    
    // 等待页面跳转
    console.log('\n⏳ 等待页面加载...');
    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
    
    console.log('✅ 登录成功！当前页面:', page.url());
    
    // 开始爬取
    await crawlAllPages(page);
    
    console.log('\n\n🎉 爬取完成！');
    console.log('📂 请查看以下文件:');
    console.log(`   - 结构数据: ${DATA_FILE}`);
    console.log(`   - 截图文件: ${OUTPUT_DIR}/`);
    
    await question('\n按 Enter 键关闭浏览器...');
    
  } catch (error) {
    console.error('\n❌ 发生错误:', error.message);
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
  rl.close();
  process.exit(1);
});
