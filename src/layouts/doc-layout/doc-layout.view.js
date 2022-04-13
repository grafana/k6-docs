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
import { SEO } from 'components/shared/seo';
import { VersionBanner } from 'components/shared/version-banner';
import { VersionSwitcher } from 'components/shared/version-switcher';
import { useLocale } from 'contexts/locale-provider';
import { Link, navigate, withPrefix } from 'gatsby';
import { I18N_CONFIG } from 'i18n/i18n-config';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} from 'react-cookie-banner';
import { childrenToList, isInIFrame } from 'utils';
import AlgoliaQueries from 'utils/algolia';
import { main, app } from 'utils/urls';
import { LATEST_VERSION } from 'utils/versioning';

import ArrowLeft from './svg/arrow-left.inline.svg';

import styles from './doc-layout.module.scss';

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

const MobileNavMenu = ({ sidebarTree, links }) => {
  const [value, setValue] = useState(false);
  useLayoutEffect(() => {
    /* manually adding back cloud rest api path
     since we have excluded it in gatsby-node
     */
    const topLevelNav = [...links, '/cloud-rest-api'];
    const currentValue = window.location.pathname
      .replace(/^\/docs/, '')
      .replace(/\/$/, '');
    if (!topLevelNav.includes(currentValue.replace(/\/$/, ''))) {
      setValue(currentValue);
    }
  }, []);
  return (
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
      value={value}
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
};

// renders sidebar nodes from passed children prop, recursively
const SidebarNode = (props) => {
  const {
    node: { name, meta, children },
  } = props;
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
      meta.path === '/' || meta.path === '/es/' || meta.path === '/extensions/'
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
  }, [search]);

  const hasSubMenu = Object.keys(children).length;

  const nodes = {
    externalLink: () => (
      <a
        className={styles.sidebarNodeTitle}
        href={meta.redirect}
        target={meta.redirectTarget ? meta.redirectTarget : '_self'}
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

  return (
    <>
      {!meta.hideFromSidebar && (
        <div
          className={classNames(
            styles.sidebarNode,
            hasSubMenu && styles.sidebarNodeWithChildren,
          )}
        >
          {nodes[nodeType()]()}
          {hasSubMenu > 0 && (
            <ArrowLeft
              className={classNames(
                styles.sidebarArrow,
                isActive && styles.sidebarArrowActive,
              )}
            />
          )}
          {!!Object.keys(children).length && isActive && (
            <div className={styles.sidebarNodeChildren}>
              {childrenToList(children).map((node) => (
                <SidebarNode node={node} key={node.name} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

/*
 * Main Component
 */

export const DocLayout = ({
  pageMetadata,
  pageTranslations = null,
  version,
  sidebarTree,
  navLinks: links,
  children,
  pageVersions = {},
  sectionName = null,
}) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const { locale, urlLocale, setLocale } = useLocale();

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
  React.useEffect(() => {
    if (locale && locale !== urlLocale) {
      setLocale(urlLocale);
    }
  }, [location]);

  const showLanguageToggle =
    !I18N_CONFIG.hideLanguageToggle &&
    !!pageTranslations &&
    pageTranslations.en &&
    pageTranslations.es;

  return (
    <div className={styles.wrapper}>
      <SEO
        pageTranslations={pageTranslations}
        pageVersions={pageVersions}
        {...pageMetadata}
      />

      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <HeaderLogo theme={'doc'} />
        </div>
        {sidebarTree && <SidebarSectionDropdown links={links} />}
        {sidebarTree &&
          childrenToList(sidebarTree.children).map((sectionNode) => (
            <div className={styles.sidebarSection} key={sectionNode.name}>
              {sectionNode.meta.title !== sectionName &&
                sectionNode.meta.isActiveSidebarLink && (
                  <Heading
                    className={styles.sidebarSectionTitle}
                    size={'sm'}
                    tag={'h2'}
                  >
                    <Link
                      className={styles.sidebarSectionTitleLink}
                      to={sectionNode.meta.path}
                    >
                      {sectionNode.meta.title || sectionNode.name}
                    </Link>
                  </Heading>
                )}
              {sectionNode.meta.title !== sectionName &&
                !sectionNode.meta.isActiveSidebarLink && (
                  <Heading
                    className={styles.sidebarSectionTitle}
                    size={'sm'}
                    tag={'h2'}
                  >
                    {sectionNode.meta.title || sectionNode.name}
                  </Heading>
                )}
              <div className={styles.sidebarNodeChildren}>
                {childrenToList(sectionNode.children).map((node) => (
                  <SidebarNode node={node} key={node.name} />
                ))}
              </div>
            </div>
          ))}
        <div
          className={classNames(styles.sidebarSection, styles.sidebarFooter)}
        >
          <a className={'link'} href={`${main}`}>
            k6.io
          </a>
          <a className={'link'} href={`${app}`}>
            app.k6.io
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
              <MobileNavMenu
                sidebarTree={sidebarTree}
                links={links.map(({ to }) => to)}
              />
            </div>
          </div>
        </Header>
        {version && version !== LATEST_VERSION && (
          <VersionBanner version={version} versions={pageVersions} />
        )}

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
