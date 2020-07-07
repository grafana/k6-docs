import React, { useState } from 'react';
import { getRandomKey } from 'utils';
import styles from './code-group.module.scss';
import { WithCopyButton } from 'components/shared/with-copy-button';
import { Code } from 'components/shared/code';

const CodeGroup = ({
  mdBlockContent,
  labels = [],
  lineNumbers = [],
  noWrapper = false,
} = {}) => {
  let content = mdBlockContent;
  // handle case where md code has no wrapper
  if (noWrapper) {
    const auxWrapper = document.createElement('div');
    auxWrapper.classList.add('gatsby-highlight');
    auxWrapper.innerHTML = mdBlockContent;
    content = auxWrapper.outerHTML;
  }
  // tab related var
  const [currentIndex, setCurrentIndex] = useState(0);
  // creating content container for manipulations
  const tempElement = document.createElement('div');
  tempElement.innerHTML = content;
  // separating tabs chunks
  const codeGroups = [...tempElement.querySelectorAll('.gatsby-highlight')];
  // adjusting it to match initial structure and enable styling
  const modifiedGroups = codeGroups.map((group) => {
    const pre = group.getElementsByTagName('pre')[0];
    const code = pre.getElementsByTagName('code')[0];
    const lineNumbersRow = pre.querySelector('span.line-numbers-rows');
    const tempRow = document.createElement(null);
    tempRow.innerHTML = lineNumbersRow.outerHTML;
    code.appendChild(tempRow);
    lineNumbersRow.parentElement.removeChild(lineNumbersRow);
    return group;
  });
  // extracting code elements to ease access to code itself
  const codeElements = [...tempElement.getElementsByTagName('code')];
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
            <Code noLineNumbers={!lineNumbers[i]}>
              {modifiedGroups[i].outerHTML}
            </Code>
          </WithCopyButton>
        ))}
      </div>
    </div>
  );
};
export default CodeGroup;
