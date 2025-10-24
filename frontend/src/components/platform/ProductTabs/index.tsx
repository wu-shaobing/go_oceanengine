/**
 * 产品选项卡组件
 * 切换巨量广告、千川、抖+ 三个产品线
 */

import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/store';
import { PRODUCTS, type ProductId } from '@/config/products';
import { getProductColor } from '@/config/theme';

export function ProductTabs() {
  const navigate = useNavigate();
  const { currentProduct, switchProduct } = useProductStore();

  const handleProductSwitch = (productId: ProductId) => {
    if (productId === currentProduct) return;
    
    // 切换产品
    switchProduct(productId);
    
    // 导航到该产品的默认页面（概览）
    const defaultPages: Record<ProductId, string> = {
      'jl-ad': '/ad/overview',
      'qianchuan': '/qc/overview',
      'douplus': '/dp/overview',
    };
    navigate(defaultPages[productId]);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4 lg:px-6">
        <div className="flex space-x-1">
          {(Object.keys(PRODUCTS) as ProductId[]).map((productId) => {
            const product = PRODUCTS[productId];
            const isActive = currentProduct === productId;
            const color = getProductColor(productId);

            return (
              <button
                key={productId}
                onClick={() => handleProductSwitch(productId)}
                className={`
                  relative px-6 py-3 text-sm font-medium transition-all
                  ${
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
                style={{
                  borderBottom: isActive ? `3px solid ${color}` : '3px solid transparent',
                }}
              >
                {product.name}
                {isActive && (
                  <div
                    className="absolute inset-x-0 bottom-0 h-0.5"
                    style={{ backgroundColor: color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
