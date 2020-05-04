import React from 'react';
import Img from 'gatsby-image';
import styles from './cta-doc--with-image.module.scss';

export const CtaDocWithImage = ({ title, description, image, Button }) => {
  return (
    <div className={'row'}>
      <div className={'col-xl-12'}>
        <div className={styles.wrapperGradient}>
          <div className={styles.outer}>
            <div className={`row ${styles.inner}`}>
              <div className={`col-md-6 col-12 ${styles.hook}`}>
                <div className={styles.imgWrapper}>
                  <Img fluid={image} className={styles.img} />
                </div>
              </div>
              <div className={`col-md-6 col-12 ${styles.hook}`}>
                <div className={styles.cloudText}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <Button />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
