import Blockquote from 'components/shared/blockquote';
import React from 'react';

const GrpcBlockquote = () => (
  <Blockquote mod="info">
    <h4>A module with streaming support exists</h4>
    <p>
      The new{' '}
      <a href="https://k6.io/docs/javascript-api/k6-experimental/grpc/">
        k6/experimental/grpc
      </a>{' '}
      module extends{' '}
      <a href="https://k6.io/docs/javascript-api/k6-net-grpc/">k6/net/grpc</a>{' '}
      to support{' '}
      <a href="https://k6.io/docs/javascript-api/k6-experimental/grpc/stream/">
        gRPC streaming
      </a>
      . We recommend using the new module.
    </p>
  </Blockquote>
);

export default GrpcBlockquote;
