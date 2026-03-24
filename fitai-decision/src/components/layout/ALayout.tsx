import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatPanel from '../chat/ChatPanel';

const ALayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // 监听窗口大小变化，自动关闭移动端菜单
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 路由过渡动画配置
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.3,
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* 移动端侧边栏 */}
      <div className="md:hidden">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{ width: '16rem', height: '100%', backgroundColor: '#ffffff' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Sidebar />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 桌面端侧边栏 */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <ChatPanel />
    </div>
  );
};

export default ALayout;
