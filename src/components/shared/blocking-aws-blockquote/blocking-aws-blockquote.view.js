import Blockquote from 'components/shared/blockquote';
import React from 'react';

const BlockingAwsBlockquote = () => (
  <Blockquote
    mod="Attention"
    title="Performance considerations and recommended practices"
  >
    In some cases, using this library&apos;s operations might impact
    performance and skew your test results. <br />
    <br />
    To ensure accurate results, consider executing these operations in the
    <span className="code-inline">setup</span> and{' '}
    <span className="code-inline">teardown</span>{' '}
    <a href="/docs/using-k6/test-lifecycle/">lifecycle functions</a>. These
    functions run before and after the test run and thus do not influence test
    results.
  </Blockquote>
);

export default BlockingAwsBlockquote;
