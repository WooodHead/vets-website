import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { focusElement } from '../../../common/utils/helpers';
import OMBInfo from '../../../common/components/OMBInfo';
import FormTitle from '../../../common/schemaform/FormTitle';

import SaveInProgressIntro, { introActions, introSelector } from '../../../common/schemaform/SaveInProgressIntro';


class IntroductionPage extends React.Component {
  componentDidMount() {
    focusElement('.va-nav-breadcrumbs-list');
  }
  render() {
    return (
      <div className="schemaform-intro">
        <FormTitle title="Manage your education benefits"/>
        <p>Equal to VA Form 22-5495 (Dependents’ Request for Change of Program or Place of Training).</p>
        <div className="process schemaform-process">
          <ol>
            <li className="process-step list-one">
              <div><h5>Prepare</h5></div>
              <div><h6>To fill out this application, you'll need your:</h6></div>
              <ul>
                <li>Social Security number (required)</li>
                <li>Basic information about the school or training facility you want to attend (required)</li>
                <li>Bank account direct deposit information</li>
                <li>Education history</li>
              </ul>
              <h6>Learn about educational programs</h6>
              <ul>
                <li>See what benefits you’ll get at the school you want to attend. <a href="/gi-bill-comparison-tool/">Use the GI Bill Comparison Tool</a>.</li>
              </ul>
            </li>
            <li className="process-step list-two">
              <div><h5>Apply</h5></div>
              <p>Complete this education benefits form.</p>
              <p>After submitting the form, you’ll get a confirmation message. You can print this for your records.</p>
            </li>
            <li className="process-step list-three">
              <div><h5>VA Review</h5></div>
              <p>We usually process claims within 30 days.</p>
              <p>We’ll let you know by mail if we need more information.</p>
              <ul><li>We offer tools and counseling programs to help you make the most of your educational options. <a href="/education/tools-programs/">Learn about career counseling options.</a></li></ul>
            </li>
            <li className="process-step list-four">
              <div><h5>Decision</h5></div>
              <ul><li>You’ll get a Certificate of Eligibility (COE), or award letter, in the mail if we've approved your application. Bring this to the VA certifying official at your school.</li></ul>
              <ul><li>If your application wasn’t approved, you’ll get a denial letter in the mail.</li></ul>
            </li>
          </ol>
        </div>
        <SaveInProgressIntro
          pageList={this.props.route.pageList}
          messages={this.props.route.formConfig.savedFormMessages}
          {...this.props.saveInProgressActions}
          {...this.props.saveInProgress}>
          Please complete the 22-5495 form to apply to manage your education benefits.
        </SaveInProgressIntro>
        {/* TODO: Remove inline style after I figure out why .omb-info--container has a left padding */}
        <div className="omb-info--container" style={{ paddingLeft: '0px' }}>
          <OMBInfo resBurden={20} ombNumber="2900-0074" expDate="05/31/2018"/>
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
