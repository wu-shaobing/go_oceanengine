/**
 * 移动端菜单组件
 * 全屏抽屉式菜单
 */

import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useProductStore, useNavigationStore } from '@/store';
import { PRODUCTS } from '@/config/products';
import { getRouteByPageId } from '@/config/routes';

export function MobileMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentProduct } = useProductStore();
  const { setMobileSidebarOpen } = useNavigationStore();

  const product = PRODUCTS[currentProduct];

  const handleMenuItemClick = (pageId: string) => {
    const path = getRouteByPageId(pageId);
    if (path) {
      navigate(path);
      setMobileSidebarOpen(false); // 关闭菜单
    }
  };

  const isMenuItemActive = (pageId: string): boolean => {
    const path = getRouteByPageId(pageId);
    return path === location.pathname;
  };

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setMobileSidebarOpen(false)}
      />

      {/* 菜单内容 */}
      <div className="lg:hidden fixed inset-y-0 left-0 w-80 max-w-full bg-white z-50 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-md"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* 菜单列表 */}
        <nav className="p-4">
          {product.sidebarSections.map((section) => (
            <div key={section.id} className="mb-6">
              {/* 菜单组标题 */}
              <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700">
                <span className="text-lg">{section.icon}</span>
                <span>{section.title}</span>
              </div>

              {/* 菜单项 */}
              <div className="mt-2 space-y-1">
                {section.items.map((item) => {
                  const isActive = isMenuItemActive(item.page || item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.page || item.id)}
                      className={`
                        w-full text-left px-6 py-2 text-sm rounded-md transition-colors
                        ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
