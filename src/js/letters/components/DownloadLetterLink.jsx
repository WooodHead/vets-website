import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { getLetterPdf } from '../actions/letters';
import { DOWNLOAD_STATUSES } from '../utils/constants';

export class DownloadLetterLink extends React.Component {
  constructor(props) {
    super(props);
    this.downloadLetter = this.downloadLetter.bind(this);
  }

  // Either download the pdf or open it in a new window, depending on the
  // browser. Needs to be manually tested on a variety of
  // vets.gov-supported platforms, particularly iOS/Safari
  downloadLetter(e) {
    e.preventDefault();
    window.dataLayer.push({
      event: 'letter-download',
      'letter-type': this.props.letterType
    });
    this.props.getLetterPdf(this.props.letterType, this.props.letterName, this.props.letterOptions);
  }

  render() {
    let buttonClasses;
    let buttonText;
    let buttonDisabled;
    let message;
    switch (this.props.downloadStatus) {
      case DOWNLOAD_STATUSES.downloading:
        buttonClasses = 'usa-button-disabled';
        buttonText = 'Downloading...';
        buttonDisabled = true;
        break;
      case DOWNLOAD_STATUSES.success:
        buttonClasses = 'usa-button-primary va-button-primary';
        buttonText = 'Download Letter';
        buttonDisabled = false;
        message = (
          <div className="usa-alert usa-alert-success" role="alert">
            <div className="usa-alert-body">
              <h2 className="usa-alert-heading">Your letter has successfully downloaded.</h2>
              <p className="usa-alert-text">
                If you want to download your letter again, please press the button below.
              </p>
            </div>
          </div>
        );
        break;
      case DOWNLOAD_STATUSES.failure:
        buttonClasses = 'usa-button-primary va-button-primary';
        buttonText = 'Retry Download';
        buttonDisabled = false;
        message = (
          <div className="usa-alert usa-alert-error" role="alert">
            <div className="usa-alert-body">
              <h2 className="usa-alert-heading">Your letter didn’t download.</h2>
              <p className="usa-alert-text">
                Your letter isn’t available at this time. If you need help with
                accessing your letter, please call <a href="tel: 855-574-7286">
                855-574-7286</a>, Monday-Friday, 8 a.m. - 8 p.m. (ET).
              </p>
            </div>
          </div>
        );
        break;
      default:
        buttonClasses = 'usa-button-primary va-button-primary';
        buttonText = 'Download Letter';
        buttonDisabled = false;
    }

    return (
      <div>
        <div className="form-expanding-group form-expanding-group-open">
          <ReactCSSTransitionGroup
            transitionName="form-expanding-group-inner"
            transitionAppear
            transitionAppearTimeout={700}
            transitionEnterTimeout={700}
            transitionLeave={false}>
            {message}
          </ReactCSSTransitionGroup>
        </div>
        <div className="download-button">
          <button onClick={this.downloadLetter}
            disabled={buttonDisabled}
            className={buttonClasses}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    letterType: ownProps.letterType,
    letterName: ownProps.letterName,
    downloadStatus: ownProps.downloadStatus,
    letterOptions: state.letters.requestOptions
  };
}

DownloadLetterLink.PropTypes = {
  letterType: PropTypes.string.required,
  letterName: PropTypes.string.required,
  downloadStatus: PropTypes.string
};

const mapDispatchToProps = {
  getLetterPdf
};

export default connect(mapStateToProps, mapDispatchToProps)(DownloadLetterLink);
