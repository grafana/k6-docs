import { DocPageTitleGroup } from 'components/pages/doc-page/doc-page-title-group';
import { styles as codeStyles } from 'components/shared/code';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import { DocPageContent } from 'components/templates/doc-page/doc-page-content';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import { useScrollToAnchor } from 'hooks';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';

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

  console.log('Sidebar', sidebarTree);
  console.log('TRANSLATIONS', frontmatter.translations);

  return (
    <DocLayout
      pageMetadata={pageMetadata}
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageTranslations={frontmatter.translations}
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
