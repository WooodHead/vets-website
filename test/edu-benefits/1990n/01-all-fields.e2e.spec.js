const E2eHelpers = require('../../e2e/e2e-helpers');
const Timeouts = require('../../e2e/timeouts.js');
const EduHelpers = require('../../e2e/edu-helpers');
const testData = require('./schema/maximal-test.json');

module.exports = E2eHelpers.createE2eTest(
  (client) => {
    EduHelpers.initApplicationSubmitMock('1990n');

    // Introduction page renders
    client
      .url(`${E2eHelpers.baseUrl}/education/apply-for-education-benefits/application/1990N`)
      .waitForElementVisible('body', Timeouts.normal)
      .assert.title('Apply for education benefits: Vets.gov')
      .waitForElementVisible('.usa-button-primary', Timeouts.slow)
      .axeCheck('.main')
      .click('.usa-button-primary');
    E2eHelpers.overrideVetsGovApi(client);
    E2eHelpers.overrideSmoothScrolling(client);
    E2eHelpers.expectNavigateAwayFrom(client, '/introduction');

    // Applicant information page
    client.waitForElementVisible('input[name="root_veteranFullName_first"]', Timeouts.slow);
    EduHelpers.completeVeteranInformation(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/applicant/information');

    // Additional benefits page
    client.waitForElementVisible('label[for="root_civilianBenefitsAssistanceYes"]', Timeouts.slow);
    EduHelpers.completeAdditionalBenefits(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/applicant/additional-benefits');

    // Applicant service page
    client.waitForElementVisible('input[id="root_toursOfDuty_0_serviceBranch"]', Timeouts.slow);
    EduHelpers.completeServicePeriods(client, testData.data, false);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/applicant/service');

    // Benefits selection page
    client.waitForElementVisible('label[for="root_payHighestRateBenefit"]', Timeouts.slow);
    EduHelpers.completeBenefitsSelection(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/benefits/eligibility');

    // School selection page
    client.waitForElementVisible('input[name="root_educationProgram_name"]', Timeouts.slow);
    EduHelpers.completeSchoolSelection(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/school-selection');

    // Contact information page
    client.waitForElementVisible('label[for="root_preferredContactMethod_0"]', Timeouts.slow);
    EduHelpers.completeContactInformation(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/personal-information/contact-information');

    // Direct deposit page
    client.waitForElementVisible('label[for="root_bankAccount_accountType_0"]', Timeouts.slow);
    EduHelpers.completeDirectDeposit(client, testData.data);
    client
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary');
    E2eHelpers.expectNavigateAwayFrom(client, '/personal-information/direct-deposit');

    // Review and submit page
    client
      .waitForElementVisible('label[name="privacyAgreement-label"]', Timeouts.slow)
      .pause(1000)
      .click('input[type="checkbox"]')
      .axeCheck('.main')
      .click('.form-progress-buttons .usa-button-primary')
      .expect.element('.js-test-location').attribute('data-location')
      .to.not.contain('/review-and-submit').before(Timeouts.slow);

    // Confirmation page
    client.waitForElementVisible('.confirmation-page-title', Timeouts.normal);
    client
      .axeCheck('.main')
      .end();
  }
);
