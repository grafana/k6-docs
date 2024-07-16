import classNames from 'classnames';
import {
  ExtensionsOverview,
  ExtensionsUseCases,
} from 'components/pages/doc-extensions';
import { PageInfo } from 'components/shared/page-info';
import { SEO } from 'components/shared/seo';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React, { useRef } from 'react';
import SeoMetaData from 'utils/seo-metadata';

const Extensions = ({ pageContext: { sidebarTree, navLinks } }) => {
  useScrollToAnchor();

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
        sectionName="Extensions"
        canonicalUrl={SeoMetaData.extensions.data.canonicalUrl}
      >
        <PageInfo
          title={'k6 Extensions'}
          description={`Expand the potential use cases for k6.`}
        />
        <div className={docPageContent.inner}>
          <div ref={contentContainerRef} className={stickyContainerClasses}>
            <ExtensionsOverview />
            <ExtensionsUseCases />
          </div>
        </div>
      </DocLayout>
    </LocaleProvider>
  );
};

export default Extensions;

export const Head = ({ pageContext: { version } }) => (
  <SEO version={version} {...SeoMetaData.extensions} />
);
