import React from 'react';
import { storiesOf } from '@storybook/react';
import { TerminalHeader } from '.';

storiesOf('Terminal Header', module)
  .add('default', () => <TerminalHeader/>)
  .add('white', () => <TerminalHeader theme={'white'}/>)
  .add('grey', () => <TerminalHeader theme={'grey'}/>);
