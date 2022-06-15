import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import styles from './use-cases.module.scss';

export const ExtensionsUseCases = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      Use cases
    </Heading>

    <p className={styles.description}>
      The extensions ecosystem allows endless possibilities to expand
      functionality for your k6 testing.
    </p>

    <p className={styles.description}>
      Some of the possibilities include:
      <ul>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Add support for a new network protocol
          </Heading>
          <p className={styles.description}>
            For example,{' '}
            <Link className="link" to={'https://github.com/grafana/xk6-amqp'}>
              xk6-amqp
            </Link>{' '}
            enables access to resources using the{' '}
            <em>Advanced Message Queueing Protocol (AMQP)</em>. Including this
            extension, your scripts can create message queues and seed messages
            for tests that include systems like RabbitMQ or ActiveMQ, among
            others.
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Incorporate a client library for test dependency
          </Heading>
          <p className={styles.description}>
            Everyone wants their services running in Kubernetes these days. With{' '}
            <Link
              className="link"
              to={'https://github.com/grafana/xk6-kubernetes'}
            >
              xk6-kubernetes
            </Link>
            , your JavaScript tests can interface directly with Kubernetes
            resources using functionality typically restricted to{' '}
            <code>kubectl</code>. Prepare isolated <em>Namespaces</em> for each
            test run or inject environment variables as <em>ConfigMaps</em>.
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Enhance existing functionality for specialized requirements
          </Heading>
          <p className={styles.description}>
            Suppose your company has consolidated its observability metrics into
            Prometheus. Use{' '}
            <Link
              className="link"
              to={'https://github.com/grafana/xk6-output-prometheus-remote'}
            >
              xk6-output-prometheus-remote
            </Link>{' '}
            to have your k6 tests publish metrics there as well!
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            Improve script performance and efficiency
          </Heading>
          <p className={styles.description}>
            Perhaps your company is taking advantage of <em>OpenTelemetry</em>{' '}
            for tracing service requests through layers of microservices. Using{' '}
            <Link
              className="link"
              to={'https://github.com/grafana/xk6-distributed-tracing'}
            >
              xk6-distributed-tracing
            </Link>
            , you can update the <code>http</code> client to link your test
            requests as the origin for your traces; no need to add JavaScript
            code to supply the required trace headers.
          </p>
        </li>
      </ul>
    </p>
  </section>
);
