import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import styles from './what-is-xk6.module.scss';

export const WhatIsXk6 = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      What is xk6?
    </Heading>

    <p className={styles.description}>
      <Link to="https://github.com/grafana/xk6/" className="link">
        xk6
      </Link>{' '}
      is the command-line tool and framework inspired by{' '}
      <Link to="https://github.com/caddyserver/xcaddy/" className="link">
        xcaddy
      </Link>
      , designed for building custom k6 binaries that bundle one or more
      extensions written in Go.
    </p>

    <p className={styles.description}>
      With xk6 and the Go toolchain installed, you should be able to build your
      k6 binary with the extensions you desire. Use the{' '}
      <Link className="link" to={'/extensions/bundle-builder/'}>
        bundle builder
      </Link>{' '}
      to create the exact command to generate your customized k6 binary.
    </p>
  </section>
);
