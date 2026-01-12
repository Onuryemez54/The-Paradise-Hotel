import { SidebarNavigation } from '@/components/account/SidebarNavigation';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full flex-col gap-4 sm:flex-row sm:gap-10">
      <SidebarNavigation />
      <div className="flex-1 py-1">{children}</div>
    </div>
  );
};

export default Layout;
