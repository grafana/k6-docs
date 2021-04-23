import { ExtensionSelection } from 'components/pages/doc-ecosystem/extension-selection';
import { PageInfo } from 'components/shared/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

const bundleBuilderSidebar = {
  name: 'ecosystem',
  meta: {
    title: 'Ecosystem',
    path: '/ecosystem/',
  },
  children: {
    Ecosystem: {
      name: 'ecosystem',
      meta: {
        title: 'Ecosystem',
        path: '/ecosystem/',
      },
      children: {
        Discovery: {
          name: 'Discovery',
          meta: {
            title: 'Discovery',
            isActiveSidebarLink: true,
            path: '/ecosystem/',
          },
          children: {},
        },
        'Bundle Builder': {
          name: 'Bundle Builder',
          meta: {
            title: 'Bundle Builder',
            isActiveSidebarLink: true,
            path: '/ecosystem/bundle-builder/',
          },
          children: {},
        },
      },
    },
  },
};

export default function ({ pageContext: { navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.ecosystem;

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={bundleBuilderSidebar}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <PageInfo
          title={'Bundle Builder'}
          description={`Easily create your own bespoke k6 binary 
          with all the extensions you want to run using the bundle builder 
          and xk6. Just select all the extensions you want to use, 
          and copy the command below. The resulting binary then be used 
          to leverage all the extensions you're picked in your test, at the same time.`}
          variant="wide"
          className="container"
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionSelection />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
