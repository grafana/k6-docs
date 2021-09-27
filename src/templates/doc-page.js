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
import { flattenSidebarTree } from 'utils/utils';
import { LATEST_VERSION } from 'utils/utils.node';

export default function DocPage(props) {
  const {
    path,
    pageContext: {
      remarkNode: { body, frontmatter },
      sidebarTree,
      navLinks,
      breadcrumbs,
      locale = 'en',
      version = null,
      pageVersions = null,
      sectionName,
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

  const isJsAPIPage = sidebarTree.name === 'javascript api' || !!version;

  let prev = null;
  let next = null;

  // only get prev and next articles for Guides and Cloud sections
  if (
    sidebarTree.name === 'cloud' ||
    sidebarTree.name === 'es' ||
    sidebarTree.name === 'en'
  ) {
    const slugWithSlash = frontmatter.slug.startsWith('/')
      ? frontmatter.slug
      : `/${frontmatter.slug}`;
    const flatSidebar = flattenSidebarTree(sidebarTree);

    const currentIndex = flatSidebar.findIndex(
      (elem) => elem.path === slugWithSlash,
    );

    if (currentIndex > 0) {
      prev = flatSidebar[currentIndex - 1];
    }
    if (currentIndex === 0 && sidebarTree.name === 'cloud') {
      prev = {
        title: 'Cloud docs',
        path: '/cloud/',
      };
    }
    if (currentIndex < flatSidebar.length - 1 && currentIndex >= 0) {
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
        sectionName={sectionName}
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
          <DocPageContent
            label={codeStyles.codeContainer}
            content={body}
            version={version}
          />
          {(prev || next) && <DocPageNavigation prev={prev} next={next} />}
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
