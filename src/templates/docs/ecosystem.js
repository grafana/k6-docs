import { ExtensionsList } from 'components/pages/doc-ecosystem/extensions-list';
import { PageInfo } from 'components/shared/page-info';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import EXTENSIONS_DATA from 'data/ecosystem/extensions';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import queryString from 'query-string';
import React from 'react';
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
    Category: {
      name: 'Category',
      meta: {
        title: 'Category',
        path: '/ecosystem/',
      },
      children: {
        All: {
          name: 'All',
          meta: {
            title: 'All',
            isActiveSidebarLink: true,
            path: '/ecosystem/',
          },
          children: {},
        },
      },
    },
  },
};

CATEGORIES.forEach((category) => {
  ecosystemSidebar.children.Category.children[capitalize(category)] = {
    name: capitalize(category),
    meta: {
      title: capitalize(category),
      isActiveSidebarLink: true,
      path: `/ecosystem/?category=${category}`,
    },
    children: {},
  };
});

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
        <PageInfo
          title={'Discovery'}
          description={`Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Donec proin urna, fusce vitae et eget sed enim, quam. 
          Sed aliquet molestie nec tincidunt habitasse erat enim platea.`}
          variant="wide"
        />
        <div className={`${docPageContent.inner} `}>
          <ExtensionsList category={category} />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
