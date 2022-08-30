import classNames from 'classnames/bind';
import React, { Fragment } from 'react';
import { slugify } from 'utils';

import styles from './description-list.module.scss';
import AnchorIcon from './svg/anchor.inline.svg';

const cx = classNames.bind(styles);

// local constants
const termDelimeterRegEx = /\n/;
const listDelimeterRegEx = /\n:/;
const termDelimeterVariations = ['\n', '\n ', ' \n'];
const listDelimeterVatiations = ['\n:', ' \n:', '\n: '];
// local helpers
const checkStrNonEmpty = (str) => str && str.trim().length > 0;
const getPlainText = (arr) =>
  arr.reduce((acc, cur) => acc.concat(cur.props?.children ?? cur), '');

const buildRenderContent = ({ delimeterRegEx, delimeterVariations }, jsx) => {
  // 1. Content is a plain string
  // just split it using list delimeter
  if (typeof jsx === 'string') {
    return jsx.split(delimeterRegEx);
  }
  // 2. If compound content
  // init content store
  const store = [];
  // init pointer
  let pointer = 0;
  // init loop
  jsx.forEach((item) => {
    // make sure nested store is initialized
    store[pointer] = store[pointer] || [];
    if (typeof item === 'string') {
      if (delimeterRegEx.test(item)) {
        if (delimeterVariations.includes(item)) {
          pointer += 1;
        } else {
          const [end, target, start] = item.split(delimeterRegEx);
          if (checkStrNonEmpty(end)) {
            store[pointer].push(end);
            pointer += 1;
          }
          if (checkStrNonEmpty(target)) {
            pointer += 1;
            store[pointer] = [target];
          }
          if (checkStrNonEmpty(start)) {
            pointer += 1;
            store[pointer] = [start];
          }
        }
      } else {
        store[pointer].push(item);
      }
    } else {
      store[pointer].push(item);
    }
  });
  return store;
};

const DescriptionList = ({ children }) => {
  let content = children;
  if (!Array.isArray(children)) {
    content = [children];
  }
  return (
    <dl className={cx('wrapper')}>
      {content.map(({ props: { children } }, idx) => {
        const [term, ...descriptions] = buildRenderContent(
          {
            delimeterRegEx: listDelimeterRegEx,
            delimeterVariations: listDelimeterVatiations,
          },
          children,
        );
        const terms = buildRenderContent(
          {
            delimeterRegEx: termDelimeterRegEx,
            delimeterVariations: termDelimeterVariations,
          },
          term,
        );
        const termTextContent = Array.isArray(term) ? getPlainText(term) : term;
        return (
          <Fragment key={idx}>
            {terms.map((term, termIdx) => {
              const anchorMold = slugify(termTextContent);
              return (
                <dt id={!termIdx ? anchorMold : termIdx}>
                  {term}
                  {!termIdx && (
                    <a className={cx('anchor-icon')} href={`#${anchorMold}`}>
                      <AnchorIcon />
                    </a>
                  )}
                </dt>
              );
            })}
            {descriptions.map((description, index) => (
              <dd key={index}>{description}</dd>
            ))}
          </Fragment>
        );
      })}
    </dl>
  );
};

export default DescriptionList;
