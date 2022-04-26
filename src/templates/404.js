import { NotFound } from 'components/pages/404/not-found';
import LocaleProvider from 'contexts/locale-provider';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

export default function NotFoundPage({
  pageContext: { sidebarTree, navLinks },
}) {
  const pageMetadata = SeoMetadata[404];
  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <NotFound />
      </DocLayout>
    </LocaleProvider>
  );
}
