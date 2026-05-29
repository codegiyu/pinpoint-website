import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import { getSiteShellData } from '@/lib/site-shell';

interface MainLayoutProps {
  pageName?: string;
  className?: string;
  headerProps?: Omit<HeaderProps, 'contactInformation' | 'pinpointSocials' | 'navlinkGroups'>;
  hideFooter?: boolean;
}

export const MainLayout = async ({
  children,
  pageName = 'Loading...',
  className,
  headerProps,
  hideFooter = false,
}: PropsWithChildren<MainLayoutProps>) => {
  void pageName;
  const { content, navlinkGroups } = await getSiteShellData();

  return (
    <>
      <Header
        navlinkGroups={navlinkGroups}
        contactInformation={content.contactInformation}
        pinpointSocials={content.pinpointSocials}
        {...headerProps}
      />
      <main className={cn('min-h-screen', className)}>{children}</main>
      {!hideFooter && (
        <Footer
          contactInformation={content.contactInformation}
          quicklinks={content.quicklinks}
          pinpointSocials={content.pinpointSocials}
          footerCompanyDescription={content.footerCompanyDescription}
        />
      )}
    </>
  );
};
