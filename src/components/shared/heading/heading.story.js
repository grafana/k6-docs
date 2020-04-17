import React from 'react';
import { storiesOf } from '@storybook/react';
import { Heading } from '.';


storiesOf('Heading', module)
  .add('Default size', () => (
    <Heading>TT Norms pro, 30px/40px, regular, #3C3C64</Heading>
  ))
  .add('Size "md"', () => (
    <Heading tag={'h2'} size={'md'}>TT Norms pro, 25px/35px, regular, #5A5C87</Heading>
  ))
  .add('Size "sm"', () => (
    <Heading tag={'h3'} size={'sm'}>TT Norms pro, 20px/25px, regular, #5A5C87</Heading>
  ));
