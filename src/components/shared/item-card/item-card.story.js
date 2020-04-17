import React from 'react';
import { storiesOf } from '@storybook/react';
import { ItemCard, styles as itemCardStyles } from '.';

storiesOf('ItemCard', module)
  .add('default', () => (
    <div style={{ padding: '20px' }}>
      <div className={'row'}>
        <div className={'col-4'}>
          <ItemCard to={'/doc/result-output'}>
            <div className={itemCardStyles.content}>
              <div className={itemCardStyles.title}>Results output</div>
              <div className={itemCardStyles.text}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industrys standard dummy text
              </div>
            </div>
            <div className={itemCardStyles.footer}>
              <div className={itemCardStyles.link}>Read more</div>
            </div>
          </ItemCard>
        </div>
      </div>
    </div>
  ));
