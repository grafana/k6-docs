/* eslint-disable react/no-danger */
import { Heading } from 'components/shared/heading';
import { Breadcrumbs } from 'components/templates/doc-page/breadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './page-info.module.scss';

export const PageInfo = ({
  title,
  description,
  className,
  variant,
  breadcrumbs,
}) => (
  <section
    className={`container ${styles.container} ${styles[variant]} ${
      breadcrumbs && styles.withBreadcrumbs
    } ${className}`}
  >
    {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
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
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ),
};

PageInfo.defaultProps = {
  className: '',
  variant: 'default',
  breadcrumbs: null,
};
