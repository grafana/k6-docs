/* eslint-disable */
const React = require('react');
const {
  Cookies,
  CookiesProvider,
  CookieBannerUniversal,
} = require('react-cookie-banner');

exports.wrapPageElement = ({ element }, pluginOptions) => {
  const {
    banner: { text, link, buttonText, linkButtonId, closeButtonId },
    cookie: { name, expiration },
    storage: { name: storageItemName },
  } = pluginOptions;
  const BannerComponent = require(__AnnouncementBannerComponent__).default;
  const cookies = new Cookies({ [name]: true });
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
              closeButtonHandler={onAccept}
              storageItemName={storageItemName}
              buttonId={linkButtonId}
              closeButtonId={closeButtonId}
            />
          )}
        </CookieBannerUniversal>
      </CookiesProvider>
      {element}
    </>
  );
};
