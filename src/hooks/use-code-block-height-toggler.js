import { useEffect, useState } from 'react';

const useCodeBlockHeightToggler = ({
  ref,
  defaultHeight,
  maxHeight,
  isEnabled,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(defaultHeight);

  const toggleHandler = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    if (ref?.current && isEnabled) {
      const computedHeight = ref.current.offsetHeight;
      // add a little margin to maxHeight
      // to prevent showing toggler in blocks
      // which height is just about maxHeight,
      // therefore very little moving during toggle action
      if (computedHeight > maxHeight + 20) {
        setHeight(`${computedHeight}px`);
      }
    }
  }, [ref, isEnabled]);
  return { toggleHandler, isExpanded, height };
};

export default useCodeBlockHeightToggler;
