import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import styles from './what-is-xk6.module.scss';

export const WhatIsXk6 = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      xk6 makes custom binaries
    </Heading>

    <p className={styles.description}>
      <Link to="https://github.com/grafana/xk6/" className="link">
        xk6
      </Link>{' '}
      is command-line tool and framework written in Go. With xk6, you build
      custom k6 binaries that bundle one or more extensions written in Go.
    </p>

    <p className={styles.description}>
      With xk6 and the Go toolchain, you can build the k6 binary with the
      combination of extensions you want. You can use the{' '}
      <Link className="link" to={'/extensions/getting-started/bundle/'}>
        bundle builder
      </Link>{' '}
      to generate the CLI command that will build your customized k6 binary.
    </p>
  </section>
);
