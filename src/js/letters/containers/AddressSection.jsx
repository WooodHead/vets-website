import React from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { invalidAddressProperty } from '../utils/helpers.jsx';

export class AddressSection extends React.Component {
  render() {
    const destination = this.props.destination || {};
    const addressLines = [
      destination.addressLine1,
      destination.addressLine2 ? `, ${destination.addressLine2}` : '',
      destination.addressLine3 ? ` ${destination.addressLine3}` : ''
    ];

    let addressContent;
    if (isEmpty(destination)) {
      addressContent = (
        <div className="step-content">
          {invalidAddressProperty}
        </div>
      );
    } else {
      addressContent = (
        <div className="step-content">
          <p>
            Downloaded documents will list your address as:
          </p>
          <div className="letters-address">{(destination.fullName || '').toLowerCase()}</div>
          <div className="letters-address">{addressLines.join('').toLowerCase()}</div>
          <div className="letters-address">{(destination.city || '').toLowerCase()}, {destination.state} {(destination.zipCode || '').toLowerCase()}</div>
          <h5>Why is this address important?</h5>
          <div>When you download a letter, it will show this address on it. If this address is incorrect you may want to update it, but your letter will still be valid even with the incorrect address. <a href="https://eauth.va.gov/wssweb/wss-common-webparts/mvc/getPCIUUpdateForm" target="_blank">Update the address that appears on your letter(s)</a>.</div>
        </div>
      );
    }

    return (
      <div>
        {addressContent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const letterState = state.letters;
  return {
    destination: letterState.destination,
  };
}

export default connect(mapStateToProps)(AddressSection);