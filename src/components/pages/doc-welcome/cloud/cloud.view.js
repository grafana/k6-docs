import * as React from 'react';
import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';
import styles from './cloud.module.scss';
import { Button } from 'components/shared/button';

export const Cloud = props => {
  const { title, description, buttonText, href = '/cloud' } = props;
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
    <section className={`container ${styles.wrapper}`}>
      <div className={`row ${styles.inner}`}>
        <div className={`col-md-6 col-12 ${styles.hook}`}>
          <div className={styles.imgWrapper}>
            <Img fluid={fluid} className={styles.img} />
          </div>
        </div>
        <div className={`col-md-6 col-12 ${styles.hook}`}>
          <div className={styles.cloudText}>
            <h3>{title}</h3>
            <p>{description}</p>
            <Button className={styles.button} tag={'a'} href={href} cursor>
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
