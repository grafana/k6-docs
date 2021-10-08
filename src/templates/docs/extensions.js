import { ExtensionsList } from 'components/pages/doc-extensions/extensions-list';
import { ExtensionsTitleGroup } from 'components/pages/doc-extensions/extensions-title-group';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import EXTENSIONS_DATA from 'data/extensions/extensions';
import { Link } from 'gatsby';
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

export const extensionsSidebar = {
  name: 'extensions',
  meta: {
    title: 'Extensions',
    path: '/extensions/',
  },
  children: {
    Extensions: {
      name: 'extensions',
      meta: {
        title: 'Extensions',
        path: '/extensions/',
      },
      children: {
        Explore: {
          name: 'Explore',
          meta: {
            title: 'Explore',
            isActiveSidebarLink: true,
            path: '/extensions/',
          },
          children: {},
        },
        'Build Bundle': {
          name: 'Build Bundle',
          meta: {
            title: 'Build Bundle',
            isActiveSidebarLink: true,
            path: '/extensions/bundle-builder/',
          },
          children: {},
        },
      },
    },
    Guides: {
      name: 'guides',
      meta: {
        title: 'Guides',
        path: '/extensions/',
      },
      children: {
        GetStarted: {
          name: 'Get started with xk6',
          meta: {
            title: 'Get started with xk6',
            isActiveSidebarLink: true,
            path: 'https://k6.io/blog/extending-k6-with-xk6',
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
    //     path: '/extensions/',
    //   },
    //   children: {
    //     All: {
    //       name: 'All',
    //       meta: {
    //         title: 'All',
    //         isActiveSidebarLink: true,
    //         path: '/extensions/',
    //       },
    //       children: {},
    //     },
    //   },
    // },
  },
};

// @TODO: uncomment to enable category filters
// CATEGORIES.forEach((category) => {
//   extensionsSidebar.children.Category.children[capitalize(category)] = {
//     name: capitalize(category),
//     meta: {
//       title: capitalize(category),
//       isActiveSidebarLink: true,
//       path: `/extensions/?category=${category}`,
//     },
//     children: {},
//   };
// });

const breadcrumbs = [
  {
    name: 'Extensions',
    path: '/extensions/',
  },
  {
    name: 'Explore',
    path: '/extensions/',
  },
];

export default function Extensions({ location, pageContext: { navLinks } }) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata.extensions;

  const queryParams = queryString.parse(location.search);
  const category = queryParams?.category || 'All';

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={extensionsSidebar}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        sectionName="Extensions"
      >
        <ExtensionsTitleGroup
          title={'Explore'}
          description={''}
          breadcrumbs={breadcrumbs}
        />
        <div className={docPageContent.inner}>
          <span>
            The extension ecosystem enables developers and testers to extend k6
            to cover use cases not supported natively in the core. Explore the
            endless possibilities of k6 using extensions from the table below.
            Common use cases include:
          </span>
          <ul>
            <li>Adding support for testing new protocols</li>
            <li>
              Using clients to communicate with other systems in your test, or
            </li>
            <li>
              Making an expensive part of your test more performant by writing
              it in Go and consuming it from your tests using JavaScript
            </li>
          </ul>
          <span>
            Ready to put together your own bespoke k6 binary containing the
            features you need? Head over to the{' '}
            <Link
              className={docPageContent.link}
              to={'/extensions/bundle-builder/'}
            >
              bundle builder
            </Link>{' '}
            to get started!
          </span>
        </div>
        <div className={docPageContent.inner}>
          <ExtensionsList category={category} />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
