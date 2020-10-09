/* eslint-disable */
const React = require('react');
const { trackCustomEvent } = require('gatsby-plugin-google-analytics');
const {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} = require('react-cookie-banner');

exports.wrapPageElement = ({ element }, pluginOptions) => {
  const {
    banner: { text, link, buttonText },
    cookie: { name, expiration, consentBannerCookieName },
    storage: { name: storageItemName },
    ga: { label, action, readMoreButtonCategory, dismissButtonCategory } = {},
  } = pluginOptions;
  const BannerComponent = require(__AnnouncementBannerComponent__).default;
  const cookies = new Cookies({ [name]: true });
  const isGAEnabled =
    label && action && readMoreButtonCategory && dismissButtonCategory;

  const readMoreButtonClickHandler = () => {
    if (isGAEnabled) {
      trackCustomEvent({
        label,
        action,
        category: readMoreButtonCategory,
      });
    }
  };

  const closeButtonClickHandler = (cb) => () => {
    if (isGAEnabled) {
      trackCustomEvent({
        label,
        action,
        category: dismissButtonCategory,
      });
    }
    cb();
  };

  if (!cookies.get(consentBannerCookieName)) {
    return element;
  }

  return (
    <>
      <CookiesProvider cookies={cookies}>
        <CookieBannerUniversal
          disableStyle
          cookie={name}
          dismissOnClick={false}
          dismissOnScroll={false}
          cookieExpiration={expiration}
          cookiePath={'/'}
        >
          {(onAccept) => (
            <BannerComponent
              text={text}
              link={link}
              buttonText={buttonText}
              readMoreButtonClickHandler={readMoreButtonClickHandler}
              dismissButtonClickHandler={closeButtonClickHandler(onAccept)}
              storageItemName={storageItemName}
            />
          )}
        </CookieBannerUniversal>
      </CookiesProvider>
      {element}
    </>
  );
};
