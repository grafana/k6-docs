import { DocPageTitleGroup } from 'components/pages/doc-page/doc-page-title-group';
import { styles as codeStyles } from 'components/shared/code';
import { Heading } from 'components/shared/heading';
import { SEO } from 'components/shared/seo';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import { DocPageContent } from 'components/templates/doc-page/doc-page-content';
import styles from 'components/templates/doc-page/doc-page.module.scss';
import LocaleProvider from 'contexts/locale-provider';
import { Link } from 'gatsby';
import { DocLayout } from 'layouts/doc-layout';
import React from 'react';
import { childrenToList, slugify } from 'utils';
import { LATEST_VERSION } from 'utils/utils.node';

const BreadcrumbsStubPage = (props) => {
  const {
    path,
    pageContext: {
      sidebarTree,
      breadcrumbs,
      navLinks,
      title,
      remarkNode,
      directChildren,
      locale,
      translations = null,
      version,
      sectionName,
    },
  } = props;

  const isJsAPIPage = path ? path.indexOf('/javascript-api/') >= 0 : false;

  return (
    <LocaleProvider urlLocale={locale}>
      <DocLayout
        sidebarTree={sidebarTree}
        navLinks={navLinks}
        locale={locale}
        pageTranslations={translations}
        version={isJsAPIPage ? version || LATEST_VERSION : null}
        path={path}
        sectionName={sectionName}
      >
        <div className={`${styles.container}`}>
          <Breadcrumbs items={breadcrumbs} label={styles.breadcrumbsStub} />
          {remarkNode ? (
            <>
              <DocPageTitleGroup
                title={remarkNode.frontmatter.title}
                articleSrc={remarkNode.frontmatter.fileOrigin}
                heading={remarkNode.frontmatter.heading}
              />
              <DocPageContent
                label={codeStyles.codeContainer}
                content={remarkNode.body}
                version={version}
              />
            </>
          ) : (
            <>
              <Heading className={styles.title}>{title}</Heading>
              <ul className={styles.sectionList}>
                {childrenToList(directChildren).map(
                  ({ meta, name }, i) =>
                    !meta.hideFromSidebar && (
                      <li key={`bcl-${i}`}>
                        {meta.redirect ? (
                          <a
                            href={meta.redirect}
                            className={'link'}
                            target={
                              meta.redirectTarget
                                ? meta.redirectTarget
                                : '_self'
                            }
                          >
                            {meta.title ? meta.title : name}
                          </a>
                        ) : (
                          <Link
                            to={`${meta.path || slugify(`/${name}`)}`}
                            className={'link'}
                          >
                            {meta.title ? meta.title : name}
                          </Link>
                        )}
                      </li>
                    ),
                )}
              </ul>
            </>
          )}
        </div>
      </DocLayout>
    </LocaleProvider>
  );
};

export default BreadcrumbsStubPage;

export const Head = ({ pageContext: { title, version, remarkNode } }) => {
  const pageMetaData = {
    data: {
      title,
      description: ' ',
      robots: remarkNode?.frontmatter.robots,
    },
  };

  return <SEO version={version} {...pageMetaData} />;
};
