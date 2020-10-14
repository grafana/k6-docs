import { Heading } from 'components/shared/heading';
import * as React from 'react';

import styles from './doc-welcome-help.module.scss';

export const Help = () => (
  <section className={`container ${styles.container}`}>
    <div className={'row'}>
      <div className={'col-12'}>
        <Heading tag={'h2'} size={'lg'} className={styles.title}>
          Need help or want to contribute to k6?
        </Heading>
        <p className={styles.description}>
          Types of questions and where to ask:
        </p>

        <ul>
          <li>
            How do I? - <span className={'link'}>Stack Overflow</span> (use
            tags: k6, javascript, load-testing)
          </li>
          <li>
            How do I? Get k6 community support -{' '}
            <span className={'link'}>Community Forum</span>
          </li>
          <li>
            I got this error, why? -{' '}
            <span className={'link'}>Stack Overflow</span>
          </li>
          <li>
            I got this error and I&apos;m sure it&apos;s a bug -{' '}
            <span className={'link'}>file an issue</span>
          </li>
          <li>
            I have an idea/request -{' '}
            <span className={'link'}>file an issue</span>
          </li>
          <li>
            Why do you? - <span className={'link'}>Slack</span>
          </li>
          <li>
            When will you? - <span className={'link'}>Slack</span>
          </li>
          <li>
            I want to contribute/help with development -{' '}
            <span className={'link'}>Start here</span>, then{' '}
            <span className={'link'}>Slack</span> and{' '}
            <span className={'link'}>issues</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);
