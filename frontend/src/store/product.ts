/**
 * 产品线状态管理
 * 管理当前选中的产品线（巨量广告、千川、抖+）
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductId } from '@/config/products';

interface ProductState {
  // 当前产品线
  currentProduct: ProductId;
  
  // 切换产品线
  switchProduct: (productId: ProductId) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      currentProduct: 'jl-ad',
      
      switchProduct: (productId) => {
        set({ currentProduct: productId });
      },
    }),
    {
      name: 'product-storage',
    }
  )
);
