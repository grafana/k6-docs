import classNames from 'classnames';
import { Footer } from 'components/blocks/footer';
import {
  Header,
  HeaderNav,
  HeaderLogo,
  Burger,
} from 'components/blocks/header';
import { MobileNav } from 'components/blocks/mobile-nav';
import CookieConsent from 'components/shared/cookie-consent';
import { Heading } from 'components/shared/heading';
import HelperWidget from 'components/shared/helper-widget';
import { LanguageSwitcher } from 'components/shared/language-switcher';
import { SearchBox } from 'components/shared/search-box';
import { SidebarSectionDropdown } from 'components/shared/sidebar-section-dropdown';
import { VersionBanner } from 'components/shared/version-banner';
import { VersionSwitcher } from 'components/shared/version-switcher';
import { useLocale } from 'contexts/locale-provider';
import { Link, navigate, withPrefix } from 'gatsby';
import { I18N_CONFIG } from 'i18n/i18n-config';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} from 'react-cookie-banner';
import { childrenToList, isInIFrame } from 'utils';
import AlgoliaQueries from 'utils/algolia';
import { main } from 'utils/urls';

import styles from './doc-layout.module.scss';
import ArrowLeft from './svg/arrow-left.inline.svg';

const { indexName } = AlgoliaQueries[0];

// local helper data
//
// algolia indices
const searchIndices = [
  { name: indexName, title: 'Doc Pages', hitComp: 'docPageHit' },
];

const cookies = new Cookies({ 'user-has-accepted-cookies': true });

/*
 * Local Helper Components
 */

// renders options from the passed children array, recursively
const OptionsGroup = ({ node: { name, meta, children }, nested }) => {
  const hasSubMenu = Object.keys(children).length;
  return (
    <>
      <option
        label={`${Array(nested).fill('-').join('')}${nested ? ' ' : ''}${
          meta.title || name
        }`}
        value={meta.redirect || meta.path}
      >
        {meta.title || name}
      </option>
      {hasSubMenu && (
        <>
          {childrenToList(children).map((node) => (
            <OptionsGroup node={node} key={node.name} nested={nested + 1} />
          ))}
        </>
      )}
    </>
  );
};

const MobileNavMenu = ({ sidebarTree, path }) => (
  <select
    onChange={({ target }) => {
      const val = target.value;
      if (!val) return;
      const isExternalLink = val.startsWith('http');
      if (isExternalLink) {
        window.location.assign(val);
      } else {
        navigate(val);
      }
    }}
    className={styles.dropdown}
    value={path}
  >
    <option disabled value={false}>
      Choose a section
    </option>
    {sidebarTree &&
      childrenToList(sidebarTree.children).map((sectionNode) => (
        <optgroup
          label={sectionNode.name}
          key={`docSection-${sectionNode.name}`}
        >
          {childrenToList(sectionNode.children).map((node) => (
            <OptionsGroup node={node} key={node.name} nested={0} />
          ))}
        </optgroup>
      ))}
  </select>
);

