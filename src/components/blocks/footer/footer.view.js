import { Link } from 'gatsby';
import React from 'react';
import Logo from 'svg/logo-with-grafana-labs.inline.svg';
import { blog, main } from 'utils/urls';

import styles from './footer.module.scss';
import HeartIcon from './svg/heart-purple.inline.svg';

import './footer.scss';

const Heart = () => (
  <span className={styles.heart} role="img" aria-label="heart">
    <HeartIcon />
  </span>
);

export const Footer = () => (
  <footer className={styles.wrapper}>
    <div className={styles.topSection}>
      <div className={'container'}>
        <div className={'row'}>
          <div className={`col-md-2 col-12 `}>
            <Link className={`${styles.logoWrapper}`} to={`/`}>
              <Logo className={styles.logo} />
            </Link>
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
                </ul>
              </div>
              <div className={'col-lg-3 col-sm-6 col-12'}>
                <h3 className={styles.navColumnTitle}>Resources</h3>
                <ul className={styles.navColumnList}>
                  <li className={styles.navColumnItem}>
                    <Link
                      className={styles.navColumnLink}
                      href={'https://grafana.com/docs/k6/latest/'}
                    >
                      Grafana k6 Docs
                    </Link>
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
                      href={'https://grafana.com/docs/k6/latest/extensions/'}
                    >
                      Extensions
                    </Link>
                  </li>
                  <li className={styles.navColumnItem}>
                    <Link
                      className={styles.navColumnLink}
                      href={
                        'https://grafana.com/docs/k6/latest/misc/integrations/'
                      }
                    >
                      Integrations
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
                      href={'https://grafana.com/community/'}
                    >
                      Engage <Heart />
                    </a>
                  </li>
                  <li className={styles.navColumnItem}>
                    <a
                      className={styles.navColumnLink}
                      href={'https://community.grafana.com'}
                    >
                      Forum
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
                </ul>
              </div>
              <div className={`col-lg-3 col-sm-6 col-12`}>
                <h3 className={styles.navColumnTitle}>About</h3>
                <ul className={styles.navColumnList}>
                  <li className={styles.navColumnItem}>
                    <a className={styles.navColumnLink} href={`${blog}`}>
                      Blog
                    </a>
                  </li>
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
                    <a
                      className={styles.navColumnLink}
                      href={'https://grafana.com/contact'}
                    >
                      Contact
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
          <p className={`${styles.text}`}>© 2024 Grafana Labs</p>
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
          </ul>
        </div>
      </div>
    </div>
  </footer>
);
