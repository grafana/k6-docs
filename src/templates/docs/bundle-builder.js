import { ExtensionSelection } from 'components/pages/doc-extensions/extension-selection';
import { ExtensionsTitleGroup } from 'components/pages/doc-extensions/extensions-title-group';
import Blockquote from 'components/shared/blockquote';
import { SEO } from 'components/shared/seo';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import SeoMetaData from 'utils/seo-metadata';

const breadcrumbs = [
  {
    name: 'Extensions',
    path: '/extensions/',
  },
  {
    name: 'Get started',
    path: '/extensions/get-started/',
  },
  {
    name: 'Bundle',
    path: '/extensions/get-started/bundle/',
  },
];

const BundleBuilderPage = ({ pageContext: { sidebarTree, navLinks } }) => {
  useScrollToAnchor();

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
          author {
            name
            url
          }
          stars
          type
          categories
          tiers
          cloudEnabled
        }
      }
    }
  `);

  return (
    <LocaleProvider>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        sectionName="Extensions"
      >
        <ExtensionsTitleGroup
          title={'Bundle'}
          description={`Combine multiple extensions into your reliability testing toolkit.`}
          className="container"
          breadcrumbs={breadcrumbs}
        />
        <div className={docPageContent.inner}>
          <Blockquote mod="attention" title="Looking for Feedback">
            Help us improve extensions by completing this{' '}
            <Link
              to="https://docs.google.com/forms/d/e/1FAIpQLSeL1RdxAyaoznGKLAdlMa5sLmVWoytpxRCZZVzBeFGSyqGI6A/viewform"
              className="link"
            >
              short survey
            </Link>
            .
          </Blockquote>
          <p className="container">
            Extensions are composable; you can combine any extensions, or mix
            and match different test cases. To generate the command for your
            extension combination, you can use this <em>bundle builder</em>.
          </p>
          <Blockquote>
            To build successfully, ensure your environment is as described in{' '}
            <Link
              to="/extensions/guides/build-a-k6-binary-using-go/"
              className="link"
            >
              Build a k6 binary using Go
            </Link>
            .
          </Blockquote>
          <p />
          <ExtensionSelection
            data={extensionsList}
            description={
              'Select the extensions you want, then copy the generated command.'
            }
          />
          <p>
            Don&apos;t see what you need? Learn how you can{' '}
            <Link
              to={'/extensions/get-started/create/'}
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
};

export default BundleBuilderPage;

export const Head = ({ pageContext: { version } }) => (
  <SEO version={version} {...SeoMetaData['bundle-builder']} />
);
