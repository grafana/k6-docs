import Blockquote from 'components/shared/blockquote';
import React from 'react';

const ExperimentalBlockquote = () => (
  <Blockquote mod="attention" title="Experimental module">
    While we intend to keep experimental modules as stable as possible, we may
    need to introduce breaking changes. This could happen at future k6 releases
    until the module becomes fully stable and graduates as a k6 core module. For
    more information, refer to the{' '}
    <a href="https://k6.io/docs/extensions/explanations/extension-graduation/">
      extension graduation process
    </a>
    .
    <p>
      Experimental modules maintain a high level of stability and follow regular
      maintenance and security measures. Feel free to{' '}
      <a href="https://github.com/grafana/k6/issues">open an issue</a> if you
      have any feedback or suggestions.
    </p>
  </Blockquote>
);
export default ExperimentalBlockquote;
