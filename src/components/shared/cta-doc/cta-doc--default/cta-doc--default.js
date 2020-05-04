import React from 'react';
import { Heading } from 'components/shared/heading';
import styles from './cta-doc--default.module.scss';
import ButtonBg from '../svg/button-bg.inline.svg';

export const CtaDocDefault = ({ title, description, Button }) => {
  return (
    <div className={'row'}>
      <div className={'col-xl-12'}>
        <div className={styles.wrapperLight}>
          <div className={styles.inner}>
            <div className={styles.content}>
              <Heading className={styles.title} tag={'h3'}>
                {title}
              </Heading>
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
