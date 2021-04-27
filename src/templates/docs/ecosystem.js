import { EcosystemTitleGroup } from 'components/pages/doc-ecosystem/ecosystem-title-group';
import { ExtensionsList } from 'components/pages/doc-ecosystem/extensions-list';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import EXTENSIONS_DATA from 'data/ecosystem/extensions';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import queryString from 'query-string';
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { capitalize } from 'utils';
import SeoMetadata from 'utils/seo-metadata';

let CATEGORIES = new Set();
EXTENSIONS_DATA.forEach((extension) => {
  extension.categories.forEach((category) =>
    CATEGORIES.add(category.toLowerCase()),
  );
});

CATEGORIES = Array.from(CATEGORIES).sort();

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
    // @TODO: uncomment to enable category filters
    // Category: {
    //   name: 'Category',
    //   meta: {
    //     title: 'Category',
    //     path: '/ecosystem/',
    //   },
    //   children: {
    //     All: {
    //       name: 'All',
    //       meta: {
    //         title: 'All',
    //         isActiveSidebarLink: true,
    //         path: '/ecosystem/',
    //       },
    //       children: {},
    //     },
    //   },
    // },
  },
};

// @TODO: uncomment to enable category filters
// CATEGORIES.forEach((category) => {
//   ecosystemSidebar.children.Category.children[capitalize(category)] = {
//     name: capitalize(category),
//     meta: {
//       title: capitalize(category),
//       isActiveSidebarLink: true,
//       path: `/ecosystem/?category=${category}`,
//     },
//     children: {},
//   };
// });

export default function ({ location, pageContext: { navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.ecosystem;

  const queryParams = queryString.parse(location.search);
  const category = queryParams?.category || 'All';

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={ecosystemSidebar}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
      >
        <EcosystemTitleGroup
          title={'Discovery'}
          description={`<span>
                The extension ecosystem enables developers and testers to extend
                k6 to cover use casesnot supported natively in the core. Explore
                the endless possibilities of k6 using extensions from the table
                below.
              </span>
              <br />
              <br/>
              <span>
                Ready to put together your own bespoke k6 binary containing the
                features you need? Head over to the
                <a href="/ecosystem/bundle-builder/">bundle builder</a> to
                get started!
              </span>
            `}
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionsList category={category} />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
