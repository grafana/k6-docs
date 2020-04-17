import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import BackgroundLine from './svg/footer-background-line.inline.svg';
import Logo from 'svg/logo.inline.svg';
import GithubLogo from './svg/github.inline.svg';
import TwitterLogo from './svg/twitter.inline.svg';

import styles from './footer.module.scss';
import './footer.scss';

import { blog, main, docs } from 'utils/urls';

export const Footer = () => (
  <footer className={styles.wrapper}>
    <div className={styles.topSection}>
      <div className={'container'}>
        <div className={'row'}>
          <div className={`col-md-2 col-12 `}>
            <a href={main} className={styles.logoWrapper}>
              <Logo className={styles.logo} />
            </a>
            <div className={styles.social}>
              <a
                href={'https://github.com/loadimpact/k6'}
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
                    <a className={styles.navColumnLink} href={`${main}/cloud`}>
                      Cloud
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={`${main}/pricing`}
                    >
                      Pricing
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={`${main}/unit-testing-for-performance`}
                    >
                      Unit testing for performance
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link className={styles.navColumnLink} to={'/integrations'}>
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={'col-lg-3 col-sm-6 col-12'}>
                <h3 className={styles.navColumnTitle}>Resources</h3>
                <ul className={styles.navColumnList}>
                  <li className={styles.navColumnItem}>
                    <a className={styles.navColumnLink} href={`${docs}`}>
                      k6 docs
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link className={styles.navColumnLink} to={'/cloud'}>
                      Cloud docs
                    </Link>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link className={styles.navColumnLink} to={'/examples'}>
                      Examples & Tutorials
                    </Link>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link
                      className={styles.navColumnLink}
                      to={'/testing-guides/load-testing-websites'}
                    >
                      Load testing websites
                    </Link>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link
                      className={styles.navColumnLink}
                      to={'/testing-guides/api-load-testing'}
                    >
                      API load testing
                    </Link>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link
                      className={styles.navColumnLink}
                      to={'/testing-guides/automated-performance-testing'}
                    >
                      Automated performance testing
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={'col-lg-3 col-sm-6 col-12'}>
                <h3 className={styles.navColumnTitle}>Community</h3>
                <ul className={styles.navColumnList}>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={'https://community.k6.io'}
                    >
                      Forum
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a className={styles.navColumnLink} href={`${main}/slack`}>
                      Slack
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={'https://github.com/loadimpact'}
                    >
                      Github
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={`${main}/oss-program`}
                    >
                      OSS Support Program
                    </a>
                  </li>
                </ul>
              </div>
              <div className={`col-lg-3 col-sm-6 col-12`}>
                <h3 className={styles.navColumnTitle}>About</h3>
                <ul className={styles.navColumnList}>
                  <li className={styles.navColumnItem}>
                    <a className={styles.navColumnLink} href={`${main}/about`}>
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
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-md-2 col-sm-12 col-auto'}>
          <p className={`${styles.text}`}>© 2020 Load Impact AB</p>
        </div>
        <div className={'col-md-10 col-sm-12 col-auto'}>
          <ul className={styles.legalLinksList}>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={`${main}/data-processing-agreement`}
              >
                GDPR
              </a>
            </li>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={`${main}/privacy-policy`}
              >
                Privacy
              </a>
            </li>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={`${main}/security-policy`}
              >
                Security
              </a>
            </li>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={`${main}/services-agreement`}
              >
                Terms
              </a>
            </li>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={`${main}/stewardship`}
              >
                Stewardship
              </a>
            </li>
            <li className={styles.navColumnItem}>
              <a
                className={styles.navColumnLink}
                href={'https://status.k6.io/'}
              >
                Status
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
