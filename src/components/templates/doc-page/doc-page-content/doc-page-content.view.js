import React from 'react';
import { HtmlContent } from 'components/blocks/html-content';
import { StickyContainer, Sticky } from 'react-sticky';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { CodeGroup } from 'components/pages/doc-page/code-group';
import TableWrapper from 'components/pages/doc-page/table-wrapper';
import { HeadingLandmark } from 'components/shared/heading';
import Blockquote from 'components/pages/doc-page/blockquote';
import LdScript from 'components/pages/doc-page/ld-script';
import styles from './doc-page-content.module.scss';
import classNames from 'classnames';

const components = {
  '.code-group': CodeGroup,
  h2: HeadingLandmark,
  table: TableWrapper,
  '.doc-blockquote': Blockquote,
  '.ld-markup': LdScript,
};

export const DocPageContent = ({ label, content, mod }) => (
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
            content={content}
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
            <TableOfContents
              style={style}
              contentContainerSelector={`.${styles.mainDocContent}`}
            />
          )}
        </Sticky>
      </StickyContainer>
    </div>
  </div>
);
