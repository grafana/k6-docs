import React, { useState, useEffect } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import { useStaticQuery, graphql } from 'gatsby';
import classNames from 'classnames';
import { whenElementAvailable } from 'utils';
// components
import { DocLayout } from 'layouts/doc-layout';
import { PageInfo } from 'components/pages/doc-welcome/page-info';
import { DocIconsRow } from 'components/pages/doc-integrations/doc-icons-row';
import { ExternalLinksDashboard } from 'components/pages/doc-integrations/external-links-dashboard';
import CustomContentContainer from 'components/shared/custom-content-container';
// styles
import styles from 'components/pages/doc-integrations/doc-integrations.module.scss';
import { default as docPageContent } from 'components/templates/doc-page/doc-page-content/doc-page-content.module.scss';
import { default as docPageNav } from 'components/pages/doc-page/doc-page-nav/doc-page-nav.module.scss';
import { useLandmark } from 'hooks';
// icons
import Jenkins from 'svg/jenkins.inline.svg';
import CircleCI from 'svg/circleci.inline.svg';
import Gitlab from 'svg/gitlab.inline.svg';
import GitHub from 'svg/github.inline.svg';
import Azure from 'svg/azure.inline.svg';
import TeamCity from 'svg/teamcity.inline.svg';
import Json from 'svg/json.inline.svg';
import Grafana from 'svg/grafana.inline.svg';
import Influx from 'svg/influx.inline.svg';
import Datadog from 'svg/datadog.inline.svg';
import Kafka from 'svg/kafka.inline.svg';
import StatsD from 'svg/statsd.inline.svg';
import Loadimpact from 'svg/loadimpact.inline.svg';
import SeoMetadata from 'utils/seo-metadata';
import { blog, main } from 'utils/urls';

