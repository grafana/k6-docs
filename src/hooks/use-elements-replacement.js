import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const textOnlySelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const useElementsReplacement = (
  { containerRef, components = {}, shouldMakeReplacement = true },
  deps = [],
) => {
  const [replaced, setReplaced] = useState(false);
  useEffect(() => {
    if (
      Object.keys(components).length &&
      containerRef?.current &&
      shouldMakeReplacement
    ) {
      Object.keys(components).forEach((selector) => {
        const Component = components[selector];
        // limiting the scope of manipulation to a parent element
        const container = containerRef.current;
        container.querySelectorAll(selector).forEach((element) => {
          let { props: componentProps = {} } = element.dataset;
          const content = textOnlySelectors.includes(selector)
            ? element.innerText
            : element.innerHTML;
          try {
            componentProps = JSON.parse(componentProps);
          } catch (e) {
            void e;
          }
          const tag = element.tagName.toLowerCase();
          // Render with container replacement.
          const temp = document.createElement('div');
          ReactDOM.render(
            <Component
              mdBlockContent={content}
              {...componentProps}
              tag={textOnlySelectors.includes(selector) ? tag : undefined}
              noWrapper={selector === '.gatsby-highlight'}
            />,
            temp,
            () =>
              (element?.parentElement ?? element.parentNode).replaceChild(
                temp.children[0],
                element,
              ),
          );
        });
      });
    }
    setReplaced(true);
  }, deps);
  return replaced;
};

export default useElementsReplacement;
