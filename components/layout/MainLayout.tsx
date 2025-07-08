import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';

interface MainLayoutProps {
  headerProps?: HeaderProps;
}

export const MainLayout = ({ children, headerProps }: PropsWithChildren<MainLayoutProps>) => {
  return (
    <>
      <Header {...headerProps} />
      {children}
    </>
  );
};