// renders sidebar nodes from passed children prop, recursively
const SidebarNode = (props) => {
  const {
    node: { name, meta, children },
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const search = typeof window === 'undefined' ? '' : window.location.search;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const maybePrefixedPath = withPrefix(meta.path);
    const pathname = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : `${window.location.pathname}/`;

    let doesPathMatchLocation = maybePrefixedPath === pathname;

    const isPathLocationPart =
      meta.path === '/' ||
      meta.path === '/es/' ||
      meta.path === '/extensions/' ||
      meta.path === '/javascript-api/xk6-disruptor/'
        ? false
        : pathname.startsWith(maybePrefixedPath);

    // handle extensions category filters
    let doesMatchExtensionsCategory = false;
    if (meta.path.startsWith('/extensions/')) {
      if (search) {
        if (pathname + search === maybePrefixedPath) {
          doesMatchExtensionsCategory = true;
        }

        // if category is selected then "All" is not active
        if (meta.path === '/extensions/' && meta.title !== 'Discovery') {
          doesPathMatchLocation = false;
        }
      }
    }

    setIsActive(
      doesPathMatchLocation ||
        isPathLocationPart ||
        doesMatchExtensionsCategory,
    );
    setIsOpen(
      doesPathMatchLocation ||
        isPathLocationPart ||
        doesMatchExtensionsCategory,
    );
  }, [search]);

  const hasSubMenu = Object.keys(children).length;

  const internalLinkClickHandler = (event) => {
    event.preventDefault();

    if (event.target.type === 'button') return setIsOpen((prev) => !prev);

    navigate(meta.path);

    return false;
  };

  const nodes = {
    externalLink: () => (
      <a
        className={styles.sidebarNodeTitle}
        href={meta.redirect}
        target={'_self'}
      >
        {meta.title}
      </a>
    ),
    internalLink: () => (
      <Link
        className={`${styles.sidebarNodeTitle} ${
          isActive ? styles.active : ''
        }`}
        to={meta.path}
        onClick={internalLinkClickHandler}
      >
        {meta.title}
      </Link>
    ),
    text: () => (
      <Heading className={styles.sidebarNodeTitle} tag={'h3'} size={'sm'}>
        {name}
      </Heading>
    ),
  };

  const nodeType = () => {
    if (meta.redirect) {
      return 'externalLink';
    }
    if (meta.isActiveSidebarLink) {
      return 'internalLink';
    }
    return 'text';
  };

  return !meta.hideFromSidebar ? (
    <div
      className={classNames(
        styles.sidebarNode,
        hasSubMenu && styles.sidebarNodeWithChildren,
      )}
    >
      {nodes[nodeType()]()}
      {hasSubMenu > 0 && (
        <button
          className={classNames(
            styles.sidebarButton,
            isActive && styles.sidebarButtonActive,
            isOpen && styles.sidebarButtonOpen,
          )}
          type="button"
          aria-label={isOpen ? 'Collapse the menu' : 'Open the menu'}
          onClick={internalLinkClickHandler}
        >
          <ArrowLeft />
        </button>
      )}
      {!!Object.keys(children).length && isActive && isOpen && (
        <div className={styles.sidebarNodeChildren}>
          {childrenToList(children).map((node) => (
            <SidebarNode node={node} key={node.name} />
          ))}
        </div>
      )}
    </div>
  ) : null;
};

/*
 * Main Component
 */

