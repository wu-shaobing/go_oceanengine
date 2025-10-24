// 当前产品线
let currentProduct = 'jl-ad';

// 全局广告主ID
let globalAdvertiserId = '';

// 移动端菜单状态
let isMobileSidebarOpen = false;

// 页面名称映射
const pageNames = {
    // 巨量广告
    'ad-overview': '概览',
    'ad-project': '项目管理',
    'ad-campaign': '广告管理',
    'ad-creative-manage': '创意管理',
    'ad-report': '报表查询',
    'ad-tools': '工具',
    'ad-account': '账户',
    'ad-landing-page': '落地页',
    'ad-creative': '创意管理',
    'ad-targeting': '定向包',
    'ad-audience': '人群包',
    'ad-site': '监测链接',
    'negative-keywords': '否定关键词',
    
    // SDK相关
    'sdk-config': 'SDK配置与认证',
    'sdk-quickstart': 'SDK快速开始',
    'api-list': 'API接口列表',
    'api-debugger': 'API调试器',
    'batch-operations': '批量操作',
    'material-upload': '素材上传中心',
    
    
    // 账户管理
    'account-funds': '账户资金',
    'account-budget': '预算管理',
    'shared-wallet': '共享钱包',
    
    // 高级功能
    'async-report': '异步报表',
    'oauth-manage': 'OAuth授权',
    'security-compliance': '安全合规',
    'service-market': '服务市场',
    'best-practices': '最佳实践',
    'error-codes': '错误码文档',
    
    // 巨量千川
    'qc-overview': '概览',
    'qc-plan': '推广计划',
    'qc-product-promo': '商品推广',
    'qc-live-promo': '直播间推广',
    'qc-report': '报表',
    'qc-material': '素材',
    'qc-account': '账户',
    'qc-product': '商品管理',
    'qc-live': '直播间管理',
    'qc-aweme': '抖音号管理',
    'qc-shop': '店铺设置',
    'qc-creative': '创意素材',
    'qc-audience': '人群包',
    'qc-sdk-config': 'SDK配置',
    'qc-api-debugger': 'API调试器',
    'qc-kol': '达人列表',
    'qc-kol-cooperation': '合作记录',
    'qc-commission': '佣金管理',
    'qc-account-funds': '账户资金',
    'qc-account-budget': '预算管理',
    
    // 抖+
    'dp-overview': '概览',
    'dp-video-promo': '视频加热',
    'dp-live-promo': '直播加热',
    'dp-order-list': '订单列表',
    'dp-data': '数据中心',
    'dp-video': '视频管理',
    'dp-live': '直播管理',
    'dp-order': '订单管理',
    'dp-order-detail': '订单详情',
    'dp-quick-boost': '快速加热',
    'dp-api-tools': 'API工具'
};

// 产品线切换
function switchProduct(productId) {
    currentProduct = productId;
    
    // 更新产品标签激活状态
    document.querySelectorAll('.product-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-product') === productId) {
            tab.classList.add('active');
        }
    });
    
    // 切换导航栏
    document.querySelectorAll('.main-nav').forEach(nav => {
        nav.style.display = 'none';
    });
    const targetNav = document.getElementById(`${productId}-nav`);
    if (targetNav) {
        targetNav.style.display = 'flex';
    }
    
    // 切换侧边栏
    document.querySelectorAll('.sidebar').forEach(sidebar => {
        sidebar.style.display = 'none';
    });
    const targetSidebar = document.getElementById(`${productId}-sidebar`);
    if (targetSidebar) {
        targetSidebar.style.display = 'block';
    }
    
    // 隐藏所有页面
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示当前产品的默认页面（概览）
    const defaultPage = document.getElementById(`${productId}-overview`);
    if (defaultPage) {
        defaultPage.classList.add('active');
        // 更新面包屑
        const breadcrumbFirst = document.querySelector('.breadcrumb-item:first-child');
        const breadcrumbCurrent = document.getElementById('current-page-name');
        if (breadcrumbFirst) {
            const productNames = {
                'jl-ad': '巨量广告',
                'qianchuan': '巨量千川',
                'douplus': '抖+'
            };
            breadcrumbFirst.textContent = productNames[productId] || '巨量广告';
        }
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = '概览';
        }
    }
}

