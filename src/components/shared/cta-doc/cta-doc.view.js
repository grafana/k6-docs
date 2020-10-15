import { Button } from 'components/shared/button';
import { navigate } from 'gatsby';
import React from 'react';

import { CtaDocDefault } from './cta-doc--default';
import { CtaDocWithImage } from './cta-doc--with-image';
import styles from './cta-doc.module.scss';

export const CtaDoc = ({
  title,
  description,
  btnText,
  btnLink,
  isExternal = false,
  btnTarget = '_blank',
  openDrift = false,
  image = false,
}) => {
  let ButtonComponent = () => (
    <Button
      className={styles.ctaButton}
      tag={'link'}
      to={btnLink}
      size={'lg'}
      cursor
    >
      {btnText}
    </Button>
  );
  if (openDrift) {
    ButtonComponent = () => (
      <Button
        className={styles.ctaButton}
        size={'lg'}
        onClick={() => {
          if (typeof window.drift.api !== 'undefined') {
            window.drift.api.sidebar.toggle();
          } else {
            navigate('/contact');
          }
        }}
        cursor
      >
        {btnText}
      </Button>
    );
  } else if (isExternal) {
    ButtonComponent = () => (
      <Button
        className={styles.ctaButton}
        tag={'a'}
        href={btnLink}
        target={btnTarget}
        size={'lg'}
        cursor
      >
        {btnText}
      </Button>
    );
  }
  return (
    <section className={`container ${styles.wrapper}`}>
      {image ? (
        <CtaDocWithImage
          title={title}
          description={description}
          image={image}
          Button={ButtonComponent}
        />
      ) : (
        <CtaDocDefault
          title={title}
          description={description}
          Button={ButtonComponent}
        />
      )}
    </section>
  );
};
