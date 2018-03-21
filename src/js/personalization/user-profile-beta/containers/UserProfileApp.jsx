import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getVerifyUrl } from '../../../common/helpers/login-helpers.js';
import { updateVerifyUrl } from '../../../login/actions';
import {
  fetchVaProfile,
  updateEmailAddress,
  updatePrimaryPhone,
  updateAlternatePhone,
  updateResidentialAddress,
  updateMailingAddress,
  openModal
} from '../actions';

import BetaApp, { features } from '../../../common/containers/BetaApp';
import RequiredLoginView from '../../../common/components/RequiredLoginView';
import DowntimeNotification, { services } from '../../../common/containers/DowntimeNotification';
import ProfileView from '../components/ProfileView';

class UserProfileApp extends React.Component {
  componentDidMount() {
    if (!this.props.verifyUrl) {
      getVerifyUrl(this.props.updateVerifyUrl);
    }
  }

  render() {
    return (
      <div>
        <RequiredLoginView
          authRequired={1}
          serviceRequired="user-profile"
          userProfile={this.props.account}
          loginUrl={this.props.loginUrl}
          verifyUrl={this.props.verifyUrl}>
          <BetaApp featureName={features.dashboard} redirect="/beta-enrollment/personalization/">
            <DowntimeNotification appTitle="user profile page" dependencies={[services.mvi, services.emis]}>
              <div className="row user-profile-row">
                <div className="usa-width-two-thirds medium-8 small-12 columns">
                  <h1>Your Profile</h1>
                  <ProfileView
                    profile={this.props.profile}
                    modal={{
                      open: this.props.openModal,
                      currentlyOpen: this.props.profile.modal,
                      pendingSaves: this.props.profile.pendingSaves,
                      errors: this.props.profile.errors
                    }}
                    updateActions={this.props.updateActions}
                    fetchVaProfile={this.props.fetchVaProfile}/>
                </div>
              </div>
            </DowntimeNotification>
          </BetaApp>
        </RequiredLoginView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const userState = state.user;
  return {
    loginUrl: userState.login.loginUrl,
    verifyUrl: userState.login.verifyUrl,
    account: userState.profile,
    profile: state.vaProfile
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    updateVerifyUrl,
    fetchVaProfile,
    openModal
  }, dispatch);

  actions.updateActions = bindActionCreators({
    updateEmailAddress,
    updatePrimaryPhone,
    updateAlternatePhone,
    updateResidentialAddress,
    updateMailingAddress
  }, dispatch);

  return actions;
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileApp);
export { UserProfileApp };
