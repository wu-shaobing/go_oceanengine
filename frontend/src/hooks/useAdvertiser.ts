/**
 * 广告主ID管理Hook
 * 统一管理advertiser_id，支持从OAuth回调、localStorage或默认值读取
 */

import { useEffect } from 'react';
import { useAdvertiserStore } from '@/store/advertiser';

export function useAdvertiser() {
  const { currentAdvertiser, setAdvertiser, clearAdvertiser } = useAdvertiserStore();
  
  useEffect(() => {
    // 如果还没有设置advertiser，尝试从localStorage读取
    if (!currentAdvertiser) {
      const storedId = localStorage.getItem('advertiser_id');
      const storedName = localStorage.getItem('advertiser_name');
      
      if (storedId) {
        setAdvertiser({
          id: storedId,
          name: storedName || '未命名账户',
        });
      } else {
        // 设置默认测试账户（用于Mock数据测试）
        setAdvertiser({
          id: '123456789',
          name: '测试账户',
        });
      }
    }
  }, [currentAdvertiser, setAdvertiser]);
  
  // 返回advertiser_id字符串，兼容现有代码
  const advertiserId = currentAdvertiser?.id || '123456789';
  
  // 设置advertiser_id的辅助函数
  const setAdvertiserId = (id: string, name?: string) => {
    setAdvertiser({
      id,
      name: name || '未命名账户',
    });
    // 同时保存到localStorage
    localStorage.setItem('advertiser_id', id);
    if (name) {
      localStorage.setItem('advertiser_name', name);
    }
  };
  
  return {
    advertiserId,
    advertiser: currentAdvertiser,
    setAdvertiserId,
    setAdvertiser,
    clearAdvertiser,
  };
}
