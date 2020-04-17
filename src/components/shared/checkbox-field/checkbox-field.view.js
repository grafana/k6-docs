import React from 'react';

import styles from './checkbox-field.module.scss';


export const CheckboxField = (props) => {
  const { id, children, checked, onChange, onBlur } = props;

  return (
    <div>
      <input className={styles.input} id={id} type={'checkbox'} checked={checked} onChange={onChange} onBlur={onBlur}/>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
    </div>
  );
};
