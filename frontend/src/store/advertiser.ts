/**
 * 广告主状态管理
 * 管理当前选中的广告主账号
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Advertiser {
  id: string;
  name: string;
  role?: string;
}

interface AdvertiserState {
  // 当前广告主
  currentAdvertiser: Advertiser | null;
  
  // 广告主列表
  advertiserList: Advertiser[];
  
  // 设置当前广告主
  setAdvertiser: (advertiser: Advertiser) => void;
  
  // 设置广告主列表
  setAdvertiserList: (list: Advertiser[]) => void;
  
  // 清空广告主
  clearAdvertiser: () => void;
}

export const useAdvertiserStore = create<AdvertiserState>()(
  persist(
    (set) => ({
      currentAdvertiser: null,
      advertiserList: [],
      
      setAdvertiser: (advertiser) => {
        set({ currentAdvertiser: advertiser });
      },
      
      setAdvertiserList: (list) => {
        set({ advertiserList: list });
      },
      
      clearAdvertiser: () => {
        set({ currentAdvertiser: null });
      },
    }),
    {
      name: 'advertiser-storage',
    }
  )
);
