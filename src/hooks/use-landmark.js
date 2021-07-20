import { useState, useEffect } from 'react';
import { anchorify } from 'utils';

const useLandmark = ({ containerRef, markSelector }, deps = []) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (containerRef?.current) {
      // get all marks of a parent
      const allMarks = containerRef.current.querySelectorAll(markSelector);
      setLinks(
        Array.from(allMarks).map(({ id, innerText, tagName }) => ({
          title: innerText,
          anchor: `#${id || anchorify(innerText)}`,
          tagName,
        })),
      );
    }
  }, deps);
  return links;
};
export default useLandmark;
