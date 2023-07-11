import PropTypes from 'prop-types';
import React from 'react';

import styles from './form-message.module.scss';
import SuccessSVG from './svg/success.inline.svg';

const FormMessage = ({ type }) => (
  <div className={styles.wrapper}>
    {type === 'success' && (
      <>
        <div className={styles.successIcon}>
          <SuccessSVG />
        </div>
        <span className={styles.successText}>
          Your message has been successfully sent
        </span>
      </>
    )}
    {type === 'error' && (
      <span className={styles.errorText}>
        Your message has not been sent. Please, if the problem persists, contact{' '}
        <a href={'mailto:support@k6.io'}>support@k6.io</a>.
      </span>
    )}
  </div>
);

FormMessage.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FormMessage;