// 页面切换功能
function switchPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示选中的页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新侧边栏激活状态
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });
    
    // 更新顶部导航栏激活状态
    document.querySelectorAll('.main-nav .nav-item').forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-page') === pageId) {
            nav.classList.add('active');
        }
    });
    
    // 更新面包屑
    const pageName = pageNames[pageId] || pageId;
    const breadcrumbCurrent = document.getElementById('current-page-name');
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = pageName;
    }
    
    // 切换页面后自动填充广告主ID
    setTimeout(() => {
        autoFillAdvertiserId();
    }, 100);  // 等待页面渲染完成
}

// 添加演示提示功能
function showDemoAlert(message) {
    alert('🔔 演示提示\n\n' + message + '\n\n注意：本页面为静态文档演示，不支持实际API调用。');
}

// 初始化演示按钮
function initDemoButtons() {
    // OAuth获取按钮
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('OAuth获取')) {
            btn.onclick = () => showDemoAlert('OAuth获取功能说明：\n\n1. 跳转至巨量引擎授权页面\n2. 用户登录并授权应用\n3. 回调获取authorization code\n4. 使用code换取Access Token\n\n请参考OAuth文档了解详细流程。');
        }
        if (btn.textContent.includes('刷新Token')) {
            btn.onclick = () => showDemoAlert('刷新Token功能说明：\n\n使用Refresh Token调用刷新接口\n获取新的Access Token和有效期\n\n建议在Token过期前主动刷新。');
        }
        if (btn.textContent.includes('发送请求')) {
            btn.onclick = () => {
                showDemoAlert('API调试功能说明：\n\n1. 填写完整的请求参数\n2. 系统会自动生成签名\n3. 发送HTTPS请求到API接口\n4. 返回响应结果\n\n实际使用时请确保Token和参数正确。');
                // 模拟响应
                const respArea = document.querySelector('textarea[placeholder*="响应"]');
                if (respArea) {
                    respArea.value = JSON.stringify({
                        "code": 0,
                        "message": "success",
                        "data": {
                            "demo": "这是演示响应数据",
                            "timestamp": new Date().toISOString()
                        }
                    }, null, 2);
                }
            };
        }
        if (btn.textContent === '测试连接') {
            btn.onclick = () => showDemoAlert('测试连接功能：\n\n向API服务器发送ping请求\n验证网络连通性和认证状态\n\n返回连接状态和延迟信息。');
        }
        if (btn.textContent === '保存配置') {
            btn.onclick = () => showDemoAlert('配置已保存到本地（演示）\n\n实际应用中会保存到：\n• 环境变量\n• 配置文件\n• 或数据库');
        }
    });
}

// 全局广告主ID管理
function initGlobalAdvertiserId() {
    const select = document.getElementById('global-advertiser-id');
    if (!select) return;
    
    // 从localStorage读取保存的广告主ID
    const saved = getFromLocalStorage('globalAdvertiserId');
    if (saved) {
        globalAdvertiserId = saved;
        select.value = saved;
    }
    
    // 监听选择框变化
    select.addEventListener('change', function() {
        globalAdvertiserId = this.value;
        saveToLocalStorage('globalAdvertiserId', this.value);
        
        // 自动填充到页面中所有名为 "advertiser_id" 的输入框
        autoFillAdvertiserId();
        
        console.log('全局广告主ID已更新:', this.value);
    });
}

// 自动填充广告主ID到所有页面(包括当前和未来)
function autoFillAdvertiserId() {
    if (!globalAdvertiserId) return;
    
    // 填充所有页面的广告主ID输入框(不仅限于活跃页面)
    const inputs = document.querySelectorAll('input[placeholder*="广告主ID"], input[placeholder*="advertiser_id"], input[id*="advertiser"]');
    inputs.forEach(input => {
        // 只填充空值或默认值
        if (!input.value || input.value.trim() === '' || input.placeholder.includes('请输入') || input.placeholder.includes('必填')) {
            input.value = globalAdvertiserId;
        }
    });
    
    console.log(`全局广告主ID已同步: ${globalAdvertiserId}`);
}

