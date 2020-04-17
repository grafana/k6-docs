import React from 'react';
import { Link } from 'gatsby';
import { Heading } from 'components/shared/heading';
import styles from './k6-does-not.module.scss';

export const K6DoesNot = ({ style }) => (
  <section className={`container ${styles.container}`}>
    <Heading tag={'h2'} size={'lg'} className={styles.title}>
      What k6 does not
    </Heading>
    <p>
      k6 is a high-performing load testing tool, scriptable in JavaScript. The
      architectural design to have these capabilities brings some trade-offs:
    </p>
    <ul>
      <li>
        <Heading tag={'h3'} size={'md'} className={styles.title}>
          Does not run in a browser
        </Heading>
        <p>
          As a result, k6 does not render webpages the same way a browser does.
          This also means that libraries relying on browser APIs won't be
          compatible. By skipping the browser, the consumption of system
          resources are dramatically decreased, making the tool significantly
          more performant.
        </p>
        <p>
          k6 can still be used for website load testing. It even has a{' '}
          <Link className={'link'} to="/using-k6/session-recording-har-support">
            Session Recorder
          </Link>
          , enabling you to generate tests from a website session.
        </p>
      </li>
      <li>
        <Heading tag={'h3'} size={'md'} className={styles.title}>
          Does not run in NodeJS
        </Heading>
        <h3></h3>
        <p>
          JavaScript is not generally well suited for high performance. To
          achieve maximum performance, the tool itself is written in Go,
          embedding a JavaScript runtime allowing for easy test scripting.
        </p>
        <p>
          If you want to import npm modules or libraries using NodeJS APIs, you
          can bundle npm modules with browserify or webpack and import them in
          your tests. Read more about{' '}
          <Link className={'link'} to="/using-k6/modules">
            npm Modules
          </Link>
          .
        </p>
      </li>
    </ul>
  </section>
);
