import Blockquote from 'components/shared/blockquote';
import React from 'react';

const WsBlockquote = () => (
  <Blockquote mod="info">
    <h4>A module with a better and standard API exists</h4>
    <p>
      The new{' '}
      <a href="https://k6.io/docs/javascript-api/k6-experimental/websockets/">
        k6/experimental/websockets API
      </a>{' '}
      partially implements the{' '}
      <a href="https://websockets.spec.whatwg.org/">
        WebSockets API living standard
      </a>
      .
    </p>
    <p>
      When possible, we recommend using the new API. It uses a global event loop
      for consistency with other k6 APIs and better performance.
    </p>
  </Blockquote>
);

export default WsBlockquote;
