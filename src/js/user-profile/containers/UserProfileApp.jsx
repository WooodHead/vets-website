import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getVerifyUrl } from '../../common/helpers/login-helpers.js';
import { updateVerifyUrl } from '../../login/actions';
import { removeSavedForm } from '../actions';
import UserDataSection from '../components/UserDataSection';
import AuthApplicationSection from '../components/AuthApplicationSection';
import FormList from '../components/FormList';
import RequiredLoginView from '../../common/components/RequiredLoginView';
import DowntimeNotification, { services } from '../../common/containers/DowntimeNotification';

moment.updateLocale('en', {
  meridiem: (hour) => {
    if (hour < 12) {
      return 'a.m.';
    }
    return 'p.m.';
  },
  monthsShort: [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'June',
    'July',
    'Aug.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.'
  ]
});

class UserProfileApp extends React.Component {
  componentDidMount() {
    if (!this.props.verifyUrl) {
      getVerifyUrl(this.props.updateVerifyUrl);
    }
  }

  render() {
    const view = (
      <div className="row user-profile-row">
        <div className="usa-width-two-thirds medium-8 small-12 columns">
          <h1>Your Account</h1>
          <div>
            <FormList
              userProfile={this.props.user.profile}
              removeSavedForm={this.props.removeSavedForm}
              savedForms={this.props.profile.savedForms}/>
            <AuthApplicationSection
              userProfile={this.props.user.profile}
              verifyUrl={this.props.verifyUrl}/>
            <UserDataSection/>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <RequiredLoginView
          serviceRequired="user-profile"
          user={this.props.user}>
          <DowntimeNotification appTitle="user profile page" dependencies={[services.mvi, services.emis]}>
            {view}
          </DowntimeNotification>
        </RequiredLoginView>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

const mapDispatchToProps = {
  removeSavedForm,
  updateVerifyUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileApp);
export { UserProfileApp };