// 添加新广告主
function addNewAdvertiser() {
    const advertiserId = prompt('请输入新的广告主ID:');
    if (advertiserId && advertiserId.trim()) {
        const select = document.getElementById('global-advertiser-id');
        if (select) {
            // 检查是否已存在
            const exists = Array.from(select.options).some(opt => opt.value === advertiserId.trim());
            if (!exists) {
                const option = document.createElement('option');
                option.value = advertiserId.trim();
                option.textContent = advertiserId.trim();
                select.appendChild(option);
                select.value = advertiserId.trim();
                
                // 触发change事件
                select.dispatchEvent(new Event('change'));
                
                // 保存到localStorage
                const savedList = getFromLocalStorage('advertiserList') || [];
                savedList.push(advertiserId.trim());
                saveToLocalStorage('advertiserList', savedList);
            } else {
                alert('该广告主ID已存在');
            }
        }
    }
}

// 侧边栏菜单点击事件
document.addEventListener('DOMContentLoaded', function() {
// 初始化广告主ID
initGlobalAdvertiserId();

// 初始化演示按钮功能
initDemoButtons();
    // 产品线标签点击
    document.querySelectorAll('.product-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            if (productId) {
                switchProduct(productId);
            }
        });
    });
    
    // 顶部导航栏点击
    document.querySelectorAll('.main-nav .nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId && !this.classList.contains('has-dropdown')) {
                // 更新顶部导航栏激活状态
                document.querySelectorAll('.main-nav .nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                switchPage(pageId);
            } else if (this.classList.contains('has-dropdown')) {
                // 如果是下拉菜单，切换wrapper的active状态
                const wrapper = this.closest('.nav-item-wrapper');
                if (wrapper) {
                    const isActive = wrapper.classList.contains('active');
                    // 关闭所有其他下拉菜单
                    document.querySelectorAll('.nav-item-wrapper').forEach(w => {
                        w.classList.remove('active');
                    });
                    // 切换当前状态
                    if (!isActive) {
                        wrapper.classList.add('active');
                    }
                }
            }
        });
    });
    
    // 二级导航菜单点击
    document.querySelectorAll('.sub-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // 阻止事件冒泡
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                // 更新二级菜单激活状态
                document.querySelectorAll('.sub-nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                // 更新顶部导航栏激活状态
                const wrapper = this.closest('.nav-item-wrapper');
                const parentNav = wrapper.querySelector('.nav-item');
                if (parentNav) {
                    document.querySelectorAll('.main-nav .nav-item').forEach(nav => {
                        nav.classList.remove('active');
                    });
                    parentNav.classList.add('active');
                }
                
                // 关闭下拉菜单
                wrapper.classList.remove('active');
                
                switchPage(pageId);
            }
        });
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item-wrapper')) {
            document.querySelectorAll('.nav-item-wrapper').forEach(wrapper => {
                wrapper.classList.remove('active');
            });
        }
    });
    
    // 报表子导航切换
    document.querySelectorAll('.report-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const reportId = this.getAttribute('data-report');
            if (reportId) {
                // 更新子导航激活状态
                document.querySelectorAll('.report-nav-item').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                // 切换报表内容
                document.querySelectorAll('.report-content').forEach(content => {
                    content.classList.remove('active');
                });
                const targetReport = document.getElementById(reportId);
                if (targetReport) {
                    targetReport.classList.add('active');
                }
            }
        });
    });
    
    // 菜单项点击
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                switchPage(pageId);
            }
        });
    });
    
    // 侧边栏折叠/展开
    document.querySelectorAll('.sidebar-header').forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            section.classList.toggle('collapsed');
        });
    });
    
    // Tab切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // 关闭帮助提示框
    const btnKnow = document.querySelector('.btn-know');
    if (btnKnow) {
        btnKnow.addEventListener('click', function() {
            const helpNotice = document.querySelector('.help-notice');
            if (helpNotice) {
                helpNotice.style.display = 'none';
            }
        });
    }
    
    // 清空按钮功能
    document.querySelectorAll('.btn-clear').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterItem = this.closest('.filter-item');
            if (filterItem) {
                const select = filterItem.querySelector('.select-input');
                if (select) {
                    select.selectedIndex = 0;
                }
            }
        });
    });
    
    // 清空链接功能
    document.querySelectorAll('.btn-link').forEach(btn => {
        if (btn.textContent.includes('清空')) {
            btn.addEventListener('click', function() {
                const filters = this.closest('.page-filters');
                if (filters) {
                    // 重置所有输入框
                    filters.querySelectorAll('.text-input').forEach(input => {
                        input.value = '';
                    });
                    // 重置所有下拉框
                    filters.querySelectorAll('.select-input').forEach(select => {
                        select.selectedIndex = 0;
                    });
                }
            });
        }
    });
    
    // 全选复选框功能
    document.querySelectorAll('.data-table thead input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const table = this.closest('.data-table');
            const bodyCheckboxes = table.querySelectorAll('tbody input[type="checkbox"]');
            bodyCheckboxes.forEach(cb => {
                cb.checked = this.checked;
            });
            updateSelectedCount(table);
        });
    });
    
    // 单个复选框功能
    document.querySelectorAll('.data-table tbody input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const table = this.closest('.data-table');
            updateSelectedCount(table);
        });
    });
    
    // 搜索按钮功能
    document.querySelectorAll('.btn-search').forEach(btn => {
        btn.addEventListener('click', function() {
            const filterItem = this.closest('.filter-item');
            if (filterItem) {
                const input = filterItem.querySelector('.text-input');
                if (input && input.value.trim()) {
                    console.log('搜索:', input.value);
                    // 这里可以添加实际的搜索逻辑
                }
            }
        });
    });
    
    // Enter键搜索
    document.querySelectorAll('.text-input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchBtn = this.parentElement.querySelector('.btn-search');
                if (searchBtn) {
                    searchBtn.click();
                }
            }
        });
    });
    
    // 分页按钮功能
    document.querySelectorAll('.btn-page').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.textContent;
            const currentPageSpan = this.parentElement.querySelector('.page-current');
            if (currentPageSpan) {
                let currentPage = parseInt(currentPageSpan.textContent);
                if (text === '<' && currentPage > 1) {
                    currentPageSpan.textContent = currentPage - 1;
                } else if (text === '>') {
                    currentPageSpan.textContent = currentPage + 1;
                }
            }
        });
    });
    
    // 页面跳转功能
    document.querySelectorAll('.page-input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const page = parseInt(this.value);
                if (page > 0) {
                    const currentPageSpan = this.parentElement.querySelector('.page-current');
                    if (currentPageSpan) {
                        currentPageSpan.textContent = page;
                    }
                }
            }
        });
    });
    
    // 主按钮点击反馈
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            // 添加点击效果
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
    
    // 表格行点击高亮
    document.querySelectorAll('.data-table tbody tr').forEach(row => {
        if (!row.querySelector('.empty-state')) {
            row.addEventListener('click', function(e) {
                // 如果点击的是复选框，不处理
                if (e.target.type === 'checkbox') return;
                
                // 移除其他行的高亮
                this.parentElement.querySelectorAll('tr').forEach(r => {
                    r.style.backgroundColor = '';
                });
                
                // 高亮当前行
                this.style.backgroundColor = '#e6f2ff';
            });
        }
    });
});

