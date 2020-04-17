import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextField } from '.';


storiesOf('TextField', module)
  .add('Default', () => (
    <TextField/>
  ))
  .add('As tag "textarea"', () => (
    <TextField tag={'textarea'}/>
  ))
  .add('Invalid', () => (
    <TextField isInvalid/>
  ));
