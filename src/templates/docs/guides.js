import classNames from 'classnames';
import { DocPageNavigation } from 'components/pages/doc-page/doc-page-navigation';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import {
  Features,
  Manifesto,
  Quickstart,
  WhatIs,
} from 'components/pages/doc-welcome';
import { K6DoesNot } from 'components/pages/doc-welcome/k6-does-not';
import { UseCases } from 'components/pages/doc-welcome/use-cases';
import { PageInfo } from 'components/shared/page-info';
import { SEO } from 'components/shared/seo';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import I18nProvider from 'contexts/i18n-provider';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetaData from 'utils/seo-metadata';
import { flattenSidebarTree } from 'utils/utils';

const pageInfo = {
  en: {
    title: 'Welcome to the k6 documentation',
    description:
      'This documentation will help you go from a total beginner to a seasoned k6 expert!',
  },
  es: {
    title: 'Bienvenido a la documentación de k6',
    description:
      'Esta documentación le ayudará a pasar de ser un principiante a un experto en k6.',
  },
};

const GuidesContent = ({
  pageContext: { sidebarTree, navLinks, locale = 'en' },
}) => {
  useScrollToAnchor();

  const contentContainerRef = useRef(null);
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  // @TODO: update if more languages are added
  const guidesTranslations = {
    en: {
      path: '/',
      title: 'Guides',
    },
  };

  const flatSidebar = flattenSidebarTree(sidebarTree);

  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      locale={locale}
      pageTranslations={guidesTranslations}
      sectionName="Guides"
      canonicalUrl={SeoMetaData.guides.data.canonicalUrl}
    >
      <PageInfo {...pageInfo[locale]} />
      <div className={classNames(docPageContent.inner)}>
        <div ref={contentContainerRef} className={stickyContainerClasses}>
          <Quickstart />
          <WhatIs />
          <Features />
          <UseCases />
          <Manifesto />
          <K6DoesNot />
        </div>
        <DocPageNavigation
          prev={null}
          next={flatSidebar[1]}
          variant="top-level"
        />
        <TableOfContents
          contentContainerRef={contentContainerRef}
          shouldMakeReplacement
        />
      </div>
    </DocLayout>
  );
};

const Guides = (props) => {
  const {
    pageContext: { locale = 'en' },
  } = props;

  return (
    <LocaleProvider urlLocale={locale}>
      <I18nProvider>
        <GuidesContent {...props} />
      </I18nProvider>
    </LocaleProvider>
  );
};

export default Guides;

export const Head = ({ pageContext: { locale, version } }) => {
  const pageMetaData = {
    data: {
      ...(locale === 'es'
        ? SeoMetaData.guidesES.data
        : SeoMetaData.guides.data),
      slug: locale === 'es' ? 'es/' : '',
    },
  };

  return <SEO version={version} {...pageMetaData} />;
};
