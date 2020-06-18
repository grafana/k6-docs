import React from 'react';
import { DocLayout } from 'layouts/doc-layout';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import { styles as codeStyles } from 'components/shared/code';
import { DocPageContent } from 'components/templates/doc-page/doc-page-content';
import { DocPageTitleGroup } from 'components/pages/doc-page/doc-page-title-group';
import { useScrollToAnchor } from 'hooks';

export default function (props) {
  const {
    pageContext: {
      remarkNode: { body, frontmatter },
      sidebarTree,
      navLinks,
      breadcrumbs,
    },
  } = props;
  useScrollToAnchor();

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
        <DocPageContent label={codeStyles.codeContainer} content={body} />
      </div>
    </DocLayout>
  );
}
