import { SidebarLinks } from './SidebarLinks';

export const DesktopNavigation = () => {
  return (
    <nav className="border-border/50 hidden border-r pr-2 sm:block md:pr-6">
      <SidebarLinks />
    </nav>
  );
};
