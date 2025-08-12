'use client';

import { memo, useMemo, useState } from 'react';
import { GhostBtn } from '../atoms/GhostBtn';
import { PinpointFull } from '../icons';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { usePathname } from 'next/navigation';
import { navlinks } from '@/lib/constants/routing';
import { FlipText } from '../general/ChangingModifier';
import PinpointContacts from '../general/PinpointContacts';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  whiteTextStart?: boolean;
}

export const Header = memo(({ whiteTextStart }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flipTextKey, setFlipTextKey] = useState(0);
  const pathname = usePathname();

  const { allNavLinks } = useMemo(() => {
    const slugsArr = pathname.split('/');
    const firstSlug = '/' + slugsArr.slice(0, 2).join('');
    // const selectedLangOption = langChangeOptions.find(item => item.href === firstSlug);
    // const selectedLang = selectedLangOption?.lang ?? 'en';

    // const restOfPath = pathname.slice((selectedLangOption?.href ?? '/').length);

    const allNavLinks = navlinks.map(group => ({
      ...group,
      links: group.links.map(item => ({
        ...item,
        // href: `${selectedLang === 'en' ? '' : selectedLang}${item.href}`,
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
  }, [pathname]);

  const menuHandler = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header id="header" className={`header w-full text-white`}>
      <div
        id="visible-header"
        className={`h-fit wide-pinpoint-container fixed inset-0 
        ${
          menuOpen || whiteTextStart ? 'blend-normal' : 'blend-difference'
        } ${menuOpen ? 'menu-open' : 'menu-closed'}
        flex items-center justify-between py-6 md:py-8 z-[99]`}>
        <GhostBtn linkProps={{ href: '/' }} className="pointer-events-auto">
          <div className="w-fit flex items-center text-[1.125rem] md:text-[1.5rem] xl:text-[clamp(24px,_2.463vw,_32px)]">
            <PinpointFull className="pinpoint-logo" />
          </div>
        </GhostBtn>

        <GhostBtn
          className="group pointer-events-auto"
          onClick={menuHandler}
          onMouseEnter={() => setFlipTextKey(prev => prev + 1)}>
          <div className="menu-btn w-fit flex items-center gap-3">
            <FlipText text="MENU" flipKey={flipTextKey} wrapClassName="typo-menu" />
            <div className="w-fit grid gap-[4px]">
              <div
                className={`w-[1.25rem] h-[2px] bg-[currentColor] ${menuOpen ? 'transform-origin-top-left w-[1.125rem] rotate-45' : ''} transition-transform duration-300 ease-linear`}
              />
              <div
                className={`w-[1.25rem] h-[2px] bg-[currentColor] ${menuOpen ? 'opacity-0' : ''} transition-opacity duration-200 ease-linear`}
              />
              <div
                className={`w-[1.25rem] h-[2px] bg-[currentColor] ${menuOpen ? 'transform-origin-bottom-left w-[1.125rem] -rotate-45' : ''} transition-transform duration-300 ease-linear`}
              />
            </div>
          </div>
        </GhostBtn>
      </div>

      <Dialog open={menuOpen}>
        <DialogContent
          aria-describedby="header-dialog-title"
          className="w-full max-w-full h-full text-white/25">
          <VisuallyHidden asChild>
            <DialogTitle className="">Navigation Menu</DialogTitle>
          </VisuallyHidden>
          <VisuallyHidden asChild>
            <DialogDescription className="">
              View navigation menu and our contact links
            </DialogDescription>
          </VisuallyHidden>
          <div className="menu-container grid lg:grid-cols-2 gap-[6.75rem] relative z-[51]">
            <div className="w-full h-full hidden lg:grid place-items-center text-white/35">
              {menuOpen && <PinpointContacts fullWidth inDarkBg noTransitionDelay />}
            </div>
            <div className="w-full h-full flex items-center lg:pr-[5.27vw] relative z-[52]">
              <div className="w-full grid gap-0">
                {/* <nav className="h-[3.75rem] flex items-center lg:absolute lg:top-5 left-0">
                  <ul className="flex">
                    {langChangeOptions.map((item, idx) => (
                      <LangChangeLink
                        key={idx}
                        {...item}
                        isSelected={item.lang === selectedLang}
                        isLast={idx === langChangeOptions.length - 1}
                      />
                    ))}
                  </ul>
                </nav> */}
                <nav className="w-full grid relative z-[55]">
                  {allNavLinks.map((item, idx) => (
                    <NavLinkGroup key={idx} {...item} isLast={idx === allNavLinks.length - 1} />
                  ))}
                </nav>
                <div className="flex lg:absolute lg:bottom-20 left-0 mt-14 lg:mt-0">
                  <GhostBtn linkProps={{ href: '/privacy-policy' }}>
                    <span className="typo-caption-small uppercase text-white/50 hover:text-white">
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
});
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
        linkProps={{ href: '#', hrefLang: lang }}
        className={`text-[9px] leading-[1.125rem] font-black pointer-events-auto
        ${isSelected ? 'text-white' : 'text-white/25 hover:text-white'}
        ${isLast ? '' : 'border-r border-white/25'}`}>
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
      className={`w-full grid lg:grid-cols-[1fr_60px] items-stretch ${isLast ? '' : 'border-b border-white/25'}`}>
      <ul className={`w-full grid py-6`}>
        {links.map((item, idx) => (
          <NavLink key={idx} {...item} />
        ))}
      </ul>
      <div className="hidden lg:block w-full h-full relative">
        {name && (
          <p className="absolute -right-6 top-1/2 -translate-y-1/2 -rotate-90 transform-origin-center text-[0.6875rem] xl:text-[clamp(0.6875rem,_3.582vw,_0.875rem)] leading-[1.2] tracking-[0.3em] text-white/65 font-light uppercase">
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
        linkProps={{ href }}
        className={`justify-start text-[1rem] md:text-[1.3125rem] xl:text-[1.5rem] leading-[1] font-bold xl:font-medium py-[5px]
        ${isSelected ? 'text-white' : 'text-white/25 hover:text-white'} relative`}
        wrapClassName="group peer relative z-[56]">
        <span className="">{text}</span>
        {isSelected && (
          <div className="w-fit h-fit hidden lg:flex items-center gap-4 absolute top-1/2 right-full -translate-y-1/2">
            <div className="w-10 2xl:w-16 h-[2px] bg-current" />
            <span></span>
          </div>
        )}
      </GhostBtn>
      {!isSelected && (
        <div
          className={cn(
            'hidden lg:block absolute top-[-25px] left-0 -translate-x-1/2\
            h-[calc(100%_+_50px)] aspect-[0.7] opacity-0 scale-80\
            peer-hover:opacity-100 z-[51]\
            peer-hover:scale-100 transition-all duration-1000 ease-in-out',
            imgClass
          )}>
          <div className="w-full h-full relative z-[51]">
            <Image
              src={img}
              alt=""
              className={cn('w-full h-full object-cover opacity-95 z-[51]')}
              sizes=""
              fill
            />
          </div>
        </div>
      )}
    </li>
  );
};
