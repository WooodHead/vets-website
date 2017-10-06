import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

export default function ClaimEstimate({ maxDate, id }) {
  const estimatedDate = moment(maxDate);
  const today = moment().startOf('day');

  if (maxDate === undefined || !estimatedDate.isValid() || estimatedDate.isAfter(moment(today).add(2, 'years'))) {
    return (
      <div className="claim-completion-estimation">
        <p>Estimate not available</p>
      </div>
    );
  }

  return (
    <p>
      <span className="claim-completion-estimation">Estimated date: {estimatedDate.format('MMM D, YYYY')}</span><br/>
      {estimatedDate.isBefore(today)
        ? <span>We estimated your claim would be completed by now but we need more time.</span>
        : <span>We base this on claims similar to yours. It isn’t an exact date.</span>}<br/>
      <span><Link to={`your-claims/${id}/claim-estimate`}>Learn about this estimate</Link>.</span>
    </p>
  );
}

ClaimEstimate.propTypes = {
  maxDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};
