import React from 'react';
import { DocLayout } from 'layouts/doc-layout';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import { styles as codeStyles } from 'components/shared/code';
import { DocPageContent } from 'components/templates/doc-page/doc-page-content';
import { DocPageTitleGroup } from 'components/pages/doc-page/doc-page-title-group';

export default function (props) {
  const {
    pageContext: {
      remarkNode: { html, frontmatter },
      sidebarTree,
      navLinks,
      breadcrumbs,
    },
    location,
  } = props;

  const pageMetadata = {
    data: {
      title: frontmatter.head_title || frontmatter.title,
      description: frontmatter.excerpt,
      slug: frontmatter.slug,
    },
  };
  return (
    <DocLayout
      pageMetadata={pageMetadata}
      sidebarTree={sidebarTree}
      navLinks={navLinks}
    >
      <div className={`${styles.container}`}>
        <Breadcrumbs items={breadcrumbs} />
        <DocPageTitleGroup
          title={frontmatter.title}
          articleSrc={frontmatter.fileOrigin}
        />
        <DocPageContent
          currentPath={location.pathname}
          label={codeStyles.codeContainer}
          html={html}
        />
      </div>
    </DocLayout>
  );
}
