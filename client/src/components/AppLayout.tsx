import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';
import './AppLayout.css';

const NAV_ITEMS = [
  { label: 'discussion', to: '/' },
  { label: 'history',    to: '/conversations' },
  { label: 'prepare',    to: '/prepare' },
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { open, close } = useSidebar();
  const location = useLocation();

  // Close when navigating
  useEffect(() => { close(); }, [location.pathname]);

  return (
    <div className="al-shell">
      {/* ── Sidebar ── */}
      <nav className={`al-nav${open ? ' al-nav--open' : ''}`} aria-hidden={!open}>
        <div className="al-nav-brand">FITON</div>
        <ul className="al-nav-list">
          {NAV_ITEMS.map(({ label, to }) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
            return (
              <li key={to}>
                <NavLink to={to} className={`al-nav-link${active ? ' al-nav-link--active' : ''}`}>
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Main content ── */}
      <div className="al-main">
        {children}
      </div>
    </div>
  );
}
