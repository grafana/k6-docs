import { Footer } from 'components/blocks/footer';
import {
  Header,
  HeaderNav,
  HeaderLogo,
  Burger,
} from 'components/blocks/header';
import { MobileNav } from 'components/blocks/mobile-nav';
import { Button } from 'components/shared/button';
import CookieConsent from 'components/shared/cookie-consent';
import HelperWidget from 'components/shared/helper-widget';
import { SEO } from 'components/shared/seo';
import React from 'react';
import {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} from 'react-cookie-banner';
import { app, main, blog, docs } from 'utils/urls';

import styles from './default-layout.module.scss';

const cookies = new Cookies({ 'user-has-accepted-cookies': true });

export const DefaultLayout = ({ pageMetadata, children }) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = React.useState(false);

  React.useEffect(() => {
    if (isMobileNavVisible) {
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.querySelector('html').style.overflow = '';
    }
  }, [isMobileNavVisible]);

  const links = [
    { label: 'Cloud', to: `${main}/cloud` },
    { label: 'Open Source', to: `${main}/open-source` },
    { label: 'Documentation', to: `${docs}` },
    { label: 'Pricing', to: `${main}/pricing` },
    {
      label: 'About',
      submenu: [
        { label: 'Our Story', to: `${main}/about` },
        { label: 'Our Beliefs', to: `${main}/our-beliefs` },
        { label: 'Blog', to: `${blog}` },
        { label: 'Contact Us', to: `${main}/contact` },
        { label: 'Jobs', to: `${main}/jobs` },
      ],
    },
  ];

  return (
    <>
      <SEO {...pageMetadata} />
      <Header>
        <div className={'col-xl-3 col-lg-2 col-3'}>
          <HeaderLogo />
        </div>
        <div className={'col-xl-6 col-lg-7 d-lg-block d-none'}>
          <HeaderNav links={links} />
        </div>
        <div className={'col-lg-3 d-lg-flex justify-content-lg-end d-none'}>
          <div className={styles.buttonsWrapper}>
            <Button
              tag={'a'}
              href={`${app}/account/login`}
              className={styles.button}
              size={'sm'}
              theme={'transparent'}
            >
              Login
            </Button>
            <Button
              tag={'a'}
              href={`${app}/account/register`}
              className={styles.button}
              size={'sm'}
              theme={'additional'}
            >
              Sign up
            </Button>
          </div>
        </div>
        <div className={'d-lg-none col-9 d-flex justify-content-end'}>
          <Burger onClick={() => setIsMobileNavVisible(true)} />
        </div>
      </Header>

      {children}

      <MobileNav
        links={links.reduce(
          (acc, cur) =>
            cur.submenu ? acc.concat([...cur.submenu]) : acc.concat(cur),
          [],
        )}
        isVisible={isMobileNavVisible}
        onCloseButtonClick={() => setIsMobileNavVisible(false)}
      />
      <Footer />
      <CookiesProvider cookies={cookies}>
        <CookieBannerUniversal
          dismissOnScroll={false}
          dismissOnClick={false}
          disableStyle
          cookie={'user-has-accepted-cookies'}
        >
          {(onAccept) => <CookieConsent onAccept={onAccept} />}
        </CookieBannerUniversal>
      </CookiesProvider>
      <HelperWidget />
    </>
  );
};
