import { Heading } from 'components/shared/heading';
import { Link } from 'gatsby';
import React from 'react';

import styles from './use-cases.module.scss';

export const ExtensionsUseCases = () => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      Extension use cases
    </Heading>

    <p className={styles.description}>
      The extensions ecosystem provides endless possibilities to expand the
      functionality for your k6 testing.
    </p>

    <p className={styles.description}>
      Some reasons you might want to extend k6 include the following:
      <ul>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            To add support for a new network protocol
          </Heading>
          <p className={styles.description}>
            For example,{' '}
            <Link className="link" to={'https://github.com/grafana/xk6-amqp'}>
              xk6-amqp
            </Link>{' '}
            gives access to resources using the{' '}
            <em>Advanced Message Queueing Protocol (AMQP)</em>. With xk6-amqp,
            your scripts can create message queues and seed messages for tests
            that include systems like RabbitMQ or ActiveMQ (among others).
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            To incorporate a client library for test dependency
          </Heading>
          <p className={styles.description}>
            Everyone wants to run their services in Kubernetes these days. With{' '}
            <Link
              className="link"
              to={'https://github.com/grafana/xk6-kubernetes'}
            >
              xk6-kubernetes
            </Link>
            , your JavaScript tests can interface directly with Kubernetes
            resources using functionality typically restricted to{' '}
            <code>kubectl</code>. Prepare isolated <em>Namespaces</em> for each
            test run, or inject environment variables as <em>ConfigMaps</em>.
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            To enhance existing functionality for specialized requirements
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
            to publish your k6 test metrics to Prometheus as well!
          </p>
        </li>
        <li>
          <Heading tag={'h3'} size={'md'} className={styles.title}>
            To improve script performance and efficiency
          </Heading>
          <p className={styles.description}>
            Perhaps your company uses <em>OpenTelemetry</em> to trace service
            requests through layers of microservices. Using{' '}
            <Link
              className="link"
              to={'https://github.com/grafana/xk6-distributed-tracing'}
            >
              xk6-distributed-tracing
            </Link>
            , you can update the <code>http</code> client to link your test
            requests as the origin for your traces&mdash;no need to add
            JavaScript code to supply the required trace headers.
          </p>
        </li>
      </ul>
    </p>
  </section>
);
