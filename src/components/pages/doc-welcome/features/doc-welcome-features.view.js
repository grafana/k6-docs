import * as React from 'react';

import { Heading } from 'components/shared/heading';
import { Trait } from 'components/shared/trait';
import { Link } from 'gatsby';

import styles from './doc-welcome-features.module.scss';

export const Features = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      Key features
    </Heading>
    <p>
      k6 is packed with features, which you can learn all about in the documentation.
      Key features include:
    </p>

    <div className={'row'}>
      <div className="col-md-12">
        <Trait className={styles.trait}>
          CLI tool with developer-friendly APIs.
        </Trait>

        <Trait className={styles.trait}>
          Scripting in JavaScript ES2015/ES6 - with support for{' '}
          <Link className={'link'} to="/using-k6/modules">
            local and remote modules
          </Link>
        </Trait>
        <Trait className={styles.trait}>
          <Link className={'link'} to="/using-k6/checks">
            Checks
          </Link>{' '}
          and{' '}
          <Link className={'link'} to="/using-k6/thresholds">
            Thresholds
          </Link>{' '}
          - for goal-oriented, automation-friendly load testing
        </Trait>
      </div>
    </div>
  </section>
);
