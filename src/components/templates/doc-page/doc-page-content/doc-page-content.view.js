import React from 'react';
import { HtmlContent } from 'components/blocks/html-content';
import { StickyContainer, Sticky } from 'react-sticky';
import { DocPageNav } from 'components/pages/doc-page/doc-page-nav';
import { CodeGroup } from 'components/templates/doc-page/code-group';
import { DocBlockquote } from 'components/pages/doc-page/doc-blockquote';
import AnchorIcon from './svg/anchor.inline.svg';
import styles from './doc-page-content.module.scss';
import classNames from 'classnames';

import { slugify } from 'utils';

const components = {
  '.code-group': CodeGroup,
  h2: ({ mdBlockContent }) => (
    <h2
      className={styles.markHeading}
      id={`${slugify(mdBlockContent).replace(/\//g, '-')}`}
    >
      <a href={`#${slugify(mdBlockContent).replace(/\//g, '-')}`}>
        <AnchorIcon />
      </a>
      {mdBlockContent}
    </h2>
  ),
  table: ({ mdBlockContent }) => (
    <div className={styles.tableWrapper}>
      <table dangerouslySetInnerHTML={{ __html: mdBlockContent }} />
    </div>
  ),
  '.doc-blockquote': DocBlockquote,
};

export const DocPageContent = ({ label, html, currentPath, mod }) => (
  <div
    className={classNames(styles.wrapper, {
      [styles.wrapper_beliefs]: mod === 'beliefs',
    })}
  >
    <div className={`${styles.inner}`}>
      <StickyContainer>
        <div
          className={classNames(styles.mainDocContent, {
            [styles.mainDocContent_beliefs]: mod === 'beliefs',
          })}
        >
          <HtmlContent
            content={html}
            components={components}
            className={classNames(
              styles.contentWrapper,
              { [styles.contentWrapper_beliefs]: mod === 'beliefs' },
              label,
            )}
          />
        </div>

        <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
          {({ style }) => (
            <div style={style} className={styles.anchorBarWrapper}>
              <DocPageNav
                currentPath={currentPath}
                label={styles.anchorBar}
                content={html}
              />
            </div>
          )}
        </Sticky>
      </StickyContainer>
    </div>
  </div>
);
