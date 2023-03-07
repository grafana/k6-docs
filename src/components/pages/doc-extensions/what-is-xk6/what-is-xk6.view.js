import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import Blockquote from '../../../shared/blockquote';

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
      <Link className="link" to={'/extensions/get-started/bundle/'}>
        bundle builder
      </Link>{' '}
      to generate the CLI command that will build your customized k6 binary.
    </p>

    <Blockquote mod="note" title="Support for Docker">
      You now have a new option that doesn&apos;t require setting a Go
      environment!{' '}
      <Link
        to="/extensions/guides/build-a-k6-binary-using-docker/"
        className="link"
      >
        Use Docker
      </Link>{' '}
      to build your custom binary.
    </Blockquote>
  </section>
);
