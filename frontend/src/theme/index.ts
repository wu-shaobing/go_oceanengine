import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    // 主色
    colorPrimary: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    
    // 字号
    fontSize: 14,
    fontSizeHeading1: 24,
    fontSizeHeading2: 20,
    fontSizeHeading3: 16,
    
    // 圆角
    borderRadius: 4,
    
    // 间距
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,
  },
  components: {
    Layout: {
      siderBg: '#001529',
      headerBg: '#ffffff',
      headerPadding: '0 24px',
      bodyBg: '#f0f2f5',
    },
    Menu: {
      darkItemBg: '#001529',
      darkItemSelectedBg: '#1677ff',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      rowHoverBg: '#f5f5f5',
    },
    Card: {
      headerBg: 'transparent',
      boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
    },
  },
};
