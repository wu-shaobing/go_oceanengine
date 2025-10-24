import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, User } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/projects', label: '项目' },
    { path: '/ads', label: '广告' },
    { path: '/report', label: '报表' },
    { path: '/property', label: '资产', icon: Package },
  ];

  // 资产管理侧边栏菜单
  const sidebarItems = showSidebar && location.pathname.startsWith('/property') ? [
    { section: '通用资产', items: [
      { path: '/property/title-library', label: '文案库' },
      { path: '/property/asset-category', label: '资产分类' },
    ]},
    { section: '巨量广告', items: [
      { path: '/property/shop-link', label: '商品链接' },
      { path: '/property/audience', label: '定向包' },
      { path: '/property/landing-page', label: '落地页' },
      { path: '/property/openurl', label: '直达链接' },
      { path: '/property/activity', label: '监测活动' },
      { path: '/property/dmp', label: '自定义人群包' },
      { path: '/property/event-management', label: '事件管理' },
    ]},
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 z-50">
        <div className="h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">创</span>
              </div>
              <span className="font-semibold text-gray-900">创量广告</span>
            </Link>
            <div className="flex gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded text-sm ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-14 flex">
        {/* Sidebar */}
        {sidebarItems.length > 0 && (
          <aside className="fixed left-0 top-14 bottom-0 w-48 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="py-4">
              {sidebarItems.map((section, idx) => (
                <div key={idx} className="mb-4">
                  <div className="px-4 mb-2">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase">{section.section}</h3>
                  </div>
                  <nav className="space-y-0.5 px-2">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block px-3 py-2 rounded text-sm ${
                          location.pathname === item.path
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${sidebarItems.length > 0 ? 'ml-48' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
