import classNames from 'classnames';
import {
  ExtensionsQuickstart,
  ExtensionsOverview,
  ExtensionsUseCases,
  WhatIsXk6,
} from 'components/pages/doc-extensions';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { PageInfo } from 'components/shared/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetadata from 'utils/seo-metadata';

export default function Extensions({ pageContext: { sidebarTree, navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.extensions;

  const contentContainerRef = useRef(null);
  const stickyContainerClasses = classNames(
    docPageContent.mainDocContent,
    docPageContent.contentWrapper,
  );

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        sectionName="Extensions"
      >
        <PageInfo
          title={'k6 Extensions'}
          description={`Expand the potential use cases for k6.`}
        />
        <div className={docPageContent.inner}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <ExtensionsQuickstart />
            <ExtensionsOverview />
            <WhatIsXk6 />
            <ExtensionsUseCases />
            Next,{' '}
            <Link to={'/extensions/explore/'} class={docPageContent.link}>
              explore
            </Link>{' '}
            the available extensions to see how you can expand your use of k6
            right now.
          </div>
          <TableOfContents
            contentContainerRef={contentContainerRef}
            shouldMakeReplacement
          />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
