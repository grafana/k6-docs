import { useEffect } from 'react';

const useClickOutside = (ref, handler, ev) => {
  const events = ev || ['mousedown', 'touchstart'];

  const detectClickOutside = (event) =>
    !ref.current.contains(event.target) && handler();

  useEffect(() => {
    events.forEach((event) =>
      document.addEventListener(event, detectClickOutside),
    );
    return () => {
      events.forEach((event) =>
        document.removeEventListener(event, detectClickOutside),
      );
    };
  });
};

export default useClickOutside;
