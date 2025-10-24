/**
 * 侧边栏组件
 * 显示当前产品线的菜单结构
 */

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useProductStore, useNavigationStore } from '@/store';
import { PRODUCTS } from '@/config/products';
import { getRouteByPageId } from '@/config/routes';
import { getProductColor } from '@/config/theme';

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentProduct } = useProductStore();
  const {
    sidebarCollapsed,
    toggleSidebar,
    expandedMenuSections,
    toggleMenuSection,
    setExpandedMenuSections,
  } = useNavigationStore();

  const product = PRODUCTS[currentProduct];
  const productColor = getProductColor(currentProduct);

  // 默认展开第一个菜单组
  React.useEffect(() => {
    if (product && product.sidebarSections.length > 0 && expandedMenuSections.length === 0) {
      setExpandedMenuSections([product.sidebarSections[0].id]);
    }
  }, [product, expandedMenuSections.length, setExpandedMenuSections]);

  // 处理菜单项点击
  const handleMenuItemClick = (pageId: string) => {
    const path = getRouteByPageId(pageId);
    if (path) {
      navigate(path);
    }
  };

  // 检查菜单项是否激活
  const isMenuItemActive = (pageId: string): boolean => {
    const path = getRouteByPageId(pageId);
    return path === location.pathname;
  };

  // 检查菜单组是否展开
  const isSectionExpanded = (sectionId: string): boolean => {
    return expandedMenuSections.includes(sectionId);
  };

  return (
    <aside
      className={`
        hidden lg:block fixed left-0 top-32 bottom-0 bg-white border-r border-gray-200
        transition-all duration-300 z-40
        ${sidebarCollapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* 折叠按钮 */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-4 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-50 shadow-sm"
        aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* 菜单内容 */}
      <nav className="h-full overflow-y-auto py-4">
        {product.sidebarSections.map((section) => {
          const isExpanded = isSectionExpanded(section.id);

          return (
            <div key={section.id} className="mb-2">
              {/* 菜单组标题 */}
              <button
                onClick={() => !sidebarCollapsed && toggleMenuSection(section.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-2 text-sm font-medium
                  text-gray-700 hover:bg-gray-50 transition-colors
                  ${sidebarCollapsed ? 'justify-center' : ''}
                `}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{section.icon}</span>
                  {!sidebarCollapsed && <span>{section.title}</span>}
                </div>
                {!sidebarCollapsed && (
                  <span className="text-gray-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                )}
              </button>

              {/* 菜单项 */}
              {(!sidebarCollapsed && isExpanded) && (
                <div className="mt-1">
                  {section.items.map((item) => {
                    const isActive = isMenuItemActive(item.page || item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleMenuItemClick(item.page || item.id)}
                        className={`
                          w-full flex items-center px-4 py-2 pl-10 text-sm
                          transition-colors
                          ${
                            isActive
                              ? 'bg-blue-50 text-blue-600 font-medium border-r-2'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }
                        `}
                        style={{
                          borderRightColor: isActive ? productColor : 'transparent',
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
