import { ExtensionsList } from 'components/pages/doc-ecosystem/extensions-list';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

export default function ({ pageContext: { sidebarTree, navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.ecosystem;

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <PageInfo
          title={'Discovery'}
          description={`Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec proin urna, fusce vitae et eget sed enim, quam. 
          Sed aliquet molestie nec tincidunt habitasse erat enim platea.`}
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionsList />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
