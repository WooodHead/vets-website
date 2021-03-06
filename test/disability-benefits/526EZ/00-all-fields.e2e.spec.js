const E2eHelpers = require('../../e2e/e2e-helpers');
const Timeouts = require('../../e2e/timeouts');
const PageHelpers = require('../../e2e/disability-benefits-helpers');
const testData = require('./schema/maximal-test.json');

const runTest = E2eHelpers.createE2eTest(
  (client) => {
    PageHelpers.initDocumentUploadMock();
    PageHelpers.initApplicationSubmitMock();

    if (process.env.BUILDTYPE !== 'production') {
    // Ensure introduction page renders.
      client
        .url(`${E2eHelpers.baseUrl}/disability-benefits/526/apply-for-increase`)
        .waitForElementVisible('body', Timeouts.normal)
        .assert.title('Apply for education benefits: Vets.gov')
        .waitForElementVisible('.schemaform-title', Timeouts.slow)  // First render of React may be slow.
        .click('.schemaform-start-button');

      E2eHelpers.overrideVetsGovApi(client);
      E2eHelpers.overrideSmoothScrolling(client);
      E2eHelpers.expectNavigateAwayFrom(client, '/introduction');

      // Chapter 1 page 1
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/chapter-one/page-one');

      // Chapter 2 page 1
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/chapter-two/page-one');

      // Chapter 3 page 1
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/chapter-three/page-three');

      // Supporting evidence
      // Orientation
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/orientation');

      // Evidence Type -- first condition
      client.axeCheck('.main');
      PageHelpers.completeEvidenceTypeInformation(client, testData.data);
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/evidence-type');

      // VA Medical Records Intro
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/va-medical-records');

      // VA Facilities
      client.axeCheck('.main');
      PageHelpers.completeVAFacilitiesInformation(client, testData.data);
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/va-facilities');

      // Private Medical Records Intro
      client.axeCheck('.main')
        .click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFromExact(client, '/supporting-evidence/0/private-medical-records');

      // Records Release
      client.axeCheck('.main');
      // BUG: form is prefilled on this page
      // PageHelpers.completeRecordReleaseInformation(client, testData.data);
      client.click('.usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/private-medical-records-release');

      // Record upload
      client.axeCheck('.main');
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/documents');

      // Additional document upload
      client.axeCheck('.main');
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/0/additionalDocuments');

      // Second Disability Evidence Type
      client.axeCheck('.main');
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/supporting-evidence/1/evidence-type');


      // chapter 5 page 1
      client.axeCheck('.main');
      client.click('.form-panel .usa-button-primary');
      E2eHelpers.expectNavigateAwayFrom(client, '/chapter-five/page-one');

      // Review and Submit Page.
      client
        .waitForElementVisible('label[name="privacyAgreement-label"]', Timeouts.slow);
      client.assert.cssClassPresent('.progress-bar-segmented div.progress-segment:nth-child(4)', 'progress-segment-complete');
      client.axeCheck('.main');

      // Accept privacy agreement
      client.click('input[type="checkbox"]');
      client.click('.form-progress-buttons .usa-button-primary');
      // E2eHelpers.expectNavigateAwayFrom(client, '/review-and-submit');
      // client.expect.element('.js-test-location').attribute('data-location')
      //   .to.not.contain('/review-and-submit').before(Timeouts.slow);

      // // Submit message
      // client.waitForElementVisible('.schemaform-confirmation-section-header', Timeouts.normal);

      client.axeCheck('.main');
      client.end();
    }
  }
);

module.exports = runTest;
