import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from '@/lib/utils';
import { LoadAnimationScreen } from './LoadAnimationScreen';
import Footer from './Footer';

interface MainLayoutProps {
  pageName?: string;
  className?: string;
  headerProps?: HeaderProps;
  hideFooter?: boolean;
}

export const MainLayout = ({
  children,
  pageName = 'Loading...',
  className,
  headerProps,
  hideFooter = false,
}: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      <Header {...headerProps} />
      <main className={cn('min-h-screen', className)}>
        <LoadAnimationScreen name={pageName} />
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  );
};
