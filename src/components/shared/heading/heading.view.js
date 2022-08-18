import classNames from 'classnames';
import React from 'react';
import { anchorify } from 'utils';

import styles from './heading.module.scss';
import AnchorIcon from './svg/anchor.inline.svg';

export const Heading = ({ className, id, tag = 'h1', size, children }) => {
  const wrapperClassName = classNames(
    styles.wrapper,
    { [styles.wrapper_size_lg]: size === 'lg' },
    { [styles.wrapper_size_md]: size === 'md' },
    { [styles.wrapper_size_sm]: size === 'sm' },
    { [styles.wrapper_size_xs]: size === 'xs' },
    className,
  );

  return React.createElement(
    tag,
    { className: wrapperClassName, id },
    children,
  );
};

const getPlainText = (arr) =>
  arr.reduce((acc, cur) => acc.concat(cur.props?.children ?? cur), '');

const mayBeGetCustomAnchor = (str) => {
  const match = str.match(/\{#?.*?\}/);
  if (!match) return null;
  return [match[0], match.index];
};

const stripCustomAnchorSyntax = (str) => str.replace(/^\{#?(.*?)\}/, '$1');

export const HeadingLandmark =
  (Tag) =>
  ({ children }) => {
    const textContent = Array.isArray(children)
      ? getPlainText(children)
      : children;
    // try to get custom anchor
    const [customAnchor, customAnchorMatchIndex] =
      mayBeGetCustomAnchor(textContent) ?? [];
    let anchorMold = textContent;
    let renderContent = children;
    // if custom anchor is there,
    // remove it from the UI
    if (customAnchor) {
      // handle plaing string heading
      if (typeof children === 'string') {
        renderContent = renderContent.slice(0, customAnchorMatchIndex);
      } else {
        // handle compound heading
        renderContent = renderContent.map((item) =>
          typeof item === 'string' ? item.replace(customAnchor, '') : item,
        );
      }
      anchorMold = stripCustomAnchorSyntax(customAnchor);
    }
    const anchor = `${anchorify(anchorMold)}`;
    return (
      <Tag className={styles.markHeading} id={anchor}>
        {renderContent}
        <a className={'anchor-icon'} href={`#${anchor}`}>
          <AnchorIcon />
        </a>
      </Tag>
    );
  };
