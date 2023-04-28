import classNames from 'classnames';
import { PageInfo } from 'components/shared/page-info';
import React from 'react';
import Pencil from 'svg/pencil-icon.inline.svg';

import styles from './extensions-title-group.module.scss';

const EXTENSIONS_HREF =
  'https://github.com/grafana/k6-docs/blob/main/src/data/doc-extensions/extensions.json';

export const ExtensionsTitleGroup = ({
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
    <div className="container">
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
  </div>
);
