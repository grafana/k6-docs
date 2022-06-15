import { ExtensionsList } from 'components/pages/doc-extensions/extensions-list';
import { ExtensionsTitleGroup } from 'components/pages/doc-extensions/extensions-title-group';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link, graphql, useStaticQuery } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import queryString from 'query-string';
import React from 'react';
import SeoMetadata from 'utils/seo-metadata';

const breadcrumbs = [
  {
    name: 'Extensions',
    path: '/extensions/',
  },
  {
    name: 'Getting started',
    path: '/extensions/getting-started/',
  },
  {
    name: 'Explore',
    path: '/extensions/explore/',
  },
];

export default function ExploreExtensionsPage({
  location,
  pageContext: { sidebarTree, navLinks },
}) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata['explore-extensions'];

  const queryParams = queryString.parse(location.search);
  const category = queryParams?.category || 'All';

  const {
    docExtensionsJson: { extensionsList },
  } = useStaticQuery(graphql`
    query exploreExtensionsData {
      docExtensionsJson {
        extensionsList: extensions {
          name
          description
          url
          logo
          official
          categories
          author {
            name
            url
          }
        }
      }
    }
  `);

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageMetadata={pageMetadata}
        sectionName="Extensions"
      >
        <ExtensionsTitleGroup
          title={'Explore'}
          description={
            'Discover the extensions available to meet your specific needs.'
          }
          className="container"
          breadcrumbs={breadcrumbs}
        />
        <div className={docPageContent.inner}>
          <p>
            With more than 50 available extensions, the k6 extension ecosystem
            provides many options to meet your requirements, whether
            incorporating specific protocol access, embedding a particular
            client, or improving your tests&apos; performance. Extension
            development includes a mix of k6 developers and the open-source
            developer community.
          </p>

          <p>
            Explore the endless possibilities of k6 using extensions from the
            table below. Questions? Feel free to join the discussions related to
            extensions within the{' '}
            <Link
              className={docPageContent.link}
              to={'https://community.k6.io/c/extensions/'}
            >
              k6 Community Forum
            </Link>
            .
          </p>

          <p>
            <ExtensionsList category={category} data={extensionsList} />
          </p>

          <p>
            Ready to create your bespoke k6 binary containing the features you
            need? Head over to the{' '}
            <Link
              className={docPageContent.link}
              to={'/extensions/bundle-builder/'}
            >
              bundle builder
            Link>{' '}
            to get started!
          </p>
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