export const DocLayout = ({
  pageTranslations = null,
  version,
  sidebarTree,
  navLinks: links,
  children,
  canonicalUrl,
  pageVersions = {},
  sectionName = null,
  path,
}) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const { locale, urlLocale, setLocale } = useLocale();
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isMobileNavVisible) {
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.querySelector('html').style.overflow = '';
    }
  }, [isMobileNavVisible]);

  useEffect(() => setShowFooter(!isInIFrame()), []);

  const languageChangeHandler = (lang) => {
    setLocale(lang);
    if (
      urlLocale &&
      lang !== urlLocale &&
      pageTranslations &&
      pageTranslations[lang]
    ) {
      navigate(pageTranslations[lang].path);
    }
  };

  const location = typeof window !== 'undefined' ? window.pathname : '';

  // if user opens a page in a different language from what was chosen, save new language
  useEffect(() => {
    if (locale && locale !== urlLocale) {
      setLocale(urlLocale);
    }
  }, [location]);

  useLayoutEffect(() => {
    const handleSidebarScroll = (e) => {
      localStorage.setItem('sidebar-scroll', e.target.scrollTop);
    };

    sidebarRef.current?.addEventListener('scroll', handleSidebarScroll);

    return () =>
      sidebarRef.current?.removeEventListener('scroll', handleSidebarScroll);
  }, []);

  useLayoutEffect(() => {
    const sidebarScrollValue = localStorage.getItem('sidebar-scroll');

    if (sidebarRef && sidebarRef.current && sidebarScrollValue) {
      setTimeout(() => {
        if (sidebarRef && sidebarRef.current && sidebarScrollValue) {
          sidebarRef.current.scrollTop = parseInt(sidebarScrollValue, 10);
        }
      }, 0);
    }
  }, [sidebarRef]);

  const showLanguageToggle =
    !I18N_CONFIG.hideLanguageToggle &&
    !!pageTranslations &&
    pageTranslations.en &&
    pageTranslations.es;

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <div ref={sidebarRef} className={classNames(styles.sidebarList)}>
          <div className={styles.sidebarHeader}>
            <HeaderLogo theme={'doc'} />
          </div>
          {sidebarTree && <SidebarSectionDropdown links={links} />}
          {sidebarTree &&
            childrenToList(sidebarTree.children).map((sectionNode) =>
              sectionNode.meta.hideFromSidebar ? null : (
                <div className={styles.sidebarSection} key={sectionNode.name}>
                  {sectionNode.meta.title !== sectionName &&
                  sectionNode.meta.isActiveSidebarLink ? (
                    <Heading
                      className={styles.sidebarSectionTitle}
                      size={'sm'}
                      tag={'h2'}
                    >
                      <Link
                        className={
                          sectionName === 'Guides'
                            ? styles.sidebarSectionInvisibleLink
                            : styles.sidebarSectionTitleLink
                        }
                        to={sectionNode.meta.path}
                      >
                        {sectionNode.meta.title || sectionNode.name}
                      </Link>
                    </Heading>
                  ) : (
                    <Heading
                      className={styles.sidebarSectionTitle}
                      size={'sm'}
                      tag={'h2'}
                    >
                      {sectionNode.meta.title || sectionNode.name}
                    </Heading>
                  )}
                  {childrenToList(sectionNode.children).length > 0 && (
                    <div className={styles.sidebarNodeChildren}>
                      {childrenToList(sectionNode.children).map((node) => (
                        <SidebarNode node={node} key={node.name} />
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
        </div>
        <div
          className={classNames(styles.sidebarSection, styles.sidebarFooter)}
        >
          <a className={'link'} href={`${main}`}>
            k6.io
          </a>
          <a
            className={'link'}
            href={'https://grafana.com/docs/grafana-cloud/testing/k6/'}
          >
            Grafana Cloud k6
          </a>
        </div>
      </div>
      <main className={styles.main}>
        <Header>
          <div
            className={`col-xxl-8 col-12 d-md-flex align-items-center d-none ${styles.headerNav}`}
          >
            <HeaderNav links={links} />
            <div className={styles.controls}>
              {!!version && (
                <VersionSwitcher
                  currentVersion={version}
                  versions={pageVersions}
                />
              )}
              {showLanguageToggle && (
                <LanguageSwitcher onLanguageChange={languageChangeHandler} />
              )}
            </div>
          </div>
          <div className={'d-md-none col-12 d-flex justify-content-between'}>
            {showLanguageToggle && (
              <LanguageSwitcher onLanguageChange={languageChangeHandler} />
            )}
            {!!version && (
              <VersionSwitcher
                currentVersion={version}
                versions={pageVersions}
              />
            )}
            <Burger onClick={() => setIsMobileNavVisible(true)} />
          </div>
          <div className={`col-xxl-4 col-12 ${styles.searchBox}`}>
            <SearchBox collapse indices={searchIndices} />
          </div>
          <div className={'d-md-none col-12'}>
            <div className={styles.dropdownWrapper}>
              <MobileNavMenu sidebarTree={sidebarTree} path={path} />
            </div>
          </div>
        </Header>
        <VersionBanner
          canonicalUrl={canonicalUrl}
          version={version}
          versions={pageVersions}
        />

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
        {showFooter && <Footer />}
      </main>
      <div>
        <CookiesProvider cookies={cookies}>
          <CookieBannerUniversal
            dismissOnScroll={false}
            dismissOnClick={false}
            cookiePath={'/'}
            disableStyle
            cookie={'user-has-accepted-cookies'}
          >
            {(onAccept) => <CookieConsent onAccept={onAccept} />}
          </CookieBannerUniversal>
        </CookiesProvider>
      </div>
      <HelperWidget />
    </div>
  );
};
