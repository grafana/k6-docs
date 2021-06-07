import classNames from 'classnames';
import { DocPageNavigation } from 'components/pages/doc-page/doc-page-navigation';
import { DocPageTitleGroup } from 'components/pages/doc-page/doc-page-title-group';
import { styles as codeStyles } from 'components/shared/code';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import { DocPageContent } from 'components/templates/doc-page/doc-page-content';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import { LATEST_VERSION } from 'utils/utils.node';

const flattenTree = (sidebar) => {
  const flat = [];
  const processNode = (node) => {
    if (node.children) {
      const keys = Object.keys(node.children);
      keys.forEach((key) => {
        if (node.children[key].meta.hideFromSidebar) {
          return;
        }
        flat.push({
          title: node.children[key].meta.title,
          path: node.children[key].meta.path,
        });
        processNode(node.children[key]);
      });
    }
  };

  const keys = Object.keys(sidebar.children);
  keys.forEach((key) => processNode(sidebar.children[key]));
  return flat;
};

export default function (props) {
  const {
    path,
    pageContext: {
      remarkNode: { body, frontmatter },
      sidebarTree,
      navLinks,
      breadcrumbs,
      locale = 'en',
      version,
      pageVersions = null,
    },
  } = props;
  useScrollToAnchor();

  const pageMetadata = {
    data: {
      title: frontmatter.head_title || frontmatter.title,
      description: frontmatter.excerpt,
      slug: frontmatter.slug ? frontmatter.slug : path.slice(1),
    },
  };

  const isJsAPIPage =
    sidebarTree.name === 'javascript api' || typeof version !== 'undefined';

  let prev = null;
  let next = null;

  if (
    sidebarTree.name === 'cloud' ||
    sidebarTree.name === 'es' ||
    sidebarTree.name === 'en'
  ) {
    const flatSidebar = flattenTree(sidebarTree);
    const currentIndex = flatSidebar.findIndex(
      (elem) => elem.path === `/${frontmatter.slug}`,
    );

    if (currentIndex > 0) {
      prev = flatSidebar[currentIndex - 1];
    }
    if (currentIndex < flatSidebar.length - 1) {
      next = flatSidebar[currentIndex + 1];
    }
  }

  return (
    <LocaleProvider urlLocale={locale}>
      <DocLayout
        pageMetadata={pageMetadata}
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        pageTranslations={frontmatter.translations}
        locale={locale}
        version={isJsAPIPage ? version || LATEST_VERSION : null}
        pageVersions={pageVersions}
        path={frontmatter.slug}
      >
        <div
          className={classNames(
            styles.container,
            version && version !== LATEST_VERSION && styles.versioned,
          )}
        >
          <Breadcrumbs items={breadcrumbs} />
          <DocPageTitleGroup
            title={frontmatter.title}
            articleSrc={frontmatter.fileOrigin}
          />
          <DocPageContent label={codeStyles.codeContainer} content={body} />
          {(prev || next) && <DocPageNavigation prev={prev} next={next} />}
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
