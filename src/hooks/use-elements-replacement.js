import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

const textOnlySelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const useElementsReplacement = (
  { containerRef, components = {}, shouldMakeReplacement = true },
  deps = [],
) => {
  useLayoutEffect(() => {
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
          const isTextOnly = textOnlySelectors.includes(selector);
          const content = isTextOnly ? element.innerText : element.innerHTML;
          try {
            componentProps = JSON.parse(componentProps);
          } catch (e) {
            void e;
          }
          // Render with container replacement.
          const temp = document.createElement('div');
          ReactDOM.render(
            <Component
              mdBlockContent={!isTextOnly && content}
              labels={componentProps?.labels}
              lineNumbers={componentProps?.lineNumbers}
              noWrapper={selector === '.gatsby-highlight'}
            >
              {isTextOnly && content}
            </Component>,
            temp,
            () => {
              (element?.parentElement ?? element.parentNode).replaceChild(
                temp.children[0],
                element,
              );
            },
          );
        });
      });
    }
  }, deps);
};

export default useElementsReplacement;
