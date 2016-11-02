const E2eHelpers = require('../util/e2e-helpers');
const Timeouts = require('../util/timeouts.js');
const DisabilityHelpers = require('../util/disability-helpers');
const LoginHelpers = require('../util/login-helpers');

module.exports = E2eHelpers.createE2eTest(
  (client) => {
    DisabilityHelpers.initClaimsListMock();

    LoginHelpers.logIn(client, '/disability-benefits/track-claims', 3);

    client
      .url(`${E2eHelpers.baseUrl}/disability-benefits/track-claims`)
      .waitForElementVisible('a.claim-list-item', Timeouts.normal)
      .axeCheck('.main');

    client.end();
  }
);

