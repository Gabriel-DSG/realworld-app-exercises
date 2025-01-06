const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Atualize conforme necessário
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // configure event listeners here
    },
  },
});