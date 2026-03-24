/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ALayout from './components/layout/ALayout';
import routes from './routes/index';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<ALayout />}>
            {routes.map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
