import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import FitnessData from './components/FitnessData';
import FitnessCharts from './components/FitnessCharts';
import AddFitnessData from './components/AddFitnessData';

/**
 * 应用主组件
 * 管理应用状态和路由导航
 */
function App() {
  // 当前激活的页面 section
  const [activeSection, setActiveSection] = useState('dashboard');

  /**
   * 处理导航点击事件
   * @param {string} section - 目标页面 section
   */
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  /**
   * 根据当前激活的 section 渲染对应组件
   * @returns {JSX.Element} 渲染的组件
   */
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'data':
        return <FitnessData />;
      case 'charts':
        return <FitnessCharts />;
      case 'add-data':
        return <AddFitnessData />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-4">
        {/* 导航按钮 */}
        <div className="mb-4">
          <button
            className={`btn ${activeSection === 'dashboard' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => handleNavClick('dashboard')}
          >
            仪表盘
          </button>
          <button
            className={`btn ${activeSection === 'data' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => handleNavClick('data')}
          >
            健身数据
          </button>
          <button
            className={`btn ${activeSection === 'charts' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => handleNavClick('charts')}
          >
            数据图表
          </button>
          <button
            className={`btn ${activeSection === 'add-data' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleNavClick('add-data')}
          >
            添加数据
          </button>
        </div>

        {/* 内容区域 */}
        {renderSection()}
      </div>
    </div>
  );
}

export default App;
