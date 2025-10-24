/**
 * 主题配置
 * 从静态页面 ad-platform.css 迁移而来的主题变量
 */

export const theme = {
  // 产品线颜色
  colors: {
    jlAd: '#1e6eff',
    qianchuan: '#ff6b00',
    douplus: '#00d4ff',
    
    // 主色调
    primary: '#1e6eff',
    primaryLight: '#4e7cff',
    primaryLighter: '#e6f2ff',
    primaryHover: '#0d5ce5',
    
    // 文字颜色
    textPrimary: '#1a1a1a',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textDisabled: '#cccccc',
    
    // 背景颜色
    bgPrimary: '#ffffff',
    bgSecondary: '#f5f6f7',
    bgTertiary: '#fafafa',
    bgHover: '#f5f8ff',
    
    // 边框颜色
    border: '#e5e6eb',
    borderLight: '#f0f0f0',
    borderDark: '#d9d9d9',
    
    // 状态颜色
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
    info: '#1890ff',
  },
  
  // 阴影
  shadows: {
    sm: '0 1px 4px 0 rgba(0,0,0,0.04)',
    md: '0 2px 8px 0 rgba(0,0,0,0.08)',
    lg: '0 4px 12px 0 rgba(0,0,0,0.12)',
  },
  
  // 圆角
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  
  // 间距
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  
  // 字体大小
  fontSize: {
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
  },
  
  // 过渡时间
  transition: {
    fast: '0.15s',
    base: '0.3s',
    slow: '0.5s',
  },
  
  // z-index
  zIndex: {
    dropdown: 1000,
    sticky: 999,
    modal: 1050,
    toast: 1100,
  },
} as const;

export type Theme = typeof theme;

/**
 * 根据产品ID获取产品颜色
 */
export function getProductColor(productId: 'jl-ad' | 'qianchuan' | 'douplus'): string {
  const colorMap = {
    'jl-ad': theme.colors.jlAd,
    'qianchuan': theme.colors.qianchuan,
    'douplus': theme.colors.douplus,
  };
  return colorMap[productId];
}

/**
 * 动画关键帧类名（对应 CSS @keyframes）
 */
export const animations = {
  fadeIn: 'animate-fade-in',
  fadeInDown: 'animate-fade-in-down',
  fadeInUp: 'animate-fade-in-up',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  scaleIn: 'animate-scale-in',
  pulse: 'animate-pulse',
  shake: 'animate-shake',
  spin: 'animate-spin',
} as const;
