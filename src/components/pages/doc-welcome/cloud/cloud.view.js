import { CtaDoc } from 'components/shared/cta-doc';
import { graphql, useStaticQuery } from 'gatsby';
import * as React from 'react';

export const Cloud = (props) => {
  const {
    title,
    description,
    isExternal,
    btnText,
    btnTarget,
    btnLink = '/cloud/',
  } = props;
  const { file: image } = useStaticQuery(graphql`
    query cloudImageQuery {
      file(name: { eq: "cloud-promo@2x" }) {
        childImageSharp {
          gatsbyImageData(width: 370)
        }
      }
    }
  `);
  return (
    <CtaDoc
      image={image}
      title={title}
      description={description}
      btnText={btnText}
      btnLink={btnLink}
      isExternal={isExternal}
      btnTarget={btnTarget}
    />
  );
};
