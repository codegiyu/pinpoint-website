import { PropsWithChildren } from 'react';
import { Header, HeaderProps } from './Header';
import { cn } from '@/lib/utils';
import Footer from './Footer';
import { getGlobalConfig, listServices } from '@/lib/api/pinpoint-public';
import { buildNavlinks } from '@/lib/constants/routing';

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
  const [{ content }, { services }] = await Promise.all([getGlobalConfig(), listServices()]);

  return (
    <>
      <Header
        navlinkGroups={buildNavlinks(services)}
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
