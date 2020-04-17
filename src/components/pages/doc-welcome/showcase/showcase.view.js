import React from 'react';
import { FeaturedPostCard } from 'components/blocks/featured-post-card';
import { graphql, useStaticQuery } from 'gatsby';

import { getDateAndSlugFromPath } from 'utils';
import styles from './showcase.module.scss';
import { blog } from 'utils/urls';

export const Showcase = () => {
  const {
    allMarkdownRemark: { edges: featuredPost },
  } = useStaticQuery(graphql`
    query featuredPostQuery {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/markdown/posts/" } }
      ) {
        edges {
          node {
            frontmatter {
              cover {
                childImageSharp {
                  fluid(
                    maxWidth: 540
                    fit: CONTAIN
                    quality: 100
                    background: "rgb(255,255,255)"
                  ) {
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
              category
              title
              covertext
              summary
            }
            fileAbsolutePath
          }
        }
      }
    }
  `);

  const featuredPostData = featuredPost.length ? featuredPost[0].node : false;
  // inject date and slug manually
  if (featuredPostData) {
    const { date, slug } = getDateAndSlugFromPath(
      featuredPostData.fileAbsolutePath,
    );
    featuredPostData.frontmatter.date = date;
    featuredPostData.frontmatter.slug = slug;
  }

  return featuredPostData ? (
    <section className={`container ${styles.container}`}>
      <FeaturedPostCard
        gatsbyImageData={
          featuredPostData.frontmatter.cover.childImageSharp.fluid
        }
        date={featuredPostData.frontmatter.date}
        title={featuredPostData.frontmatter.title}
        url={featuredPostData.frontmatter.slug}
        covertext={featuredPostData.frontmatter.covertext}
        summary={featuredPostData.frontmatter.summary}
      />
    </section>
  ) : null;
};
