import React from 'react';
import { storiesOf } from '@storybook/react';
import { Trait } from '.';

storiesOf('Trait', module)
  .add('default', () => (
    <Trait>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </Trait>
  ))
  .add('disadvantage', () => (
    <Trait disadvantage>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </Trait>
  ));
