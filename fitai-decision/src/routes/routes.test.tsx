import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import ALayout from '../components/layout/ALayout';
import Dashboard from '../pages/Dashboard';
import TrainingData from '../pages/TrainingData';
import Recommendations from '../pages/Recommendations';
import HistoryPage from '../pages/HistoryPage';

// 测试路由配置
const TestRoutes = () => (
  <AppProvider>
    <MemoryRouter>
      <Routes>
        <Route element={<ALayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/training" element={<TrainingData />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </AppProvider>
);

describe('路由测试', () => {
  test('默认路由应该渲染Dashboard组件', () => {
    render(<TestRoutes />);
    // 检查Dashboard页面的内容
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('侧边栏导航链接应该正确工作', () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route element={<ALayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/training" element={<TrainingData />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </AppProvider>
    );

    // 点击Training Data链接
    const trainingLink = screen.getByText('Training Data');
    fireEvent.click(trainingLink);

    // 检查是否导航到了Training Data页面
    expect(screen.getByText('Training Records')).toBeInTheDocument();
  });

  test('ALayout布局应该正确渲染', () => {
    render(<TestRoutes />);

    // 检查布局组件是否存在
    expect(screen.getByText('FitAI')).toBeInTheDocument(); // 侧边栏标题
    expect(
      screen.getByPlaceholderText('Search records, advice, or reports...')
    ).toBeInTheDocument(); // 搜索框
  });
});
