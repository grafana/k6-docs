import React from 'react';
import { storiesOf } from '@storybook/react';
import { Code } from '.';

const codeSample = `\
import http from "k6/http";
export default function() {
   let res = http.get("https://test.k6.io/");
   check(res, {
      "is status 200": (r) => r.status === 200
   });
};
`;

storiesOf('Code', module)
  .add('default', () => (
    <Code language={'javascript'}>{codeSample}</Code>
  ));
