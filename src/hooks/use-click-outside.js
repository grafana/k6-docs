import { useEffect } from 'react';

const useClickOutside = (ref, handler, events) => {
  const _events = events || ['mousedown', 'touchstart'];

  const detectClickOutside = (event) =>
    !ref.current.contains(event.target) && handler();

  useEffect(() => {
    _events.forEach((event) =>
      document.addEventListener(event, detectClickOutside),
    );
    return () => {
      _events.forEach((event) =>
        document.removeEventListener(event, detectClickOutside),
      );
    };
  });
};

export default useClickOutside;
