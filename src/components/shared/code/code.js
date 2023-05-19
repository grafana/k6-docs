import classNames from 'classnames';
import { WithCopyButton } from 'components/shared/with-copy-button';
import { useCodeBlockHeightToggler } from 'hooks';
import Highlight, { defaultProps } from 'prism-react-renderer';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

import styles from './code.module.scss';

const SUPPORTED_LANGS = [
  'bash',
  'javascript',
  'json',
  'yaml',
  'markup',
  'go',
  'plain',
  'diff',
];
const DEFAULT_HEIGHT = `100%`;
const MAX_HEIGHT = 400;

const getLanguageDeclaration = (str) => {
  if (!str) return 'plain';
  const lang = str.split('-')[1];
  if (SUPPORTED_LANGS.includes(lang)) {
    return lang;
  }
  return 'plain';
};

const Code = ({
  children,
  showLineNumbers,
  showHeightToggler,
  showCopyButton,
}) => {
  if (!children) return null;

  const containerRef = useRef(null);

  const { toggleHandler, height, isExpanded } = useCodeBlockHeightToggler({
    ref: containerRef,
    defaultHeight: DEFAULT_HEIGHT,
    maxHeight: MAX_HEIGHT,
    isEnabled: showHeightToggler,
  });

  let toggler = null;
  let containerStyles = {};
  let overlayStyles = { height: 0 };
  // if `height` isn't equal default height,
  // code blocks fits the height requirements
  // for toggler to be shown
  if (height !== DEFAULT_HEIGHT) {
    toggler = (
      <button className={styles.toggler} type="button" onClick={toggleHandler}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    );
    containerStyles = {
      maxHeight: isExpanded ? height : `${MAX_HEIGHT}px`,
      overflowY: 'hidden',
    };
    overlayStyles = {
      height: isExpanded ? 0 : undefined,
    };
  }

  const declaredLang = getLanguageDeclaration(children.props?.className);
  let copyBtnContent =
    children.props?.children ?? 'Sorry, nothing to copy here';

  if (declaredLang === 'bash') {
    copyBtnContent = copyBtnContent.replace(/^\$\s/gm, '');
  }

  const Wrapper = ({ children }) => (
    <>
      {showCopyButton && (
        <WithCopyButton dataToCopy={copyBtnContent}>{children}</WithCopyButton>
      )}
      {!showCopyButton && children}
    </>
  );

  return (
    <Wrapper>
      <Highlight
        {...defaultProps}
        code={children.props?.children}
        language={declaredLang}
      >
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(className, styles.code, styles.codeContainer)}
            ref={containerRef}
            style={containerStyles}
          >
            <code className={styles.code}>
              {tokens.map((line, i) => {
                // remove last empty line that gets addded by default
                if (i + 1 === tokens.length && line[0].empty) return null;
                return (
                  <div {...getLineProps({ line, key: i })} style={undefined}>
                    {showLineNumbers && (
                      <span className={styles.lineNumber}>{i + 1}</span>
                    )}
                    <span className={styles.lineContent}>
                      {line.map((token, key) => (
                        <span
                          {...getTokenProps({
                            token,
                            key,
                          })}
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
      <div className={styles.overlay} style={overlayStyles} />
      {toggler}
    </Wrapper>
  );
};

Code.propTypes = {
  children: PropTypes.node,
  showLineNumbers: PropTypes.bool,
  showHeightToggler: PropTypes.bool,
  showCopyButton: PropTypes.bool,
};

Code.defaultProps = {
  children: null,
  showLineNumbers: false,
  showHeightToggler: false,
  showCopyButton: true,
};

export default Code;
