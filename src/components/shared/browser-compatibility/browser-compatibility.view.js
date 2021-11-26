import Blockquote from 'components/shared/blockquote';
import { Link } from 'gatsby';
import React from 'react';

const BrowserCompatibility = () => (
  <Blockquote>
    <p>
      {' '}
      <strong>⚠️ Compatibility</strong>
    </p>
    <p>
      The <Link to="/javascript-api/xk6-browser/">xk6-browser API</Link> aims
      for rough compatibility with the{' '}
      <a href="https://playwright.dev/docs/api/class-playwright">
        Playwright API for NodeJS
      </a>
      .
    </p>
    <p>
      Because k6 does not run in NodeJS, the xk6-browser API will slightly
      differ from its Playwright counterpart.
    </p>
    <p>Note that k6 APIs are synchronous.</p>
  </Blockquote>
);
export default BrowserCompatibility;
