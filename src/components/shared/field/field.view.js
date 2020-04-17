import React from 'react';
import classNames from 'classnames';
import { TextField } from '../text-field';

import styles from './field.module.scss';


export const Field = ({ className, id, label, tag, isInvalid, onChange, ...attributes }) => {
  const wrapperClassName = classNames(
    styles.wrapper,
    className,
  );

  return (
    <div className={wrapperClassName}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <TextField id={id} tag={tag} isInvalid={isInvalid} onChange={onChange} {...attributes}/>
    </div>
  );
};
