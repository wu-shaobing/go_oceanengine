/**
 * 导航状态管理
 * 管理侧边栏折叠、移动端菜单等导航状态
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NavigationState {
  // 侧边栏是否折叠
  sidebarCollapsed: boolean;
  
  // 移动端侧边栏是否打开
  mobileSidebarOpen: boolean;
  
  // 当前激活的菜单项
  activeMenuItem: string | null;
  
  // 展开的菜单组
  expandedMenuSections: string[];
  
  // 切换侧边栏折叠
  toggleSidebar: () => void;
  
  // 设置侧边栏折叠
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // 切换移动端侧边栏
  toggleMobileSidebar: () => void;
  
  // 设置移动端侧边栏
  setMobileSidebarOpen: (open: boolean) => void;
  
  // 设置激活菜单项
  setActiveMenuItem: (menuId: string) => void;
  
  // 切换菜单组展开/折叠
  toggleMenuSection: (sectionId: string) => void;
  
  // 设置展开的菜单组
  setExpandedMenuSections: (sections: string[]) => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      activeMenuItem: null,
      expandedMenuSections: [],
      
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
      },
      
      setSidebarCollapsed: (collapsed) => {
        set({ sidebarCollapsed: collapsed });
      },
      
      toggleMobileSidebar: () => {
        set((state) => ({ mobileSidebarOpen: !state.mobileSidebarOpen }));
      },
      
      setMobileSidebarOpen: (open) => {
        set({ mobileSidebarOpen: open });
      },
      
      setActiveMenuItem: (menuId) => {
        set({ activeMenuItem: menuId });
      },
      
      toggleMenuSection: (sectionId) => {
        set((state) => {
          const expanded = state.expandedMenuSections.includes(sectionId);
          return {
            expandedMenuSections: expanded
              ? state.expandedMenuSections.filter((id) => id !== sectionId)
              : [...state.expandedMenuSections, sectionId],
          };
        });
      },
      
      setExpandedMenuSections: (sections) => {
        set({ expandedMenuSections: sections });
      },
    }),
    {
      name: 'navigation-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        expandedMenuSections: state.expandedMenuSections,
      }),
    }
  )
);