// 更新选中数量
function updateSelectedCount(table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    
    // 更新表格操作区域的计数
    const tableWrapper = table.closest('.table-wrapper');
    if (tableWrapper) {
        const countSpan = tableWrapper.querySelector('.table-actions span');
        if (countSpan) {
            countSpan.textContent = `已选 ${checkedCount} 条`;
        }
    }
}

// 模拟加载数据
function loadData() {
    // 这里可以添加AJAX请求来加载实际数据
    console.log('加载数据...');
}

// 导出功能
function exportData() {
    console.log('导出数据...');
    alert('导出功能开发中...');
}

// 批量操作
function batchOperation(action) {
    const tables = document.querySelectorAll('.data-table');
    tables.forEach(table => {
        const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]:checked');
        if (checkboxes.length > 0) {
            console.log(`批量${action}:`, checkboxes.length, '条');
            alert(`已选择 ${checkboxes.length} 条数据进行${action}`);
        } else {
            alert('请先选择数据');
        }
    });
}

// 平滑滚动
function smoothScroll(target) {
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 输入框防抖搜索
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.text-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(function(e) {
            if (e.target.value.length >= 2) {
                console.log('自动搜索:', e.target.value);
                // 这里可以添加自动搜索逻辑
            }
        }, 500));
    });
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K: 聚焦搜索框
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const firstInput = document.querySelector('.text-input');
        if (firstInput) {
            firstInput.focus();
        }
    }
    
    // ESC: 关闭提示框
    if (e.key === 'Escape') {
        const helpNotice = document.querySelector('.help-notice');
        if (helpNotice) {
            helpNotice.style.display = 'none';
        }
    }
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('页面可见，刷新数据...');
        // 可以在这里添加数据刷新逻辑
    }
});

// 本地存储功能
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('保存失败:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('读取失败:', e);
        return null;
    }
}

