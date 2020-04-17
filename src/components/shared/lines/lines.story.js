import React from 'react';
import { storiesOf } from '@storybook/react';
import { Lines } from '.';


storiesOf('Lines', module)
  .add('Image number 1', () => (
    <Lines imageNumber={1}/>
  ))
  .add('Image number 2', () => (
    <Lines imageNumber={2}/>
  ))
  .add('Image number 3', () => (
    <Lines imageNumber={3}/>
  ))
  .add('Image number 4', () => (
    <Lines imageNumber={4}/>
  ))
  .add('Image number 5', () => (
    <Lines imageNumber={5}/>
  ))
  .add('Image number 6', () => (
    <Lines imageNumber={6}/>
  ))
  .add('Image number 7', () => (
    <Lines imageNumber={7}/>
  ));
