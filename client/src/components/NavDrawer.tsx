import { useSidebar } from '../context/SidebarContext';
import './NavDrawer.css';

export default function NavDrawer() {
  const { toggle } = useSidebar();
  return (
    <button className="nd-trigger" onClick={toggle} aria-label="Toggle navigation">
      <span className="nd-line" />
      <span className="nd-line" />
      <span className="nd-line" />
    </button>
  );
}
