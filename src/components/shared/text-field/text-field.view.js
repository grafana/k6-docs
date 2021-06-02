import classNames from 'classnames';
import React from 'react';

import styles from './text-field.module.scss';

export const TextField = ({
  className,
  tag = 'input',
  type = 'text',
  onChange,
  isInvalid,
  ...attributes
}) => {
  const wrapperClassName = classNames(
    styles.wrapper,
    { [styles.invalid]: isInvalid === true },
    className,
  );

  switch (tag) {
    case 'textarea':
      return (
        <textarea
          className={wrapperClassName}
          onChange={onChange}
          {...attributes}
        />
      );
    case 'input':
    default:
      return (
        <input
          className={wrapperClassName}
          type={type}
          onChange={onChange}
          {...attributes}
        />
      );
  }
};
