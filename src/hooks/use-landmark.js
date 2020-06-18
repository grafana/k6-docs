import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HeadingLandmark } from 'components/shared/heading';
import { slugify } from 'utils';

const useLandmark = ({ containerSelector, markSelector }) => {
  console.log(containerSelector, markSelector);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    // get all marks of a parent
    const allMarks = document
      .querySelector(containerSelector)
      .querySelectorAll(markSelector);

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
