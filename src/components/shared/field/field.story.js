import React from 'react';
import { storiesOf } from '@storybook/react';
import { Field } from '.';


storiesOf('Field', module)
  .add('Default', () => (
    <Field id={'name'} label={'Your name'}/>
  ))
  .add('As tag "textarea"', () => (
    <Field id={'name'} label={'Your name'} tag={'textarea'}/>
  ))
  .add('Invalid', () => (
    <Field id={'name'} label={'Your name'} isInvalid/>
  ));
