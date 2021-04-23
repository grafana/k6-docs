/* eslint-disable react/no-danger */
import { Heading } from 'components/shared/heading';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './page-info.module.scss';

export const PageInfo = ({ title, description, className, variant }) => (
  <section
    className={`container ${styles.container} ${styles[variant]} ${className}`}
  >
    <Heading className={styles.title} tag={'h1'}>
      {title}
    </Heading>
    <p
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  </section>
);

PageInfo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'wide']),
};

PageInfo.defaultProps = {
  className: '',
  variant: 'default',
};
