'use client';

import { memo, useMemo, useState } from 'react';
import { GhostBtn } from '../atoms/GhostBtn';
import { PinpointFull } from '../icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { usePathname } from 'next/navigation';
import { FlipText } from '../general/ChangingModifier';
import PinpointContacts from '../general/PinpointContacts';
import type { ContactsGroupProps } from '@/components/general/PinpointContactsTypes';
import type { PinpointSocialApiItem } from '@/components/general/Socials';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NAV_LINK_PREFETCH } from '@/lib/constants/routing';
import { useHeaderContrast } from '@/lib/hooks/use-header-contrast';
import type { HeaderContrastConfig } from '@/lib/utils/header-contrast';

export type { HeaderContrastConfig };

export interface HeaderProps {
  headerContrast?: HeaderContrastConfig;
  contactInformation: ContactsGroupProps[];
  pinpointSocials: PinpointSocialApiItem[];
  navlinkGroups: NavLinkGroupProps[];
}

const logoTextSize = 'text-[1.125rem] md:text-[1.5rem] xl:text-[clamp(24px,_2.463vw,_32px)]';

export const Header = memo(
  ({ headerContrast, contactInformation, pinpointSocials, navlinkGroups }: HeaderProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [flipTextKey, setFlipTextKey] = useState(0);
    const pathname = usePathname();
    const sectionChrome = useHeaderContrast(headerContrast);
    const headerChrome = menuOpen ? 'white' : sectionChrome;

    const { allNavLinks } = useMemo(() => {
      const slugsArr = pathname.split('/');
      const firstSlug = '/' + slugsArr.slice(0, 2).join('/');

      const allNavLinks = navlinkGroups.map(group => ({
        ...group,
        links: group.links.map(item => ({
          ...item,
          href: item.href,
          isSelected:
            firstSlug === '/'
              ? false
              : item.href.startsWith('/services')
                ? pathname.startsWith(item.href)
                : item.href.startsWith(firstSlug),
        })),
      }));

      return { allNavLinks };
    }, [pathname, navlinkGroups]);

    const menuHandler = () => {
      setMenuOpen(prev => !prev);
    };

    return (
      <header id="header" className="header w-full">
        <div
          id="visible-header"
          data-header-chrome={headerChrome}
          className={cn(
            'fixed inset-x-0 top-0 z-[99] pointer-events-none transition-colors duration-300 ease-linear',
            headerChrome === 'white' ? 'text-white' : 'text-dark',
            menuOpen ? 'menu-open' : 'menu-closed'
          )}>
          <div
            className={cn(
              'wide-pinpoint-container relative py-6 md:py-8 pointer-events-auto',
              menuOpen && 'bg-dark'
            )}>
            <div className="header-chrome flex w-full items-center justify-between">
              <GhostBtn
                linkProps={{ href: '/', ...NAV_LINK_PREFETCH }}
                className="pointer-events-auto">
                <div className={cn('header-logo-mono w-fit', logoTextSize)}>
                  <PinpointFull layer="monochrome" className="pinpoint-logo" />
                </div>
              </GhostBtn>

              <GhostBtn
                className="group pointer-events-auto"
                onClick={menuHandler}
                onMouseEnter={() => setFlipTextKey(prev => prev + 1)}>
                <div className="menu-btn flex w-fit items-center gap-3">
                  <FlipText text="MENU" flipKey={flipTextKey} wrapClassName="typo-menu" />
                  <div className="grid w-fit gap-[4px]">
                    <div
                      className={`h-[2px] w-[1.25rem] bg-[currentColor] ${menuOpen ? 'w-[1.125rem] rotate-45 transform-origin-top-left' : ''} transition-transform duration-300 ease-linear`}
                    />
                    <div
                      className={`h-[2px] w-[1.25rem] bg-[currentColor] ${menuOpen ? 'opacity-0' : ''} transition-opacity duration-200 ease-linear`}
                    />
                    <div
                      className={`h-[2px] w-[1.25rem] bg-[currentColor] ${menuOpen ? 'w-[1.125rem] -rotate-45 transform-origin-bottom-left' : ''} transition-transform duration-300 ease-linear`}
                    />
                  </div>
                </div>
              </GhostBtn>
            </div>

            <div
              className={cn(
                'logo-accent-layer pointer-events-none absolute top-6 left-[5vw] md:top-8 md:left-[2.27vw]',
                logoTextSize
              )}
              aria-hidden>
              <PinpointFull layer="accent" className="pinpoint-logo h-full w-full" />
            </div>
          </div>
        </div>

        <Dialog open={menuOpen}>
          <DialogContent
            aria-describedby="header-dialog-title"
            className="h-full w-full max-w-full text-white">
            <VisuallyHidden asChild>
              <DialogTitle className="">Navigation Menu</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden asChild>
              <DialogDescription className="">
                View navigation menu and our contact links
              </DialogDescription>
            </VisuallyHidden>
            <div className="menu-container relative z-[51] grid gap-[6.75rem] lg:grid-cols-2">
              <div className="hidden h-full w-full place-items-center text-white/60 lg:grid">
                {menuOpen && (
                  <PinpointContacts
                    fullWidth
                    inDarkBg
                    noTransitionDelay
                    contactInformation={contactInformation}
                    pinpointSocials={pinpointSocials}
                  />
                )}
              </div>
              <div className="relative z-[52] flex h-full w-full items-center lg:pr-[5.27vw]">
                <div className="grid w-full gap-0">
                  <nav className="relative z-[55] grid w-full">
                    {allNavLinks.map((item, idx) => (
                      <NavLinkGroup key={idx} {...item} isLast={idx === allNavLinks.length - 1} />
                    ))}
                  </nav>
                  <div className="mt-14 flex lg:absolute lg:bottom-20 lg:left-0 lg:mt-0">
                    <GhostBtn linkProps={{ href: '/privacy-policy', ...NAV_LINK_PREFETCH }}>
                      <span className="typo-caption-small uppercase text-white/70 opacity-100 hover:text-white">
                        Privacy Policy
                      </span>
                    </GhostBtn>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>
    );
  }
);

