import React from 'react';

import ButtonBg from '../svg/button-bg.inline.svg';

import styles from './cta-doc--default.module.scss';

export const CtaDocDefault = ({ title, description, Button }) => {
  return (
    <div className={'row'}>
      <div className={'col-xl-12'}>
        <div className={styles.wrapperLight}>
          <div className={styles.inner}>
            <div className={styles.content}>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.buttonWrapper}>
              <ButtonBg className={styles.buttonBg} />
              <Button />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
