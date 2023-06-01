import SubscribeForm from 'components/shared/subscribe-form';
import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react';
import Logo from 'svg/logo-with-grafana-labs.inline.svg';
import { blog, main, docs } from 'utils/urls';

import styles from './footer.module.scss';
import GithubLogo from './svg/github.inline.svg';
import HeartIcon from './svg/heart-purple.inline.svg';
import LinkedinLogo from './svg/linkedin.inline.svg';
import MeetupLogo from './svg/meetup.inline.svg';
import SlackLogo from './svg/slack.inline.svg';
import TwitterLogo from './svg/twitter.inline.svg';
import YoutubeLogo from './svg/youtube.inline.svg';

import './footer.scss';

const Badge = ({ children }) => (
  <span className={styles.badge}>{children}</span>
);

const Heart = () => (
  <span className={styles.heart} role="img" aria-label="heart">
    <HeartIcon />
  </span>
);

const fetchStatusIndicator = async (callback) => {
  try {
    const result = await fetch('https://status.k6.io/api/v2/status.json').then(
      (res) => res.json(),
    );
    callback(result?.status?.indicator || 'none');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('failed while fetching status', e);
  }
};

export const Footer = () => {
  // possible values: 'none', 'minor', 'major', 'critical'
  const [statusIndicator, setStatusIndicator] = useState('none');
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    fetchStatusIndicator(setStatusIndicator);
  }, []);

  useEffect(() => {
    fetch('/data/jobs-positions.json')
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch jobs: ', error);
      });
  }, []);

  return (
    <footer className={styles.wrapper}>
      <div className={styles.topSection}>
        <div className={'container'}>
          <div className={'row'}>
            <div className={`col-md-2 col-12 `}>
              <Link className={`${styles.logoWrapper}`} to={`/`}>
                <Logo className={styles.logo} />
              </Link>
              <div className={styles.social}>
                <a
                  href={'https://github.com/grafana/k6'}
                  className={styles.socialIcon}
                >
                  <GithubLogo />
                </a>
                <a
                  href={'https://twitter.com/k6_io'}
                  className={styles.socialIcon}
                >
                  {' '}
                  <TwitterLogo />
                </a>
                <a className={styles.socialIcon} href={`${main}/slack`}>
                  {' '}
                  <SlackLogo />
                </a>
                <a
                  className={styles.socialIcon}
                  href={
                    'https://www.youtube.com/channel/UC8ryLdIbmkVJq4Zt613oZPQ'
                  }
                >
                  {' '}
                  <YoutubeLogo />
                </a>
                <a
                  className={styles.socialIcon}
                  href={'https://www.linkedin.com/company/k6io'}
                >
                  {' '}
                  <LinkedinLogo />
                </a>
                <a
                  className={styles.socialIcon}
                  href={'https://www.meetup.com/k6-load-testing/ '}
                >
                  {' '}
                  <MeetupLogo />
                </a>
              </div>
            </div>
            <div className={`col-md-10 col-12`}>
              <div className={'row'}>
                <div className={'col-lg-3 col-sm-6 col-12'}>
                  <h3 className={styles.navColumnTitle}>Product</h3>
                  <ul className={styles.navColumnList}>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/open-source`}
                      >
                        Open Source
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={'https://grafana.com/products/cloud/k6/?src=k6io'}
                      >
                        Grafana Cloud k6
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={'https://grafana.com/pricing/?src=k6io'}
                      >
                        Grafana Cloud k6 Pricing
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/oss-vs-cloud`}
                      >
                        Open Source vs Cloud
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/what-to-consider-when-building-or-buying-a-load-testing-solution`}
                      >
                        Build vs Buy
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/testimonials`}
                      >
                        Testimonials
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={'col-lg-3 col-sm-6 col-12'}>
                  <h3 className={styles.navColumnTitle}>Resources</h3>
                  <ul className={styles.navColumnList}>
                    <li className={styles.navColumnItem}>
                      <a className={styles.navColumnLink} href={`${docs}`}>
                        k6 Docs
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <Link
                        className={styles.navColumnLink}
                        href={'https://grafana.com/docs/grafana-cloud/k6'}
                      >
                        Grafana Cloud k6 Docs
                      </Link>
                    </li>
                    <li className={styles.navColumnItem}>
                      <Link
                        className={styles.navColumnLink}
                        to={'/extensions/'}
                      >
                        Extensions
                      </Link>
                    </li>
                    <li className={styles.navColumnItem}>
                      <Link
                        className={styles.navColumnLink}
                        to={'/integrations/'}
                      >
                        Integrations
                      </Link>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/modern-load-testing-for-engineering-teams/`}
                      >
                        Modern Load Testing
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/why-your-organization-should-perform-load-testing`}
                      >
                        Not a developer. Why k6?
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={'col-lg-3 col-sm-6 col-12'}>
                  <h3 className={styles.navColumnTitle}>Community</h3>
                  <ul className={styles.navColumnList}>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/community/`}
                      >
                        Engage <Heart />
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={'https://community.k6.io'}
                      >
                        Forum
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/slack`}
                      >
                        Slack
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={'https://github.com/grafana?q=k6'}
                      >
                        GitHub
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/champions-program/`}
                      >
                        k6 Champions
                      </a>
                    </li>
                  </ul>
                </div>
                <div className={`col-lg-3 col-sm-6 col-12`}>
                  <h3 className={styles.navColumnTitle}>About</h3>
                  <ul className={styles.navColumnList}>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/about`}
                      >
                        Our story
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/our-beliefs`}
                      >
                        Our beliefs
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a className={styles.navColumnLink} href={`${blog}`}>
                        Blog
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a
                        className={styles.navColumnLink}
                        href={`${main}/contact`}
                      >
                        Contact
                      </a>
                    </li>
                    <li className={styles.navColumnItem}>
                      <a className={styles.navColumnLink} href={`${main}/jobs`}>
                        Jobs
                        {jobs && jobs.length > 0 && (
                          <Badge>{jobs.length}</Badge>
                        )}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscribeForm />

      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-md-2 col-sm-12 col-auto'}>
            <p className={`${styles.text}`}>© 2023 Grafana Labs</p>
          </div>
          <div className={'col-md-10 col-sm-12 col-auto'}>
            <ul className={styles.legalLinksList}>
              <li className={styles.navColumnItem}>
                <a
                  className={styles.navColumnLink}
                  href={'https://grafana.com/legal/?src=k6io'}
                >
                  Legal and Security
                </a>
              </li>
              <li className={styles.navColumnItem}>
                <a
                  className={styles.navColumnLink}
                  href={'https://grafana.com/legal/privacy-policy/?src=k6io'}
                >
                  Privacy Policy
                </a>
              </li>
              <li className={styles.navColumnItem}>
                <a
                  className={styles.navColumnLink}
                  href={'https://status.k6.io/'}
                >
                  <div className={styles.status}>
                    Status{' '}
                    <div
                      className={`${styles.statusIndicator} ${styles[statusIndicator]}`}
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
