import React, { useEffect } from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  sidebar,
  sidebarOpen = false,
  onToggleSidebar
}) => {
  // 移动端打开侧边栏时禁止背景滚动
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className={`layout ${sidebarOpen ? 'layout--sidebar-open' : ''}`}>
      {/* 移动端顶部栏 */}
      {sidebar && (
        <header className="layout__mobile-topbar">
          <button
            className="layout__hamburger"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className={`layout__hamburger-line ${sidebarOpen ? 'layout__hamburger-line--open' : ''}`} />
            <span className={`layout__hamburger-line ${sidebarOpen ? 'layout__hamburger-line--open' : ''}`} />
            <span className={`layout__hamburger-line ${sidebarOpen ? 'layout__hamburger-line--open' : ''}`} />
          </button>
          <div className="layout__mobile-brand">
            <img src="/iCU_Icon.png" alt="iCU" className="layout__mobile-logo" />
            <span className="layout__mobile-brand-text">iCU</span>
          </div>
          {/* 占位，保持标题居中 */}
          <div style={{ width: 40 }} />
        </header>
      )}

      {/* 移动端遮罩 */}
      {sidebar && sidebarOpen && (
        <div className="layout__overlay" onClick={onToggleSidebar} />
      )}      {/* 侧边栏容器 */}
      {sidebar && (
        <div className="layout__sidebar">
          {sidebar}
        </div>
      )}

      {/* 桌面端：侧边栏关闭时显示的悬浮打开按钮 */}
      {sidebar && !sidebarOpen && (
        <button
          className="layout__desktop-open-btn"
          onClick={onToggleSidebar}
          aria-label="Open sidebar"
          title="打开侧边栏"
        >
          ☰
        </button>
      )}
      
      {/* 主内容区 */}
      <main className="layout__main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
