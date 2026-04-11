import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import './NavDrawer.css';

const NAV_ITEMS = [
  { label: 'discussion', to: '/' },
  { label: 'history',    to: '/conversations' },
  { label: 'prepare',    to: '/prepare' },
  { label: 'chat',       to: '/chat' },
] as const;

export default function NavDrawer() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close whenever the route changes
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="nd-trigger" aria-label="Open navigation">
          <span className="nd-line" />
          <span className="nd-line" />
          <span className="nd-line" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="nd-content">
        <div className="nd-brand-row">
          <span className="nd-brand">FITON</span>
        </div>

        <nav className="nd-nav">
          <ul className="nd-list">
            {NAV_ITEMS.map(({ label, to }) => {
              const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
              return (
                <li key={to}>
                  <NavLink to={to} className={`nd-link${active ? ' nd-link--active' : ''}`}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
