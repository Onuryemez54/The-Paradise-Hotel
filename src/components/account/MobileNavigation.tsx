import { SidebarLinks } from './SidebarLinks';

export const MobileNavigation = () => {
  return (
    <nav className="border-border/50 overflow-x-auto border-b px-4 pb-4 sm:hidden">
      <SidebarLinks />
    </nav>
  );
};