Header.displayName = 'Header';

export interface LangChangeLinkProps {
  lang: string;
  href: string;
  isSelected?: boolean;
  isLast?: boolean;
}

export const LangChangeLink = ({ lang, isSelected, isLast }: LangChangeLinkProps) => {
  return (
    <li className="">
      <GhostBtn
        linkProps={{ href: '#', ...NAV_LINK_PREFETCH }}
        className={`pointer-events-auto text-[9px] leading-[1.125rem] font-black
        ${isSelected ? 'text-white' : 'text-white/60 hover:text-white'}
        ${isLast ? '' : 'border-r border-white/40'}`}>
        <span className="uppercase px-[0.6875rem]">{lang}</span>
      </GhostBtn>
    </li>
  );
};

export interface NavLinkGroupProps {
  name?: string;
  links: NavLinkProps[];
  isLast?: boolean;
}

export interface NavLinkProps {
  text: string;
  href: string;
  img: string;
  imgClass: string;
  isSelected?: boolean;
}

const NavLinkGroup = ({ name, links, isLast }: NavLinkGroupProps) => {
  return (
    <div
      className={`grid w-full items-stretch lg:grid-cols-[1fr_60px] ${isLast ? '' : 'border-b border-white/40'}`}>
      <ul className="grid w-full py-6">
        {links.map((item, idx) => (
          <NavLink key={idx} {...item} />
        ))}
      </ul>
      <div className="relative hidden h-full w-full lg:block">
        {name && (
          <p className="absolute -right-6 top-1/2 -translate-y-1/2 -rotate-90 transform-origin-center text-[0.6875rem] font-light uppercase leading-[1.2] tracking-[0.3em] text-white/75 xl:text-[clamp(0.6875rem,_3.582vw,_0.875rem)]">
            {name}
          </p>
        )}
      </div>
    </div>
  );
};

const NavLink = ({ text, href, isSelected, img, imgClass }: NavLinkProps) => {
  return (
    <li className="group">
      <GhostBtn
        linkProps={{ href, ...NAV_LINK_PREFETCH }}
        className={`justify-start py-[5px] text-[1rem] font-bold leading-[1] md:text-[1.3125rem] xl:text-[1.5rem]
        ${isSelected ? 'text-white' : 'text-white/60 hover:text-white'} relative`}
        wrapClassName="group peer relative z-[56]">
        <span className="">{text}</span>
        {isSelected && (
          <div className="absolute top-1/2 right-full hidden h-fit w-fit -translate-y-1/2 items-center gap-4 lg:flex">
            <div className="h-[2px] w-10 bg-current 2xl:w-16" />
            <span></span>
          </div>
        )}
      </GhostBtn>
      {!isSelected && (
        <div
          className={cn(
            'absolute top-[-25px] left-0 hidden h-[calc(100%_+_50px)] -translate-x-1/2\
            aspect-[0.7] scale-80 opacity-0\
            peer-hover:opacity-100 z-[51]\
            peer-hover:scale-100 transition-all duration-1000 ease-in-out lg:block',
            imgClass
          )}>
          <div className="relative z-[51] h-full w-full">
            <Image
              src={img}
              alt=""
              className={cn('z-[51] h-full w-full object-cover opacity-99')}
              sizes=""
              fill
            />
          </div>
        </div>
      )}
    </li>
  );
};
