import classNames from 'classnames';
import React from 'react';

import styles from './custom-content-container.module.scss';

const TextBlock = ({ label, children }) => (
  <div className={classNames(styles.wrapper, label)}>
    <div className={'container'}>
      <div className={'row'}>
        <div className="col">{children}</div>
      </div>
    </div>
  </div>
);

export default TextBlock;
