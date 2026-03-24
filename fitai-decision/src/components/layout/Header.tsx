/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Search, Moon, Sun, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // 模拟用户数据
  const profile = {
    name: 'Alex',
    goal: 'lose_weight'
  };

  const handleThemeToggle = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <header style={{ height: '4rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', transition: 'all 0.2s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
        {/* 移动端菜单按钮 */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            style={{
              display: 'block',
              padding: '0.5rem',
              color: '#6b7280',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0.75rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Menu size={20} />
          </button>
        )}
        <div style={{ position: 'relative', width: '100%', maxWidth: '28rem' }}>
          <Search
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
            size={18}
          />
          <input
            type="text"
            placeholder="Search records, advice, or reports..."
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.5rem',
              backgroundColor: '#f9fafb',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px rgba(37, 99, 235, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleThemeToggle}
          style={{
            padding: '0.5rem',
            color: '#6b7280',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0.75rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button 
          style={{
            padding: '0.5rem',
            color: '#6b7280',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '0.75rem',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', width: '0.5rem', height: '0.5rem', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #ffffff' }}></span>
        </button>
        <div style={{ height: '2rem', width: '1px', backgroundColor: '#e5e7eb', margin: '0 0.5rem' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.5rem' }}>
          <div style={{ textAlign: 'right', display: 'none' }} className="sm:block">
            <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: 0 }}>
              {profile.name}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem', margin: 0 }}>
              {profile.goal.replace('_', ' ')}
            </p>
          </div>
          <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f3f4f6', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', border: '1px solid #e5e7eb' }}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
