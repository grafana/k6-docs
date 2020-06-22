import React, { useEffect } from 'react';

const LdScript = ({ script }) => {
  useEffect(() => {
    const scriptTemp = document.createElement('script');
    scriptTemp.type = 'application/ld+json';
    scriptTemp.innerHTML = script;
    document.body.appendChild(scriptTemp);

    return () => {
      document.body.removeChild(scriptTemp);
    };
  }, []);
  return <p />;
};

export default LdScript;
