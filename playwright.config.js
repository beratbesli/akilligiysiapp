const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/browser',
  use: {
    baseURL: 'http://127.0.0.1:4179',
    browserName: 'chromium',
  },
  webServer: {
    command: 'python -m http.server 4179 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4179',
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
