const E2eHelpers = require('../e2e/e2e-helpers');
const Timeouts = require('../e2e/timeouts.js');
const MessagingHelpers = require('../e2e/messaging-helpers');
const LoginHelpers = require('../e2e/login-helpers');
const AccountCreationHelpers = require('../e2e/account-creation-helpers');

module.exports = E2eHelpers.createE2eTest(
  (client) => {
    const token = LoginHelpers.getUserToken();

    MessagingHelpers.initApplicationSubmitMock(token);
    AccountCreationHelpers.initMHVTermsMocks(token);
    LoginHelpers.logIn(token, client, '/health-care/messaging', 3);

    // Desktop test
    client.resizeWindow(1000, 800);

    // Ensure messaging home page renders
    client
      .url(`${E2eHelpers.baseUrl}/health-care/messaging`)
      .waitForElementVisible('body', Timeouts.normal)
      .assert.title('Message Your Health Care Team: Vets.gov')
      .waitForElementVisible('#messaging-app', Timeouts.slow);

    // Inbox/Folder view
    client
      .waitForElementVisible('#messaging-nav', Timeouts.slow)
      .waitForElementVisible('#messaging-content', Timeouts.slow)
      .waitForElementVisible('#messaging-folder-controls', Timeouts.normal)
      // expect messages to show up
      .expect.element('.msg-table-list td:nth-of-type(1) a:nth-of-type(1)').text.to.equal('Clinician');

    client.click('.msg-table-list td:nth-of-type(1) a:nth-of-type(1)');
    // ensure thread view loads correctly
    client
      .waitForElementVisible('#messaging-nav', Timeouts.slow)
      .waitForElementVisible('#messaging-content', Timeouts.normal)
      .expect.element('.messaging-thread-messages .messaging-thread-message:last-of-type .messaging-message-body').text.to.equal('Reply 3');
    // expand previous message in thread
    client
      .click('.messaging-thread-messages .messaging-thread-message:first-of-type')
      .expect.element('.messaging-thread-messages .messaging-thread-message:first-of-type .messaging-message-body').text.to.equal('Message');

    // Compose message view
    client
      .click('#messaging-nav .messaging-compose-button')
      .waitForElementVisible('textarea[name="messageText"]', Timeouts.normal)
      .selectDropdown('messageRecipient', '0')
      .selectDropdown('messageCategory', 'APPOINTMENTS');

    // set message body
    client.setValue('textarea[name="messageText"]', 'Test');
    // send message successfully
    client.click('.msg-send-buttons button:nth-of-type(1)')
      .waitForElementVisible('#messaging-nav', Timeouts.normal)
      // ensure success alert box is shown
      .waitForElementVisible('.usa-alert-success', Timeouts.normal);

    client.end();
  }
);
