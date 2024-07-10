import Blockquote from 'components/shared/blockquote';
import React from 'react';

export const OutdatedBlockquote = () => (
  <div>
    <Blockquote mod="attention">
      <p>
        We&apos;ve migrated the k6 documentation to Grafana!{' '}
        <a
          className="link"
          href="https://k6.io/docs/javascript-api/k6-experimental/grpc/"
        >
          Click here
        </a>{' '}
        to view the latest version of the k6 documentation.
        <br />
        <br />
        The page is still available for users to be able to view the{' '}
        <a className="link" href="https://k6.io/docs/cloud/">
          k6 Cloud documentation
        </a>
        , and will be removed at a later date.
      </p>
    </Blockquote>
    <br />
  </div>
);
