import React from 'react';

const LdScript = ({ mdBlockContent }) => {
  return (
    <script type={'application/ld+json'}>{JSON.parse(mdBlockContent)}</script>
  );
};

export default LdScript;