// 保存当前页面状态
window.addEventListener('beforeunload', function() {
    const activePage = document.querySelector('.page-content.active');
    if (activePage) {
        saveToLocalStorage('currentPage', activePage.id);
    }
});

// 恢复页面状态
window.addEventListener('load', function() {
    const savedPage = getFromLocalStorage('currentPage');
    if (savedPage) {
        switchPage(savedPage);
    }
});

// ==================== 移动端响应式功能 ====================

// 切换移动端侧边栏
function toggleMobileSidebar() {
    isMobileSidebarOpen = !isMobileSidebarOpen;
    
    const sidebar = document.querySelector('.sidebar:not([style*="display: none"])');
    const overlay = document.getElementById('sidebar-overlay');
    const menuBtn = document.getElementById('mobile-menu-btn');
    
    if (isMobileSidebarOpen) {
        // 打开侧边栏
        if (sidebar) sidebar.classList.add('mobile-open');
        if (overlay) overlay.classList.add('active');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'true');
            menuBtn.setAttribute('aria-label', '关闭菜单');
        }
        // 禁止背景滚动
        document.body.style.overflow = 'hidden';
    } else {
        // 关闭侧边栏
        if (sidebar) sidebar.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        if (menuBtn) {
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', '打开菜单');
        }
        // 恢复背景滚动
        document.body.style.overflow = '';
    }
}

// 关闭移动端侧边栏
function closeMobileSidebar() {
    if (isMobileSidebarOpen) {
        toggleMobileSidebar();
    }
}

// 初始化移动端事件
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    
    // 菜单按钮点击
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileSidebar);
    }
    
    // 遮罩点击关闭
    if (overlay) {
        overlay.addEventListener('click', closeMobileSidebar);
    }
    
    // 侧边栏菜单项点击后关闭（移动端）
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            // 如果是移动端，切换页面后关闭侧边栏
            if (window.innerWidth <= 768) {
                setTimeout(closeMobileSidebar, 300);
            }
        });
    });
    
    // ESC 键关闭侧边栏
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobileSidebarOpen) {
            closeMobileSidebar();
        }
    });
    
    // 窗口大小变化时关闭侧边栏
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMobileSidebarOpen) {
                closeMobileSidebar();
            }
        }, 250);
    });
}

// 检测设备类型
function detectDevice() {
    const width = window.innerWidth;
    let deviceType = 'desktop';
    
    if (width < 768) {
        deviceType = 'mobile';
    } else if (width < 1024) {
        deviceType = 'tablet';
    }
    
    document.body.setAttribute('data-device', deviceType);
    return deviceType;
}

// 初始化设备检测
detectDevice();
window.addEventListener('resize', detectDevice);

// 初始化移动端功能
initMobileMenu();

// ==================== Toast 消息系统 ====================

// 创建Toast容器
function createToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

// 显示Toast消息
function showToast(message, type = 'info', duration = 3000) {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    const titles = {
        success: '成功',
        error: '错误',
        warning: '警告',
        info: '信息'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">${icons[type] || icons.info}</div>
        <div class="toast-content">
            <div class="toast-title">${titles[type] || titles.info}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="关闭">×</button>
    `;
    
    container.appendChild(toast);
    
    // 关闭按钮事件
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    // 自动关闭
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }
    
    return toast;
}

// 移除Toast
function removeToast(toast) {
    toast.classList.add('hiding');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// 快捷方法
const Toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    warning: (message, duration) => showToast(message, 'warning', duration),
    info: (message, duration) => showToast(message, 'info', duration)
};

// 暴露到全局
window.Toast = Toast;

// ==================== 动画工具类 ====================

// 为元素添加动画类
function addAnimation(element, animationClass, callback) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', function handler() {
        element.classList.remove(animationClass);
        element.removeEventListener('animationend', handler);
        if (callback) callback();
    });
}

// 批量添加进场动画
function animateElements(selector, animationClass = 'fade-in-up', stagger = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add(animationClass);
        }, index * stagger);
    });
}

// 波纹效果
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

// 为按钮添加波纹效果
function initRippleEffect() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        if (!button.classList.contains('ripple-container')) {
            button.classList.add('ripple-container');
            button.addEventListener('click', function(e) {
                createRipple(e, this);
            });
        }
    });
}

// 初始化动画
initRippleEffect();

console.log('巨量广告管理平台已加载（响应式 + 动画版本）');