export default function({ pageContext: { sidebarTree, navLinks } }) {
  const pageMetadata = SeoMetadata.integrations;
  const { links } = useLandmark({
    selector: docPageContent.inner,
  });

  useEffect(() => {
    // check if given url contains hash (therefore an anchor)
    const scrollMark = location.hash;
    if (scrollMark) {
      // wait when html content adds all id to h2 then scroll to it
      whenElementAvailable(scrollMark)(el =>
        // no smooth scroll needed
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 25,
        }),
      );
    }
  }, []);

  const handleAnchorClick = (e, anchor) => {
    e.preventDefault();
    document.querySelector(anchor).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // changing hash without default jumps to anchor
    if (history.pushState) {
      history.pushState(false, false, anchor);
    } else {
      // old browser support
      window.location.hash = anchor;
    }
  };

  const {
    graphqlImg: {
      childImageSharp: { fixed: graphqlImgData },
    },
    azureImg: {
      childImageSharp: { fixed: azureImgData },
    },
    harImg: {
      childImageSharp: { fixed: harImgData },
    },
    postmanImg: {
      childImageSharp: { fixed: postmanImgData },
    },
    swaggerImg: {
      childImageSharp: { fixed: swaggerImgData },
    },
    jmeterImg: {
      childImageSharp: { fixed: jmeterImgData },
    },
  } = useStaticQuery(graphql`
    query stubImageQuery {
      graphqlImg: file(
        absolutePath: { regex: "/images/doc-integrations/graphql/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      azureImg: file(
        absolutePath: { regex: "/images/doc-integrations/azure/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      harImg: file(absolutePath: { regex: "/images/doc-integrations/har/" }) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      postmanImg: file(
        absolutePath: { regex: "/images/doc-integrations/postman/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      swaggerImg: file(
        absolutePath: { regex: "/images/doc-integrations/openapi/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
      jmeterImg: file(
        absolutePath: { regex: "/images/doc-integrations/jmeter/" }
      ) {
        childImageSharp {
          fixed(width: 60, height: 60, cropFocus: CENTER) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <DocLayout
      sidebarTree={sidebarTree}
      navLinks={navLinks}
      pageMetadata={pageMetadata}
    >
      <PageInfo title={'Integrations & Tools'} description={''} />
      <div className={`${docPageContent.inner} `}>
        <StickyContainer>
          <div
            className={classNames(
              docPageContent.mainDocContent,
              docPageContent.contentWrapper,
            )}
          >
            <ExternalLinksDashboard
              dashboardTitle={'Converters'}
              linksData={[
                {
                  picture: harImgData,
                  title: 'HAR-to-k6',
                  description: 'Convert a HAR file to k6 script.',
                  url: 'https://github.com/loadimpact/har-to-k6',
                },
                {
                  picture: jmeterImgData,
                  title: 'JMeter-to-k6',
                  description: 'Convert a JMeter .jmx file to k6 script.',
                  url: 'https://github.com/loadimpact/jmeter-to-k6',
                },
                {
                  picture: postmanImgData,
                  title: 'Postman-to-k6',
                  description:
                    'Convert a Postman collection to k6 script.',
                  url: 'https://github.com/loadimpact/postman-to-k6',
                },
                {
                  picture: swaggerImgData,
                  title: 'OpenAPI generator',
                  description:
                    'Convert Swagger/OpenAPI specification to k6 script.',
                  url: 'https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6',
                },
              ]}
            />
            <DocIconsRow
              className={styles.ciRow}
              title={'Continuous Integration and Continuous Delivery'}
              subtitle={
                'By automating load testing with your CI / CD tools, you can quickly see when a code change has introduced a performance regression.'
              }
              iconsData={[
                {
                  Icon: Azure,
                  name: 'Azure Pipelines',
                  link: `${blog}/integrating-load-testing-with-azure-pipelines`,
                },
                {
                  Icon: CircleCI,
                  name: 'CircleCI',
                  link: `${blog}/integrating-load-testing-with-circleci`,
                },
                {
                  Icon: GitHub,
                  name: 'GitHub Actions',
                  link: `${blog}/load-testing-using-github-actions`,
                },
                {
                  Icon: Gitlab,
                  name: 'GitLab',
                  link: `${blog}/integrating-load-testing-with-gitlab`,
                },
                {
                  Icon: Jenkins,
                  name: 'Jenkins',
                  link: `${blog}/integrating-load-testing-with-jenkins`,
                },
                {
                  Icon: TeamCity,
                  name: 'TeamCity',
                  link: `${blog}/load-testing-using-teamcity-and-k6`,
                },
              ]}
            />
            <ExternalLinksDashboard
              dashboardTitle={'Community integrations'}
              linksData={[
                {
                  picture: graphqlImgData,
                  title: 'easygraphql-load-tester',
                  description:
                    'Create queries from your GraphQL schema to use with your favorite load testing package.',
                  url: 'https://github.com/EasyGraphQL/easygraphql-load-tester',
                },
                {
                  picture: azureImgData,
                  title: 'k6ToAzure',
                  description:
                    'Takes output JSON from k6 (k6.io) and pushes into Azure Log Analytics.',
                  url:
                    'https://github.com/benc-uk/smilr/blob/master/azure/load-test-reports/k6ToAzure.js',
                },
              ]}
            />
            <DocIconsRow
              className={styles.storeRow}
              title={'Result store and visualization'}
              subtitle={
                'k6 can output its test result data to different sources:'
              }
              iconsData={[
                {
                  Icon: Kafka,
                  name: 'Apache Kafka',
                  to: '/results-visualization/apache-kafka',
                },
                {
                  Icon: Loadimpact,
                  name: 'Cloud',
                  to: '/results-visualization/cloud',
                },
                {
                  Icon: Datadog,
                  name: 'DataDog',
                  to: '/results-visualization/datadog',
                },
                {
                  Icon: () => (
                    <div className={styles.doubleIcon}>
                      <Influx />
                      <span>+</span>
                      <Grafana />
                    </div>
                  ),
                  name: 'InfluxDB +Grafana',
                  to: '/results-visualization/influxdb-+-grafana',
                  // handling non-standard sizes
                  col: 2,
                },
                {
                  Icon: Json,
                  name: 'JSON file',
                  to: '/results-visualization/apache-kafka',
                },
                {
                  Icon: () => (
                    <div className={styles.doubleIcon}>
                      <StatsD />
                    </div>
                  ),
                  name: 'StatsD',
                  to: '/results-visualization/statsd',
                },
              ]}
            />
            <ExternalLinksDashboard
              dashboardTitle={"Grafana's dashboards"}
              linksData={[
                {
                  title: 'dcadwallader',
                  url: 'https://grafana.com/grafana/dashboards/2587',
                },
                {
                  title: 'Stian Øvrevåge',
                  url: 'https://grafana.com/grafana/dashboards/4411',
                },
                {
                  title: 'cyaiox',
                  url: 'https://grafana.com/grafana/dashboards/8156',
                },
                {
                  title: 'smockvavelsky',
                  url: 'https://grafana.com/grafana/dashboards/10553',
                },
                {
                  title: 'k m',
                  url: 'https://grafana.com/grafana/dashboards/10660',
                },
              ]}
            />
            <CustomContentContainer>
              <p>
                Please get in touch with us on{' '}
                <a href={`${main}/slack`} className={'link'}>
                  Slack
                </a>{' '}
                if you have a tool or add-on that works well with k6, and we
                will list it here!
              </p>
            </CustomContentContainer>
          </div>
          <Sticky topOffset={-15} bottomOffset={0} disableCompensation>
            {({ style }) => (
              <div style={style} className={docPageContent.anchorBarWrapper}>
                <nav
                  className={`${docPageNav.wrapper} ${docPageContent.anchorBar}`}
                >
                  <ul className={docPageNav.anchorWrapper}>
                    {links.map(({ title, anchor }, i) => (
                      <li className={docPageNav.anchorBox} key={`al-${i}`}>
                        <a
                          className={docPageNav.anchor}
                          href={anchor}
                          onClick={e => handleAnchorClick(e, anchor)}
                        >
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </Sticky>
        </StickyContainer>
      </div>
    </DocLayout>
  );
}
