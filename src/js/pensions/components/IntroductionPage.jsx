import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { focusElement } from '../../common/utils/helpers';
import OMBInfo from '../../common/components/OMBInfo';
import FormTitle from '../../common/schemaform/components/FormTitle';
import SaveInProgressIntro, { introActions, introSelector } from '../../common/schemaform/save-in-progress/SaveInProgressIntro';

class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }
  goForward = () => {
    this.props.router.push(this.props.route.pageList[1].path);
  }
  render() {
    const isProduction = __BUILDTYPE__ === 'production';
    return (
      <div className="schemaform-intro">
        <FormTitle title="Apply for Veterans pension benefits"/>
        <p>Equal to VA Form 21P-527EZ (Application for Pension).</p>
        {!isProduction && <SaveInProgressIntro
          prefillEnabled={this.props.route.formConfig.prefillEnabled}
          pageList={this.props.route.pageList}
          startText="Start the Pension Application"
          {...this.props.saveInProgressActions}
          {...this.props.saveInProgress}>
          Please complete the 21-527EZ form to apply for pension benefits.
        </SaveInProgressIntro>}
        {isProduction && <div className="usa-alert usa-alert-warning">
          <div className="usa-alert-body">
            We’re sorry. Our online application isn’t available right now. We’re working to make it easier for you to apply for benefits online, so please check back later to see our new and improved process.
          </div>
        </div>}
        <h4>Follow the steps below to apply for a Veterans pension.</h4>
        <div className="process schemaform-process schemaform-process-sip">
          <ol>
            <li className="process-step list-one">
              <div><h5>Prepare</h5></div>
              <div><h6>To fill out this application, you’ll need your:</h6></div>
              <ul>
                <li>Social Security number or VA file number (required)</li>
                <li>Military history (required)</li>
                <li>Financial information—and your dependents’ financial information (required)</li>
                <li>Bank account direct deposit information</li>
                <li>Medical information</li>
              </ul>
              <h6>If you’re under 65 years old, you may also need:</h6>
              <ul>
                <li>Your work history</li>
                <li>Any medical evidence that supports your claim</li>
              </ul>
              <div className="usa-alert usa-alert-info">
                <div className="usa-alert-body">
                  <h4 className="usa-alert-heading">Fully Developed Claim (FDC) Program</h4>
                  <div className="usa-alert-text">
                    <p>The Fully Developed Claim (FDC) program is the fastest way to get your claim processed, and there's no risk for you to participate. With this program, you send in all the evidence, or supporting documents, you have when you file your claim. We can make a decision on your application without asking you for more information.</p>
                    <a href="/pension/apply/fully-developed-claim/" target="_blank">Learn more about the FDC Program</a>.
                  </div>
                </div>
              </div>
              <br/>
              <p><strong>You might quality for Aid and Attendance and Housebound benefits</strong></p>
              <a href="/pension/aid-attendance-housebound/" target="_blank">Learn more about Aid and Attendance and Housebound Benefits</a>.<br/><br/>
              <p><strong>What if I need help filling out my application?</strong> An accredited representative, like a Veterans Service Officer (VSO), can help you fill out your claim. <a href="/disability-benefits/apply/help/index.html">Get help filing your claim</a>.</p>
              <h6>Learn about Veterans pension rates</h6>
              <a href="/pension/rates/" target="_blank">Find out how we decide pension rates.</a>
            </li>
            <li className="process-step list-two">
              <div><h5>Apply</h5></div>
              <p>Complete an Application for Pension (VA Form 21P-527EZ). <br/><a href="https://www.vba.va.gov/pubs/forms/VBA-21P-527EZ-ARE.pdf">Download VA Form 21P-527EZ</a>.</p>
              <p>Mail the application to the Pension Management Center (PMC) for your state. <br/><a href="/pension/pension-management-center/">Find your PMC</a>.</p>
            </li>
            <li className="process-step list-three">
              <div><h5>VA Review</h5></div>
              <p>We process claims in the order we receive them.</p>
              <p>We’ll let you know by mail if we need more information.</p>
            </li>
            <li className="process-step list-four">
              <div><h5>Decision</h5></div>
              <p>After we process your claim, you’ll get a notice in the mail about the decision.</p>
            </li>
          </ol>
        </div>
        {/* <SaveInProgressIntro */}
        {/*   buttonOnly */}
        {/*   pageList={this.props.route.pageList} */}
        {/*   startText="Start the Pension Application" */}
        {/*   {...this.props.saveInProgressActions} */}
        {/*   {...this.props.saveInProgress}/> */}
        <div className="omb-info--container" style={{ paddingLeft: '0px' }}>
          <OMBInfo resBurden={25} ombNumber="2900-0002" expDate="04/30/2019"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saveInProgress: introSelector(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveInProgressActions: bindActionCreators(introActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);

export { IntroductionPage };
