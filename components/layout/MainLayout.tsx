import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  className?: string;
  headerProps?: HeaderProps;
}

export const MainLayout = ({
  children,
  className,
  headerProps,
}: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      <Header {...headerProps} />
      <main className={cn('min-h-screen', className)}>{children}</main>
    </>
  );
};
