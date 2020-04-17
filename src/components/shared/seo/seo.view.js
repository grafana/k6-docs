import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { createMetaImagePath } from 'utils';
import { docs } from 'utils/urls';

export const SEO = ({
  data: { title, description, image, slug } = {},
  facebook,
} = {}) => {
  const {
    site: {
      siteMetadata: {
        siteTitle,
        siteDescription,
        siteUrl,
        siteImage,
        siteLanguage,
        authorTwitterAccount,
      },
    },
  } = useStaticQuery(graphql`
    query SEO {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          siteImage
          siteLanguage
          authorTwitterAccount
        }
      }
    }
  `);
  const currentTitle = title || siteTitle;
  const currentDescription = description || siteDescription;
  const currentUrl = slug ? `${docs}/${slug}` : docs;
  const currentImage = createMetaImagePath(image, siteUrl, siteImage);

  return (
    <Helmet
      title={currentTitle}
      htmlAttributes={{
        lang: siteLanguage,
        prefix: 'og: http://ogp.me/ns#',
      }}
    >
      {/* General */}
      <meta name={'description'} content={currentDescription}/>
      {/* Open Graph */}
      <meta property={'og:url'} content={currentUrl}/>
      <meta property={'og:title'} content={currentTitle}/>
      <meta property={'og:description'} content={currentDescription}/>
      <meta property={'og:image'} content={currentImage}/>
      <meta property={'og:type'} content={'website'}/>
      {facebook && <meta property={'fb:app_id'} content={facebook.appId}/>}
      {/* Twitter Card tags */}
      <meta name={'twitter:card'} content={'summary'}/>
      <meta name={'twitter:creator'} content={authorTwitterAccount}/>
    </Helmet>
  );
};
