import { useState, useEffect } from 'react';

const useLandmark = ({ containerRef, markSelector }, deps = []) => {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (containerRef?.current) {
      // get all marks of a parent
      const allMarks = containerRef.current.querySelectorAll(markSelector);
      setLinks(
        Array.from(allMarks).map(({ id, innerText, tagName }) => ({
          title: innerText,
          anchor: `#${id}`,
          tagName,
        })),
      );
    }
  }, deps);
  return links;
};
export default useLandmark;
