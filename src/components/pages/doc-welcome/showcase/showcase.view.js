import { FeaturedPostCard } from 'components/blocks/featured-post-card';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';
import React from 'react';
import { getDateAndSlugFromPath } from 'utils';

import styles from './showcase.module.scss';

export const Showcase = () => {
  const {
    allMarkdownRemark: { edges: featuredPost },
  } = useStaticQuery(graphql`
    query featuredPostQuery {
      allMdx(
        filter: { internal: { contentFilePath: { regex: "/markdown/posts/" } } }
      ) {
        edges {
          node {
            frontmatter {
              cover {
                childImageSharp {
                  gatsbyImageData(
                    width: 540
                    quality: 100
                    backgroundColor: "rgb(255,255,255)"
                  )
                }
              }
              category
              title
              covertext
              summary
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `);

  const featuredPostData = featuredPost.length ? featuredPost[0].node : false;
  // inject date and slug manually
  if (featuredPostData) {
    const { date, slug } = getDateAndSlugFromPath(
      featuredPostData.internal.contentFilePath,
    );

    return (
      <section className={`container ${styles.container}`}>
        <FeaturedPostCard
          image={getImage(featuredPostData.frontmatter.cover)}
          date={date}
          title={featuredPostData.frontmatter.title}
          url={slug}
          covertext={featuredPostData.frontmatter.covertext}
          summary={featuredPostData.frontmatter.summary}
        />
      </section>
    );
  }
  return null;
};
