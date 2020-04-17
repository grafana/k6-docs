import React from 'react';
import { Heading } from 'components/shared/heading';
import styles from './manifesto.module.scss';
import { main } from 'utils/urls';

const bullets = [
  {
    title: 'Simple testing is better than no testing',
    url: `${main}/our-beliefs/#simple-testing-is-better-than-no-testing`,
  },
  {
    title: 'Load testing should be goal oriented',
    url: `${main}/our-beliefs/#load-testing-should-be-goal-oriented`,
  },
  {
    title: 'Load testing by developers',
    url: `${main}/our-beliefs/#load-testing-by-developers`,
  },
  {
    title: 'Developer experience is super important',
    url: `${main}/our-beliefs/#developer-experience-is-super-important`,
  },
  {
    title: 'Load test in a pre-production environment',
    url: `${main}/our-beliefs/#load-test-in-a-pre-production-environment`,
  },
];

export const Manifesto = () => {
  return (
    <section className={`container ${styles.container}`}>
      <Heading tag={'h2'} size={'lg'} className={styles.title}>
        Load Testing Manifesto
      </Heading>
      Our load testing manifesto is the result of having spent years hip deep in
      the trenches, doing performance- and load testing. We’ve created it to be
      used as guidance, helping you in getting your performance testing on the
      right track!
      <ul>
        {bullets.map((bullet, i) => (
          <li key={`bullet-${i}`}>
            <a className="link" href={bullet.url}>
              {bullet.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
