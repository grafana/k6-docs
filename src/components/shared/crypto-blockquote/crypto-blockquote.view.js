import Blockquote from 'components/shared/blockquote';
import React from 'react';

const CryptoBlockquote = () => (
  <Blockquote mod="info">
    <h4>A module with a better and standard API exists</h4>
    <p>
      The new{' '}
      <a href="https://k6.io/docs/javascript-api/k6-experimental/webcrypto/">
        k6/experimental/webcrypto API
      </a>{' '}
      partially implements the{' '}
      <a href="https://www.w3.org/TR/WebCryptoAPI/">WebCryptoAPI</a>, supporting
      more features than{' '}
      <a href="https://k6.io/docs/javascript-api/k6-crypto/">k6/crypto</a>.
    </p>
  </Blockquote>
);

export default CryptoBlockquote;
