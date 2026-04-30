import React from 'react';
import TopNavBar from './TopNavBar';
import SideNavBar from './SideNavBar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <TopNavBar />
      <SideNavBar />
      <main className="ml-[280px] mt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageLayout;
