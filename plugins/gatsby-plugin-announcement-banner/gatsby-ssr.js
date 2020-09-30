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
          disableStyele
          cookie={name}
          dismissOnClick={false}
          dismissOnScroll={false}
          cookieExpiration={expiration}
        >
          {(onAccept) => (
            <BannerComponent
              text={text}
              link={link}
              buttonText={buttonText}
              handleClick={onAccept}
              buttonId={linkButtonId}
              closeButtonId={closeButtonId}
              storageItemName={storageItemName}
            />
          )}
        </CookieBannerUniversal>
      </CookiesProvider>
      {element}
    </>
  );
};
