/* eslint-disable import/no-extraneous-dependencies, max-len */
const React = require('react');

exports.onRenderBody = ({ setPostBodyComponents }, pluginOptions) =>
  setPostBodyComponents([
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
        window.driftAppId = '${pluginOptions.appId}';
        !function(){var t;if(!(t=window.driftt=window.drift=window.driftt||[]).init)t.invoked?window.console&&console.error&&console.error("Drift snippet included twice."):(t.invoked=!0,t.methods=["identify","config","track","reset","debug","show","ping","page","hide","off","on"],t.factory=function(e){return function(){var n;return(n=Array.prototype.slice.call(arguments)).unshift(e),t.push(n),t}},t.methods.forEach(function(e){t[e]=t.factory(e)}),t.load=function(t){var e,n,o;o=3e5*Math.ceil(new Date/3e5),(n=document.createElement("script")).type="text/javascript",n.async=!0,n.crossorigin="anonymous",n.src="https://js.driftt.com/include/"+o+"/"+t+".js",(e=document.getElementsByTagName("script")[0]).parentNode.insertBefore(n,e)})}();
        `,
      }}
    />,
  ]);
