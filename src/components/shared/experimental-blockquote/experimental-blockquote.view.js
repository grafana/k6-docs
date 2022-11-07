import Blockquote from 'components/shared/blockquote';
import React from 'react';

const ExperimentalBlockquote = () => (
  <Blockquote mod="attention" title="Experimental module, use at your own risk">
    While we intend to keep this module as simple and stable as possible, we may
    need to add features or introduce breaking changes. This could happen at any
    time until we release this module as stable.
    <p>
      Feel free to [provide user feedback](https://community.k6.io/), and [open
      an issue](https://github.com/grafana/k6/issues) or pull request if you
      have any suggestions.
    </p>
  </Blockquote>
);
export default ExperimentalBlockquote;
