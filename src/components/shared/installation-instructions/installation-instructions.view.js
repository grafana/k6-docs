/* eslint-disable max-len */
import Blockquote from 'components/shared/blockquote';
import { Code } from 'components/shared/code';
import React from 'react';

const InstallationInstructions = ({ extensionUrl }) => (
  <>
    <p>
      To build a k6 binary with the extension, first, ensure you have installed{' '}
      <a href="https://golang.org/doc/install">Go</a> and{' '}
      <a href="https://git-scm.com/">Git</a>; the following steps are:
    </p>
    <Code>
      <pre className="language-bash">
        {`# Install xk6\ngo install go.k6.io/xk6/cmd/xk6@latest\n\n# Build the k6 binary\nxk6 build --with ${extensionUrl}\n\n... [INFO] Build environment ready\n... [INFO] Building k6\n... [INFO] Build complete: ./k6`}
      </pre>
    </Code>
    <p>xk6 will create the k6 binary in the local folder.</p>
    <Blockquote>
      <p>
        To learn more about how to build custom k6 versions, check out{' '}
        <a href="https://github.com/grafana/xk6">xk6</a>.
      </p>
    </Blockquote>
  </>
);
export default InstallationInstructions;
