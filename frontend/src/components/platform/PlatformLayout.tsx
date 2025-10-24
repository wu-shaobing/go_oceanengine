/**
 * 平台主布局组件
 * 包含顶部栏、产品选项卡、侧边栏和内容区
 */

import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { ProductTabs } from './ProductTabs';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';
import { useNavigationStore } from '@/store';

export function PlatformLayout() {
  const { sidebarCollapsed, mobileSidebarOpen } = useNavigationStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 顶部 Header */}
      <Header />

      {/* 产品选项卡 */}
      <ProductTabs />

      {/* 主内容区 */}
      <div className="flex flex-1 relative">
        {/* 侧边栏 - 桌面端 */}
        <Sidebar />

        {/* 主内容 */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}
        >
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>

        {/* 移动端菜单 */}
        {mobileSidebarOpen && <MobileMenu />}
      </div>
    </div>
  );
}
