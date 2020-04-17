import React from 'react';
import { storiesOf } from '@storybook/react';
import { ContactUsForm } from '.';

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
  .add('default', () => <ContactUsForm/>);
