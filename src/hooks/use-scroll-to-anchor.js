import { useState, useEffect } from 'react';
import { whenElementAvailable } from 'utils';

const useScrollToAnchor = () => {
  const [scrollMark, setScrollMark] = useState(null);

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    // eslint-disable-next-line no-restricted-globals
    setScrollMark(location.hash);

    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)((el) =>
        // no smooth scroll needed
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 25,
        }),
      );
    }
  }, [scrollMark]);
};

export default useScrollToAnchor;
