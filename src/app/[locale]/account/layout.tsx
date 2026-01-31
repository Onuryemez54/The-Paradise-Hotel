import { SidebarNavigation } from '@/components/account/SidebarNavigation';
import { PageContainer } from '@/components/common/PageContainer';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <PageContainer>
      <div className="flex h-full flex-col gap-4 sm:flex-row sm:gap-10">
        <SidebarNavigation />
        <div className="flex-1 py-1">{children}</div>
      </div>
    </PageContainer>
  );
};

export default Layout;
