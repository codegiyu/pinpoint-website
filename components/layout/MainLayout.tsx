import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from '@/lib/utils';
import { LoadAnimationScreen } from './LoadAnimationScreen';

interface MainLayoutProps {
  pageName?: string;
  className?: string;
  headerProps?: HeaderProps;
}

export const MainLayout = ({
  children,
  pageName = 'Loading...',
  className,
  headerProps,
}: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      <Header {...headerProps} />
      <main className={cn('min-h-screen', className)}>
        <LoadAnimationScreen name={pageName} />
        {children}
      </main>
    </>
  );
};
