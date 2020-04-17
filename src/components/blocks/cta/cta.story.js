import React from 'react';
import { storiesOf } from '@storybook/react';
import { CTA } from '.';

const CenterDecorator = (storyFn) => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {storyFn()}
  </div>
);

storiesOf('Contact Us Form', module)
  .addDecorator(CenterDecorator)
  .add('default', () => (
    <CTA
      title={'Want to work with k6?'}
      description={
        'Some custom Lorum Ipsum that no one will notice in a thousand year.'
      }
      buttonText={'Push here'}
      buttonUrl={'/'}
    />
  ));
