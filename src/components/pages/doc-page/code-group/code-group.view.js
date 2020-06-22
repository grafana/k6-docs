import * as React from 'react';
import { getRandomKey } from 'utils';
import styles from './code-group.module.scss';
import { WithCopyButton } from 'components/shared/with-copy-button';
import { Code } from 'components/shared/code';

const CodeGroup = ({ mdBlockContent, labels, lineNumbers = {} } = {}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const tempElement = document.createElement('div');
  tempElement.innerHTML = mdBlockContent;
  const codeElements = [...tempElement.getElementsByTagName('code')];

  const getLanguage = (codeElement) =>
    codeElement.className.match(/language-([a-z-]+)/)[1];
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
              tabIndex={'0'}
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
        {codeElements.map((codeElement, i) => (
          <WithCopyButton dataToCopy={codeElement.innerText} key={`cb-${i}`}>
            <Code
              language={getLanguage(codeElement)}
              noLineNumbers={!lineNumbers[i]}
            >
              {codeElement.innerText}
            </Code>
          </WithCopyButton>
        ))}
      </div>
    </div>
  );
};
export default CodeGroup;
