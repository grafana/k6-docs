import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Heading } from 'components/shared/heading';
import { slugify } from 'utils';
import docPageContent from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import AnchorIcon from 'components/templates/doc-page/doc-page-content/svg/anchor.inline.svg';

// auxillary component that will replace default ones
const markHeadingComponent = ({ content }) => (
  <Heading
    className={docPageContent.markHeading}
    id={`${slugify(content).replace(/\//g, '-')}`}
    tag={'h2'}
    size={'lg'}
  >
    <a href={`#${slugify(content).replace(/\//g, '-')}`}>
      <AnchorIcon />
    </a>
    {content}
  </Heading>
);

const useLandmark = ({ selector, component = markHeadingComponent }) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const Component = component;
    // get all h2 headings of a parent
    const allHeadingMarks = document
      .querySelector(`.${selector}`)
      .querySelectorAll('h2');
    allHeadingMarks.forEach(element => {
      const compContent = element.innerHTML;
      // Render with container replacement.
      const temp = document.createElement('div');
      ReactDOM.render(<Component content={compContent} />, temp, () =>
        element.parentElement.replaceChild(temp.children[0], element),
      );
    });
    setLinks(
      Array.from(allHeadingMarks).map(({ innerHTML }) => ({
        title: innerHTML,
        anchor: `#${slugify(innerHTML).replace(/\//g, '-')}`,
      })),
    );
  }, []);
  return { links };
};
export default useLandmark;
