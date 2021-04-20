import { ExtensionSelection } from 'components/pages/doc-ecosystem/extension-selection';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

export default function ({ pageContext: { navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.ecosystem;

  const ecosystemSidebar = {
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
      Types: {
        name: 'types',
        meta: {
          title: 'Types',
          path: '/ecosystem/',
        },
        children: {
          Extensions: {
            name: 'Extensions',
            meta: {
              title: 'Extensions',
              isActiveSidebarLink: true,
              path: '/ecosystem/?type=extensions',
            },
            children: {},
          },
          'Reporting Templates': {
            name: 'Reporting Templates',
            meta: {
              title: 'Reporting Templates',
              isActiveSidebarLink: true,
              path: '/ecosystem/?type=reporting-templates',
            },
            children: {},
          },
        },
      },
      Category: {
        name: 'Category',
        meta: {
          title: 'Category',
          path: '/ecosystem/',
        },
        children: {},
      },
    },
  };

  return (
    <LocaleProvider>
      <DocLayout
        // sidebarTree={sidebarTree}
        sidebarTree={ecosystemSidebar}
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
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionSelection />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
