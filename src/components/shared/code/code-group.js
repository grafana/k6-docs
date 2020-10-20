import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { getRandomKey } from 'utils';

import Code from './code';
import styles from './code-group.module.scss';

const CodeGroup = ({ children, labels, lineNumbers, heightTogglers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const randomKey = getRandomKey();
  return (
    <div className={styles.wrapper}>
      {labels && labels.length ? (
        <div className={styles.header}>
          {labels.map((label, i) => (
            <div
              key={`lb-${i}`}
              className={`${styles.codeTab} ${
                i === currentIndex ? styles.codeTab_active : ''
              }`}
              onClick={() => setCurrentIndex(i)}
              onKeyPress={() => setCurrentIndex(i)}
              role={'button'}
              tabIndex={i}
            >
              {label}
            </div>
          ))}
        </div>
      ) : null}
      <style>
        {`.${styles.itemsContainer}.${randomKey} > div:nth-child(${
          currentIndex + 1
        }) { display: block; }`}
      </style>
      <div className={`${styles.itemsContainer} ${randomKey}`}>
        {React.Children.map(children, (child, i) => (
          <Code
            showLineNumbers={lineNumbers[i]}
            key={i}
            showHeightToggler={heightTogglers[i]}
          >
            {child.props.children}
          </Code>
        ))}
      </div>
    </div>
  );
};

CodeGroup.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.arrayOf(PropTypes.string),
  lineNumbers: PropTypes.arrayOf(PropTypes.bool),
  heightTogglers: PropTypes.arrayOf(PropTypes.bool),
};

CodeGroup.defaultProps = {
  children: null,
  labels: [],
  lineNumbers: [],
  heightTogglers: [],
};

export default CodeGroup;
