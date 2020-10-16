import classNames from 'classnames';
import { WithCopyButton } from 'components/shared/with-copy-button';
import Highlight, { defaultProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

import styles from './code.module.scss';

const Code = ({ children, showLineNumbers, isInitiallyExpanded }) => {
  if (!children) return null;
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState('100%');
  const containerRef = useRef(null);
  const toggleHandler = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (containerRef?.current) {
      const computedHeight = containerRef.current.offsetHeight;
      if (computedHeight > 420) {
        setHeight(computedHeight);
      }
    }
    if (!isInitiallyExpanded) {
      setIsExpanded(false);
    }
  }, [containerRef]);

  let toggler = null;
  if (height !== '100%') {
    toggler = (
      <button className={styles.toggler} type="button" onClick={toggleHandler}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    );
  }

  return (
    <WithCopyButton dataToCopy={children.props.children}>
      <Highlight
        {...defaultProps}
        code={children.props.children}
        language={children.props.className?.split('-')?.[1] ?? 'plain'}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(className, styles.code, styles.codeContainer)}
            ref={containerRef}
            style={{
              transition: 'max-height .2s ease',
              maxHeight: isExpanded ? height : '400px',
            }}
          >
            <code className={styles.code}>
              {tokens.map((line, i) => {
                if (line[0].empty) return null;
                return (
                  <div {...getLineProps({ line, key: i })} style={undefined}>
                    {showLineNumbers && (
                      <span className={styles.lineNumber}>{i + 1}</span>
                    )}
                    <span className={styles.lineContent}>
                      {line.map((token, key) => (
                        <span
                          {...getTokenProps({ token, key })}
                          style={undefined}
                        />
                      ))}
                    </span>
                  </div>
                );
              })}
            </code>
          </pre>
        )}
      </Highlight>
      {toggler}
    </WithCopyButton>
  );
};

Code.propTypes = {
  children: PropTypes.node,
  showLineNumbers: PropTypes.bool,
  isInitiallyExpanded: PropTypes.bool,
};

Code.defaultProps = {
  children: null,
  showLineNumbers: false,
  isInitiallyExpanded: false,
};

export default Code;
