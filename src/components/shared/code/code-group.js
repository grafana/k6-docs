import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Code from './code';
import styles from './code-group.module.scss';

const CodeGroup = ({
  children,
  labels,
  lineNumbers,
  heightTogglers,
  showCopyButton,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {labels.map((label, i) => (
          <div
            key={`lb-${i}`}
            className={`${styles.codeTab} ${
              i === currentIndex ? styles.active : ''
            }`}
            tabIndex={'0'}
            role={'button'}
            onClick={() => setCurrentIndex(i)}
            onKeyDown={() => setCurrentIndex(i)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className={`${styles.itemsContainer}`}>
        {React.Children.map(children, (child, i) =>
          i === currentIndex ? (
            <Code
              showLineNumbers={lineNumbers[i]}
              key={i}
              showHeightToggler={heightTogglers[i]}
              showCopyButton={showCopyButton[i]}
            >
              {child.props.children}
            </Code>
          ) : null,
        )}
      </div>
    </div>
  );
};

CodeGroup.propTypes = {
  children: PropTypes.node,
  labels: PropTypes.arrayOf(PropTypes.string),
  lineNumbers: PropTypes.arrayOf(PropTypes.bool),
  heightTogglers: PropTypes.arrayOf(PropTypes.bool),
  showCopyButton: PropTypes.arrayOf(PropTypes.bool),
};

CodeGroup.defaultProps = {
  children: null,
  labels: [],
  lineNumbers: [],
  heightTogglers: [],
  showCopyButton: [],
};

export default CodeGroup;
