import classNames from 'classnames';
import { HtmlContent } from 'components/blocks/html-content';
import Glossary from 'components/pages/doc-page/glossary';
import TableOfContents from 'components/pages/doc-page/table-of-contents';
import Blockquote from 'components/shared/blockquote';
import BrowserClassList from 'components/shared/browser-class-list';
import BrowserCompatibility from 'components/shared/browser-compatibility';
import BrowserWIP from 'components/shared/browser-wip';
import { Code, CodeInline, CodeGroup } from 'components/shared/code';
import Collapsible from 'components/shared/collapsible';
import { HeadingLandmark } from 'components/shared/heading';
import InstallationInstructions from 'components/shared/installation-instructions';
import LdScript from 'components/shared/ld-script';
import { Link } from 'components/shared/link';
import TableWithNestedRows from 'components/shared/table-with-nested-rows';
import TableWrapper from 'components/shared/table-wrapper';
import Tooltip, { BNIT, BWIPT } from 'components/shared/tooltip';
import React, { useRef } from 'react';

import styles from './doc-page-content.module.scss';

const componentsForNativeReplacement = {
  h2: HeadingLandmark('h2'),
  h3: HeadingLandmark('h3'),
  table: TableWrapper,
  TableWithNestedRows,
  blockquote: Blockquote,
  Blockquote,
  LdScript,
  Glossary,
  inlineCode: CodeInline,
  pre: Code,
  CodeGroup,
  Collapsible,
  CodeInline,
  BrowserCompatibility,
  BrowserClassList,
  BrowserWIP,
  InstallationInstructions,
  Tooltip,
  BNIT,
  BWIPT,
};

export const DocPageContent = ({
  label,
  content,
  mod,
  version,
  hasGithubLink,
}) => {
  const contentContainerRef = useRef(null);

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.beliefs]: mod === 'beliefs',
      })}
    >
      <div className={`${styles.inner}`}>
        <div
          ref={contentContainerRef}
          className={classNames(styles.mainDocContent, {
            [styles.beliefs]: mod === 'beliefs',
          })}
        >
          <HtmlContent
            content={content}
            componentsForNativeReplacement={{
              ...componentsForNativeReplacement,
              a: Link(version),
            }}
            className={classNames(
              styles.contentWrapper,
              { [styles.beliefs]: mod === 'beliefs' },
              label,
            )}
          />
        </div>
        <TableOfContents
          contentContainerRef={contentContainerRef}
          withTopOffset={hasGithubLink}
        />
      </div>
    </div>
  );
};
