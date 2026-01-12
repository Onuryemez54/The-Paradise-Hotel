import { DesktopNavigation } from './DesktopNavigation';
import { MobileNavigation } from './MobileNavigation';

export const SidebarNavigation = () => {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
};
