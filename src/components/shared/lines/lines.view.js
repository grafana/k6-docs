import React from 'react';

import Image1 from './svg/image1.inline.svg';
import Image2 from './svg/image2.inline.svg';
import Image3 from './svg/image3.inline.svg';
import Image4 from './svg/image4.inline.svg';
import Image5 from './svg/image5.inline.svg';
import Image6 from './svg/image6.inline.svg';
import Image7 from './svg/image7.inline.svg';
import styles from './lines.module.scss';
import './lines.scss';

const images = {
  1: <Image1/>,
  2: <Image2/>,
  3: <Image3/>,
  4: <Image4/>,
  5: <Image5/>,
  6: <Image6/>,
  7: <Image7/>,
};

export const Lines = ({ className, imageNumber }) => (
  <div className={`${styles.wrapper} ${className || ''}`}>
    {images[imageNumber]}
  </div>
);
