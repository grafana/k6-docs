require('./src/styles/styles.scss');

export const shouldUpdateScroll = ({ routerProps }) => {
  const { disableScrollUpdate } = routerProps.location.state;

  return !disableScrollUpdate;
};
