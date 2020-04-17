import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '.';

storiesOf('Button/Default theme', module)
  .add('Default size', () => <Button cursor>Use Open Source</Button>)
  .add('Size "lg"', () => (
    <Button size={'lg'} cursor>
      Use Open Source
    </Button>
  ))
  .add('Size "sm"', () => <Button size={'sm'}>Sign Up</Button>);

storiesOf('Button/Theme "additional"', module)
  .add('Default size', () => (
    <Button theme={'additional'} cursor>
      Use Open Source
    </Button>
  ))
  .add('Size "lg"', () => (
    <Button size={'lg'} theme={'additional'} cursor>
      Use Open Source
    </Button>
  ))
  .add('Size "sm"', () => (
    <Button size={'sm'} theme={'additional'}>
      Sign Up
    </Button>
  ));

storiesOf('Button/Theme "gradient-primary"', module)
  .add('Default size', () => (
    <Button theme={'gradient-primary'} cursor>
      Buy now
    </Button>
  ))
  .add('Size "lg"', () => (
    <Button size={'lg'} theme={'gradient-primary'} cursor>
      Buy now
    </Button>
  ))
  .add('Size "sm"', () => (
    <Button size={'sm'} theme={'gradient-primary'} cursor>
      Buy now
    </Button>
  ))
  .add('Shape "round"', () => (
    <Button theme={'gradient-primary'} shape={'round'}>
      Buy now
    </Button>
  ));

storiesOf('Button/Theme "gradient-secondary"', module)
  .add('Default size', () => (
    <Button theme={'gradient-secondary'} cursor>
      Buy now
    </Button>
  ))
  .add('Size "lg"', () => (
    <Button size={'lg'} theme={'gradient-secondary'} cursor>
      Buy now
    </Button>
  ))
  .add('Size "sm"', () => (
    <Button size={'sm'} theme={'gradient-secondary'} cursor>
      Buy now
    </Button>
  ));
