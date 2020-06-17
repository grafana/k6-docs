import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HeadingLandmark } from 'components/shared/heading';
import { slugify } from 'utils';

const useLandmark = ({
  containerSelector,
  markSelector,
  component = HeadingLandmark,
}) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const Component = component;
    // get all marks of a parent
    const allMarks = document
      .querySelector(containerSelector)
      .querySelectorAll(markSelector);
    allMarks.forEach((element) => {
      const compContent = element.innerHTML;
      // Render with container replacement.
      const temp = document.createElement('div');
      ReactDOM.render(<Component mdBlockContent={compContent} />, temp, () =>
        element.parentElement.replaceChild(temp.children[0], element),
      );
    });
    setLinks(
      Array.from(allMarks).map(({ innerHTML }) => ({
        title: innerHTML,
        anchor: `#${slugify(innerHTML)
          .replace(/\//g, '-')
          .replace(/^\d+/g, '')
          .replace(/^-*/g, '')
          .replace(/-*$/g, '')}`,
      })),
    );
  }, []);
  return { links };
};
export default useLandmark;
