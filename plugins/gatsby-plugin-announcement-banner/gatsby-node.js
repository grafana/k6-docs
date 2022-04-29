/* eslint-disable import/no-extraneous-dependencies */
const { DefinePlugin } = require('webpack');

exports.onCreateWebpackConfig = (
  { actions },
  { banner: { componentPath } },
) => {
  actions.setWebpackConfig({
    plugins: [
      new DefinePlugin({
        __AnnouncementBannerComponent__: JSON.stringify(componentPath),
      }),
    ],
  });
};
