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
    btnLink = '/cloud',
  } = props;
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query cloudImageQuery {
      file(name: { eq: "cloud-promo@2x" }) {
        childImageSharp {
          fluid(maxWidth: 370) {
            ...GatsbyImageSharpFluid_withWebp_noBase64
          }
        }
      }
    }
  `);
  return (
    <CtaDoc
      image={fluid}
      title={title}
      description={description}
      btnText={btnText}
      btnLink={btnLink}
      isExternal={isExternal}
      btnTarget={btnTarget}
    />
  );
};
