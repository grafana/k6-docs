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
          description={``}
          className="container"
          breadcrumbs={breadcrumbs}
        />
        <div className={docPageContent.inner}>
          <p>
            Easily create your own bespoke k6 binary with all the extensions you
            want to run using the bundle builder and xk6. Just select all the
            extensions you want to use, and copy the command below. The
            resulting binary will then allow you to use all the extensions
            you&apos;ve picked in your test scripts.
          </p>
          <p>
            Want learn more about how xk6 works or how to create your own
            extension? Check out the{' '}
            <Link
              to={'/extensions/guides/build-a-k6-binary-with-extensions/'}
              class={docPageContent.link}
            >
              tutorial
            </Link>
            .
          </p>
        </div>
        <div className={`${docPageContent.inner} `}>
          <ExtensionSelection data={extensionsList} />
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
