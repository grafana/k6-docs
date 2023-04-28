import Blockquote from 'components/shared/blockquote';
import React from 'react';

const BlockingAwsBlockquote = () => (
  <Blockquote
    mod="Attention"
    title="Performance considerations and recommended practices"
  >
    The APIs provided by this jslib operate synchronously, which means k6 must
    wait for operations that use the client classes to finish before proceeding
    with the rest of the script.
    <p>
      In some cases, such as downloading large files from S3, this could affect
      performance and test results. To minimize the impact on test performance,
      we recommend using these operations in the
      <span className="code-inline">setup</span> and{' '}
      <span className="code-inline">teardown</span>{' '}
      <a href="/using-k6/test-lifecycle/">lifecycle functions</a>. These
      functions run before and after the test run and thus do not influence test
      results.
    </p>
  </Blockquote>
);

export default BlockingAwsBlockquote;
