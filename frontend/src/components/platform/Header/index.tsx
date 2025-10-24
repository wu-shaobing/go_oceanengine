/**
 * Header 组件
 * 包含Logo、导航菜单、广告主选择器、用户菜单
 */

import { useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Dropdown, Avatar, Space, Select } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigationStore, useAdvertiserStore, useProductStore } from '@/store';
import { PRODUCTS } from '@/config/products';
import { getRouteByPageId } from '@/config/routes';

export function Header() {
  const navigate = useNavigate();
  const { toggleMobileSidebar } = useNavigationStore();
  const { currentAdvertiser, advertiserList, setAdvertiser } = useAdvertiserStore();
  const { currentProduct } = useProductStore();

  // 当前产品配置
  const product = PRODUCTS[currentProduct];

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <Settings size={16} />,
      label: '设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: '退出登录',
      danger: true,
    },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      // TODO: 实现退出登录逻辑
      console.log('退出登录');
    }
  };

  // 顶部导航点击
  const handleNavClick = (pageId: string) => {
    const path = getRouteByPageId(pageId);
    if (path) {
      navigate(path);
    }
  };

  // 广告主选择
  const handleAdvertiserChange = (advertiserId: string) => {
    const advertiser = advertiserList.find((a) => a.id === advertiserId);
    if (advertiser) {
      setAdvertiser(advertiser);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center h-16 px-4 lg:px-6">
        {/* 移动端菜单按钮 */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md mr-3"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center mr-8 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/logo.svg" alt="AI智能投放" className="h-8 w-8 mr-2" />
          <div className="font-bold text-xl text-gray-800">AI智能投放</div>
        </div>

        {/* 顶部导航 - 桌面端 */}
        <nav className="hidden lg:flex items-center space-x-1 flex-1">
          {product.navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.page)}
              className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center space-x-4 ml-auto">
          {/* 广告主选择器 */}
          {advertiserList.length > 0 && (
            <Select
              value={currentAdvertiser?.id}
              onChange={handleAdvertiserChange}
              style={{ minWidth: 150 }}
              placeholder="选择广告主"
              options={advertiserList.map((adv) => ({
                label: adv.name,
                value: adv.id,
              }))}
            />
          )}

          {/* 用户菜单 */}
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
            placement="bottomRight"
          >
            <Space className="cursor-pointer hover:bg-gray-50 rounded-md px-2 py-1">
              <Avatar size="small" icon={<User size={16} />} />
              <span className="hidden sm:inline text-sm text-gray-700">管理员</span>
              <ChevronDown size={16} className="text-gray-500" />
            </Space>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
