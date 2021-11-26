import Blockquote from 'components/shared/blockquote';
import { Link } from 'gatsby';
import React from 'react';

const BrowserCompatibility = () => (
  <Blockquote>
    <p>
      <Link to="/javascript-api/k6-x-browser/">xk6-browser</Link> aims for rough
      compatibility with the{' '}
      <a href="https://playwright.dev/docs/api/class-playwright">
        Playwright API for NodeJS
      </a>
      .
    </p>
    <p>Note that k6 APIs are synchronous.</p>
  </Blockquote>
);
export default BrowserCompatibility;
