import { Heading } from 'components/shared/heading';
import React from 'react';

import styles from './overview.module.scss';

export const ExtensionsOverview = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      Custom k6 builds
    </Heading>

    <p className={styles.description}>
      With k6 extensions, you can create custom k6 binaries to support your
      specific reliability-testing needs.
    </p>

    <p className={styles.description}>
      Currently, k6 supports two ways to extend its native functionality:
      <ul>
        <li>
          <strong>JavaScript extensions</strong>
          <p>
            {' '}
            Extend the JavaScript APIs available to your test scripts. Add
            support for new network protocols, improve performance compared to
            equivalent JS libraries, or add features.
          </p>
        </li>
        <li>
          <strong>Output extensions</strong>
          <p>
            {' '}
            Extend how you can handle the metric data that your test generates.
            Add custom processing and dispatching.
          </p>
        </li>
      </ul>
    </p>
  </section>
);
