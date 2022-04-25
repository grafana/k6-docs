const utils = require('utils');

exports.onInitialClientRender = () => {
  if (utils.isInIFrame()) {
    return;
  }

  if (typeof drift === 'object' && window.drift && window.driftAppId) {
    window.drift.SNIPPET_VERSION = '0.3.1';
    window.drift.load(window.driftAppId);

    const sidebarClickOutside = (e) => {
      const sidebar = document.getElementById('drift-widget-container');
      if (!sidebar.contains(e.target)) {
        window.drift.api.sidebar.close();
      }
    };
    // hide default drift icon on load
    window.drift.on('ready', (api) => {
      api.widget.hide();
      window.drift.on('sidebarClose', () => {
        document.removeEventListener('click', sidebarClickOutside);
      });
      window.drift.on('sidebarOpen', () => {
        document.addEventListener('click', sidebarClickOutside);
      });
    });
  }
};
