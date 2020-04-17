import * as React from 'react';

import { highlightCodeInRef } from './code.utils';
import styles from './code.module.scss';

export const Code = (props) => {
  const { children, language, className, noLineNumbers } = props;
  const ref = React.useRef(null);

  highlightCodeInRef(ref, [children]);

  // TODO: Replace with Prism.highlight, it will fix flashing
  // Today's problem: line-numbers don't appear if use Prism.highlight.
  //
  // const html = Prism.highlight(children, Prism.languages[language], language)
  // Then <code dangerouslySetInnerHtml={{ __html: html }}/>

  return (
    <div
      className={`${styles.code} ${styles.codeContainer} ${className} ${
        noLineNumbers ? styles.noLineNumbers : ''
      }`}
      ref={ref}
    >
      <pre
        className={`language-${language} ${
          noLineNumbers ? '' : 'line-numbers'
        }`}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
};
