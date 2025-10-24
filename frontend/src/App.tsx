import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { ConfigProvider, App as AntApp, Spin } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import { PlatformLayout } from './components/platform';
import { allRoutes, defaultRoute } from './config/routes';

// 创建 Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30秒
    },
  },
});

// 加载中组件
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" tip="加载中..." />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={theme} locale={zhCN}>
        <AntApp>
          <BrowserRouter>
            <Routes>
              {/* 默认路由重定向 */}
              <Route path="/" element={<Navigate to={defaultRoute} replace />} />
              
              {/* 平台主布局 */}
              <Route element={<PlatformLayout />}>
                {/* 动态路由 - 懒加载所有页面 */}
                {allRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Suspense fallback={<LoadingFallback />}>
                        <route.component />
                      </Suspense>
                    }
                  />
                ))}
              </Route>
              
              {/* 404 页面 */}
              <Route path="*" element={<Navigate to={defaultRoute} replace />} />
            </Routes>
          </BrowserRouter>
        </AntApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
