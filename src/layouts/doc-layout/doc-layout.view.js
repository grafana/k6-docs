import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Link, navigate, withPrefix } from 'gatsby';
import {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} from 'react-cookie-banner';
import { Heading } from 'components/shared/heading';
import HelperWidget from 'components/shared/helper-widget';
import {
  Header,
  HeaderNav,
  HeaderLogo,
  Burger,
} from 'components/blocks/header';
import { SearchBox } from 'components/shared/search-box';
import { Footer } from 'components/blocks/footer';
import { SEO } from 'components/shared/seo';
import { MobileNav } from 'components/blocks/mobile-nav';
import { childrenToList, slugify, isInIFrame } from 'utils';

import styles from './doc-layout.module.scss';

import CookieConsent from 'components/shared/cookie-consent';
import _ from 'lodash/lang';

import { main, app } from 'utils/urls';
import AlgoliaQueries from 'utils/algolia';

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
const OptionsGroup = ({
  node: { name, meta, children },
  nested,
  setSelectValue,
}) => {
  useEffect(() => {
    const maybePrefixedPath = withPrefix(meta.path);
    const doesPathMatchLocation =
      maybePrefixedPath === window.location.pathname;
    const isPathLocationPart =
      meta.path === '/'
        ? false
        : window.location.pathname.startsWith(`${maybePrefixedPath}/`) ||
          window.location.pathname.startsWith(
            `${maybePrefixedPath
              .split('/')
              .slice(0, -1)
              .concat(slugify(name))
              .join('/')}/`,
          );
    if (doesPathMatchLocation || isPathLocationPart) {
      setSelectValue(meta.redirect || meta.path);
    }
  }, []);

  const hasSubMenu = !_.isEmpty(children);
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

const MobileNavMenu = ({ sidebarTree }) => {
  const [value, setValue] = useState('');
  return (
    <select
      onChange={({ target }) => {
        const val = target.value;
        const isExternalLink = val.includes('http');
        return isExternalLink ? window.location.assign(val) : navigate(val);
      }}
      className={styles.dropdown}
      value={value}
    >
      {sidebarTree &&
        childrenToList(sidebarTree.children).map((sectionNode) => (
          <optgroup
            label={sectionNode.name}
            key={`docSection-${sectionNode.name}`}
          >
            {childrenToList(sectionNode.children).map((node) => (
              <OptionsGroup
                node={node}
                key={node.name}
                nested={0}
                setSelectValue={setValue}
              />
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

  const isLink = meta && meta.path;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const maybePrefixedPath = withPrefix(meta.path);
    const doesPathMatchLocation =
      maybePrefixedPath === window.location.pathname;
    const isPathLocationPart =
      meta.path === '/'
        ? false
        : window.location.pathname.startsWith(`${maybePrefixedPath}/`) ||
          window.location.pathname.startsWith(
            `${maybePrefixedPath
              .split('/')
              .slice(0, -1)
              .concat(slugify(name))
              .join('/')}/`,
          );
    setIsActive(doesPathMatchLocation || isPathLocationPart);
  }, []);

  const hasSubMenu = !_.isEmpty(children);

  return (
    <div className={hasSubMenu ? styles.sidebarNodeWithChildren : ''}>
      {isLink ? (
        meta.redirect ? (
          <a className={`${styles.sidebarNodeTitle}`} href={meta.redirect}>
            {meta.title}
          </a>
        ) : (
          <Link
            className={`${styles.sidebarNodeTitle} ${
              isActive ? styles.sidebarNodeTitle_active : ''
            }`}
            to={meta.path}
          >
            {meta.title}
          </Link>
        )
      ) : (
        <Heading className={styles.sidebarNodeTitle} tag={'h3'} size={'sm'}>
          {name}
        </Heading>
      )}
      {children && isActive && (
        <div className={styles.sidebarNodeChildren}>
          {childrenToList(children).map((node) => (
            <SidebarNode node={node} key={node.name} />
          ))}
        </div>
      )}
    </div>
  );
};

/*
 * Main Component
 */

export const DocLayout = ({
  pageMetadata,
  sidebarTree,
  navLinks: links,
  children,
}) => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  useEffect(() => {
    if (isMobileNavVisible) {
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.querySelector('html').style.overflow = '';
    }
  }, [isMobileNavVisible]);

  useEffect(() => setShowFooter(!isInIFrame()), []);

  return (
    <div className={styles.wrapper}>
      <SEO {...pageMetadata} />

      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <HeaderLogo theme={'doc'} />
        </div>
        {sidebarTree &&
          childrenToList(sidebarTree.children).map((sectionNode) => (
            <div className={styles.sidebarSection} key={sectionNode.name}>
              {sectionNode.meta.path ? (
                <Heading
                  className={styles.sidebarSectionTitle}
                  size={'sm'}
                  tag={'h2'}
                >
                  <Link
                    className={`link ${styles.sidebarSectionTitle_link}`}
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
              <div>
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
          <div className={'col-xl-8 col-lg-10 d-md-block col-md-12 d-none'}>
            <HeaderNav links={links} />
          </div>
          <div className={'d-md-none col-12 d-flex justify-content-end'}>
            <Burger onClick={() => setIsMobileNavVisible(true)} />
          </div>
          <div className={`col-xl-4 col-12 ${styles.searchBox}`}>
            <SearchBox collapse indices={searchIndices} />
          </div>
          <div className={'d-md-none col-12'}>
            <div className={styles.dropdownWrapper}>
              <MobileNavMenu sidebarTree={sidebarTree} />
            </div>
          </div>
        </Header>

        {children}
        <MobileNav
          links={links}
          isVisible={isMobileNavVisible}
          onCloseButtonClick={() => setIsMobileNavVisible(false)}
        />
        {showFooter && <Footer />}
      </main>
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
      <HelperWidget />
    </div>
  );
};
