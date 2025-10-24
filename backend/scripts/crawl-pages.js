const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// 配置
const BASE_URL = 'https://oi.mobgi.com';
const OUTPUT_FILE = path.join(__dirname, '../docs/page-structure.json');

// 需要登录的cookie或session信息(如果需要)
const LOGIN_INFO = {
  // 可以在这里添加登录态信息
};

async function crawlPages() {
  const browser = await chromium.launch({ 
    headless: false, // 设置为false可以看到浏览器操作
    slowMo: 100 
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  const pageStructure = {
    crawlTime: new Date().toISOString(),
    pages: []
  };

  try {
    // 主导航菜单
    const mainNavs = [
      { name: '首页', path: '/' },
      { name: '推广', path: '/promotion', hasDropdown: true },
      { name: '报表', path: '/report' },
      { name: '素材', path: '/material' },
      { name: '资产', path: '/property', hasDropdown: true },
      { name: '任务', path: '/task', hasDropdown: true },
      { name: '工具', path: '/tool' },
      { name: '管理', path: '/manage' }
    ];

    console.log('开始抓取页面结构...\n');

    for (const nav of mainNavs) {
      console.log(`正在抓取: ${nav.name}`);
      
      try {
        // 访问主页面
        await page.goto(`${BASE_URL}${nav.path}`, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        
        await page.waitForTimeout(1000);

        // 提取页面信息
        const pageInfo = await page.evaluate(() => {
          const result = {
            title: document.title,
            url: window.location.href,
            mainContent: {},
            sidebar: [],
            tabs: [],
            filters: [],
            tables: [],
            buttons: []
          };

          // 提取侧边栏导航
          const sidebarItems = document.querySelectorAll('.sidebar-item, [class*="menu-item"], [class*="nav-item"]');
          result.sidebar = Array.from(sidebarItems).map(item => ({
            text: item.textContent.trim(),
            active: item.classList.contains('active')
          })).filter(item => item.text);

          // 提取标签页
          const tabs = document.querySelectorAll('[role="tab"], .tab-item, [class*="tab"]');
          result.tabs = Array.from(tabs).map(tab => tab.textContent.trim()).filter(t => t);

          // 提取筛选器
          const filters = document.querySelectorAll('input[placeholder], select, .filter-item');
          result.filters = Array.from(filters).map(filter => ({
            type: filter.tagName.toLowerCase(),
            placeholder: filter.placeholder || filter.textContent.trim()
          }));

          // 提取表格表头
          const tableHeaders = document.querySelectorAll('th, [class*="table-header"]');
          result.tables = Array.from(tableHeaders).map(th => th.textContent.trim()).filter(t => t);

          // 提取主要按钮
          const buttons = document.querySelectorAll('button:not([class*="icon-only"])');
          result.buttons = Array.from(buttons)
            .map(btn => btn.textContent.trim())
            .filter(t => t && t.length < 20);

          return result;
        });

        pageStructure.pages.push({
          nav: nav.name,
          path: nav.path,
          ...pageInfo
        });

        console.log(`  ✓ 已抓取 ${nav.name} - 发现 ${pageInfo.sidebar.length} 个子菜单`);

        // 如果有侧边栏,尝试点击子菜单
        if (pageInfo.sidebar.length > 0) {
          const subPages = [];
          
          for (let i = 0; i < Math.min(pageInfo.sidebar.length, 5); i++) {
            try {
              const sidebarItems = await page.$$('.sidebar-item, [class*="menu-item"]');
              if (sidebarItems[i]) {
                await sidebarItems[i].click();
                await page.waitForTimeout(800);
                
                const subPageInfo = await page.evaluate(() => ({
                  url: window.location.href,
                  title: document.title,
                  content: document.querySelector('main, .content, [class*="main"]')?.textContent.substring(0, 200)
                }));
                
                subPages.push({
                  index: i,
                  menuText: pageInfo.sidebar[i].text,
                  ...subPageInfo
                });
              }
            } catch (err) {
              console.log(`    跳过子菜单 ${i}: ${err.message}`);
            }
          }
          
          if (subPages.length > 0) {
            pageStructure.pages[pageStructure.pages.length - 1].subPages = subPages;
          }
        }

        // 截图
        const screenshotPath = path.join(__dirname, `../docs/screenshots/${nav.name}.png`);
        await fs.promises.mkdir(path.dirname(screenshotPath), { recursive: true });
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  ✓ 已保存截图: ${nav.name}.png\n`);

      } catch (error) {
        console.log(`  ✗ 抓取 ${nav.name} 失败: ${error.message}\n`);
        pageStructure.pages.push({
          nav: nav.name,
          path: nav.path,
          error: error.message
        });
      }
    }

    // 保存结果
    await fs.promises.writeFile(
      OUTPUT_FILE, 
      JSON.stringify(pageStructure, null, 2),
      'utf-8'
    );
    
    console.log('\n✓ 抓取完成!');
    console.log(`✓ 数据已保存到: ${OUTPUT_FILE}`);
    console.log(`✓ 共抓取 ${pageStructure.pages.length} 个主页面`);

  } catch (error) {
    console.error('抓取过程出错:', error);
  } finally {
    await browser.close();
  }

  return pageStructure;
}

// 执行
crawlPages().then(() => {
  console.log('\n所有任务完成!');
  process.exit(0);
}).catch(err => {
  console.error('执行失败:', err);
  process.exit(1);
});
