import classNames from 'classnames';
import { WithCopyButton } from 'components/shared/with-copy-button';
import Highlight, { defaultProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './code.module.scss';

const Code = ({ children, showLineNumbers }) => {
  if (!children) return null;

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
    </WithCopyButton>
  );
};

Code.propTypes = {
  children: PropTypes.node,
  showLineNumbers: PropTypes.bool,
};

Code.defaultProps = {
  children: null,
  showLineNumbers: false,
};

export default Code;
