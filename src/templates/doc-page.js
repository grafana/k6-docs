import classNames from 'classnames';
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

  const isJsAPIPage = path.indexOf('/javascript-api/') >= 0;

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
        path={path}
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
        </div>
      </DocLayout>
    </LocaleProvider>
  );
}
