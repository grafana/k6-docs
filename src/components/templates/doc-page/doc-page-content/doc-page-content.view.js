import React, { useRef } from 'react';
import { HtmlContent } from 'components/blocks/html-content';
import { StickyContainer, Sticky } from 'react-sticky';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import { CodeGroup } from 'components/shared/code-group';
import TableWrapper from 'components/shared/table-wrapper';
import { HeadingLandmark } from 'components/shared/heading';
import Blockquote from 'components/shared/blockquote';
import LdScript from 'components/shared/ld-script';

import styles from './doc-page-content.module.scss';
import classNames from 'classnames';

const componentsForNativeReplacement = {
  h2: HeadingLandmark('h2'),
  h3: HeadingLandmark('h3'),
  table: TableWrapper,
  blockquote: Blockquote,
  Blockquote,
  LdScript,
};

const componentsForCustomReplacement = {
  // order is important!
  '.code-group': CodeGroup,
  '.gatsby-highlight': CodeGroup,
};

export const DocPageContent = ({ label, content, mod }) => {
  const contentContainerRef = useRef(null);
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.wrapper_beliefs]: mod === 'beliefs',
      })}
    >
      <div className={`${styles.inner}`}>
        <StickyContainer>
          <div
            ref={contentContainerRef}
            className={classNames(styles.mainDocContent, {
              [styles.mainDocContent_beliefs]: mod === 'beliefs',
            })}
          >
            <HtmlContent
              content={content}
              componentsForCustomReplacement={componentsForCustomReplacement}
              componentsForNativeReplacement={componentsForNativeReplacement}
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
                contentContainerRef={contentContainerRef}
              />
            )}
          </Sticky>
        </StickyContainer>
      </div>
    </div>
  );
};
