import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

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
          const content = element.innerHTML;
          try {
            componentProps = JSON.parse(componentProps);
          } catch (e) {
            void e;
          }
          // Render with container replacement.
          const temp = document.createElement('div');
          ReactDOM.render(
            <Component
              mdBlockContent={content}
              labels={componentProps && componentProps.labels}
              lineNumbers={componentProps && componentProps.lineNumbers}
              mod={componentProps && componentProps.mod}
              noWrapper={selector === '.gatsby-highlight'}
            />,
            temp,
            () =>
              element.parentElement &&
              element.parentElement.replaceChild(temp.children[0], element),
          );
        });
      });
    }
    setReplaced(true);
  }, deps);
  return replaced;
};

export default useElementsReplacement;
