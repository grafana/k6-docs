import { useState, useEffect } from 'react';
import { slugify } from 'utils';

const useLandmark = ({ containerRef, markSelector }, deps = []) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (containerRef?.current) {
      // get all marks of a parent
      const allMarks = containerRef.current.querySelectorAll(markSelector);
      setLinks(
        Array.from(allMarks).map(({ id, innerText }) => ({
          title: innerText,
          anchor: `#${
            id ||
            slugify(innerText)
              .replace(/\//g, '-')
              .replace(/^\d+/g, '')
              .replace(/^-*/g, '')
              .replace(/-*$/g, '')
          }`,
        })),
      );
    }
  }, deps);
  return links;
};
export default useLandmark;
