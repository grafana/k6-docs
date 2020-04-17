import React from 'react';
import { storiesOf } from '@storybook/react';
import { CheckboxField } from '.';
import { Link } from 'gatsby';

storiesOf('CheckboxField', module)
  .add('default', () => (
    <CheckboxField>
      Yes, I&apos;d like to receive more information on k6 products, events and promotions via email.
      Refer to k6’s <Link to={'privacy-policy'} className={'link'}>Privacy Policy</Link>
    </CheckboxField>
  ))
  .add('checked', () => (
    <CheckboxField checked>
      Yes, I&apos;d like to receive more information on k6 products, events and promotions via email.
      Refer to k6’s <Link to={'privacy-policy'} className={'link'}>Privacy Policy</Link>
    </CheckboxField>
  ));
