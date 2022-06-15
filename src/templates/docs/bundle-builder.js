import { ExtensionSelection } from 'components/pages/doc-extensions/extension-selection';
import { ExtensionsTitleGroup } from 'components/pages/doc-extensions/extensions-title-group';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
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
    name: 'Build Bundle',
    path: '/extensions/bundle-builder/',
  },
];

export default function BundleBuilderPage({
  pageContext: { sidebarTree, navLinks },
}) {
  useScrollToAnchor();
  const pageMetadata = SeoMetadata['bundle-builder'];

  const {
    docExtensionsJson: { extensionsList },
  } = useStaticQuery(graphql`
    query extensionsBundleData {
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
          title={'Build Bundle'}
          description={`Combine multiple extensions into your reliability testing toolkit.`}
          className="container"
          breadcrumbs={breadcrumbs}
        />
        <div className={docPageContent.inner}>
          <p>
            Extensions are composable; select the extensions you would like to
            mix and match for use in your test scripts. Then use the{' '}
            <em>builder</em> below to generate your command line to build your
            bespoke k6 binary.
          </p>
          <ExtensionSelection
            data={extensionsList}
            description={
              'Use the following command to build k6 based upon your selection(s):'
            }
          />
          <p>
            Don&apos;t see what you need? Learn how you can{' '}
            <Link
              to={'/extensions/getting-started/create/'}
              class={docPageContent.link}
            >
              create
            </Link>{' '}
            a custom extension.
          </p>
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
