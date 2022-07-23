import classNames from 'classnames/bind';
import React from 'react';

import styles from './definition-list.module.scss';

const cx = classNames.bind(styles);
const DefinitionList = (props) => {
  const { children } = props;

  const [heading, d1, d2, d3, d4] = children.props.children.split('\n');

  return (
    <dl className={cx('list')}>
      <dt className={cx('term')}>{heading}</dt>
      <dd className={cx('definition')}>{d1}</dd>
      {d2 && <dd className={cx('definition')}>{d2}</dd>}
      {d3 && <dd className={cx('definition')}>{d3}</dd>}
      {d4 && <dd className={cx('definition')}>{d4}</dd>}
    </dl>
  );
};

export default DefinitionList;
