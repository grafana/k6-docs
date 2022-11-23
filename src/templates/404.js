import { NotFound } from 'components/pages/404/not-found';
import { SEO } from 'components/shared/seo';
import LocaleProvider from 'contexts/locale-provider';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetaData from 'utils/seo-metadata';

const NotFoundPage = ({ pageContext: { sidebarTree, navLinks } }) => (
  <LocaleProvider>
    <DocLayout sidebarTree={sidebarTree} navLinks={navLinks}>
      <NotFound />
    </DocLayout>
  </LocaleProvider>
);

export default NotFoundPage;

export const Head = () => <SEO {...SeoMetaData['404']} />;
