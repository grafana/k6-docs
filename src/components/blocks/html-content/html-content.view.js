import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import { whenElementAvailable } from 'utils';
import styles from './html-content.module.scss';
import './html-content.scss';

export const HtmlContent = props => {
  const { content, className, components } = props;
  useEffect(() => {
    if (components) {
      const container = document.querySelector(`.${styles.wrapper}`);
      Object.keys(components).forEach(selector => {
        const Component = components[selector];
        // limiting the scope of manpulation to a parent element
        container.querySelectorAll(selector).forEach(element => {
          let { props: componentProps = {} } = element.dataset;
          const compContent = element.innerHTML;
          try {
            componentProps = JSON.parse(componentProps);
          } catch (e) {
            console.warn(e);
          }
          // Render with container replacement.
          const temp = document.createElement('div');
          ReactDOM.render(
            <Component
              mdBlockContent={compContent}
              className={className}
              {...componentProps}
            />,
            temp,
            () =>
              element.parentElement &&
              element.parentElement.replaceChild(temp.children[0], element),
          );
        });
      });
    }
  }, []);

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    const scrollMark = location.hash;
    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)(el =>
        // no smooth scroll needed
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 25,
        }),
      );
    }
  }, []);

  return (
    // eslint-disable-next-line react/no-danger
    <div
      className={`${styles.wrapper} ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

HtmlContent.defaultProps = {
  highlightCode: true,
};
