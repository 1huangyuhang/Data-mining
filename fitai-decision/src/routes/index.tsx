import { RouteObject } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TrainingData from '../pages/TrainingData';
import Recommendations from '../pages/Recommendations';
import HistoryPage from '../pages/HistoryPage';
import TestPage from '../pages/TestPage';
import AuthGuard from '../components/auth/AuthGuard';

// 路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <TestPage />,
  },
  {
    path: '/dashboard',
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: '/training',
    element: (
      <AuthGuard>
        <TrainingData />
      </AuthGuard>
    ),
  },
  {
    path: '/recommendations',
    element: (
      <AuthGuard>
        <Recommendations />
      </AuthGuard>
    ),
  },
  {
    path: '/history',
    element: (
      <AuthGuard>
        <HistoryPage />
      </AuthGuard>
    ),
  },
];

export default routes;
