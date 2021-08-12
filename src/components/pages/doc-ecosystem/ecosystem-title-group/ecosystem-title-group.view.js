import classNames from 'classnames';
import { PageInfo } from 'components/shared/page-info';
import React from 'react';
import Pencil from 'svg/pencil-icon.inline.svg';

import styles from './ecosystem-title-group.module.scss';

const EXTENSIONS_HREF =
  'https://github.com/k6io/docs/blob/master/src/data/ecosystem/extensions.js';

export const EcosystemTitleGroup = ({
  title,
  description,
  breadcrumbs = null,
}) => (
  <div className={styles.wrapper}>
    <PageInfo
      title={title}
      description={description}
      variant="wide"
      className="container"
      breadcrumbs={breadcrumbs}
    />
    <a
      className={classNames(styles.editLink, breadcrumbs && styles.low)}
      href={EXTENSIONS_HREF}
      target={'_blank'}
      rel={'noreferrer'}
    >
      <Pencil />
      Add your own extension
    </a>
  </div>
);
