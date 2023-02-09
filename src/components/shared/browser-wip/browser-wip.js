import { CodeInline } from 'components/shared/code';
import React from 'react';
import WIPIcon from 'svg/work-in-progress.inline.svg';

const BrowserWIP = () => (
  <p style={{ verticalAlign: 'middle' }}>
    <WIPIcon /> k6 browser is in <CodeInline>beta</CodeInline> - we are working
    to cover more Playwright APIs.
  </p>
);
export default BrowserWIP;
