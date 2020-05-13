import React from 'react';
import { Link } from 'gatsby';
import { Heading } from 'components/shared/heading';
import styles from './use-cases.module.scss';

export const UseCases = () => {
  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        Use cases
      </Heading>
      <p>
        k6 users are typically Developers, QA Engineers, and DevOps. They use k6
        for testing the performance of APIs, microservices, and websites. Common
        k6 use cases are:
      </p>
      <ul>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Load Testing
          </Heading>
          <p>
            k6 is optimized for minimal consumption of system resources. It’s a
            high-performance tool designed for running tests with high load (<Link className={'link'} to="/test-types/spike-testing">spike</Link>, <Link className={'link'} to="/test-types/stress-testing">stress</Link>,
            {' '}<Link className={'link'} to="/test-types/soak-testing">soak tests</Link>) in pre-production and QA environments.
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Performance monitoring
          </Heading>
          <p>
            k6 provides great primitives for <Link className={'link'} to="/testing-guides/automated-performance-testing">performance testing automation</Link>. You could run tests with a small amount of load to continuously monitor the performance of your production environment.
          </p>
        </li>
      </ul>
    </section>
  );
};
