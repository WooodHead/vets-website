import { apiRequest } from '../../../common/helpers/api';

export const OPEN_MODAL = 'OPEN_MODAL';

export const FETCH_VA_PROFILE = 'FETCH_VA_PROFILE';
export const FETCH_VA_PROFILE_FAIL = 'FETCH_VA_PROFILE_FAIL';
export const FETCH_VA_PROFILE_SUCCESS = 'FETCH_VA_PROFILE_SUCCESS';

export const SAVE_MAILING_ADDRESS = 'SAVE_MAILING_ADDRESS';
export const SAVE_MAILING_ADDRESS_FAIL = 'SAVE_MAILING_ADDRESS_FAIL';
export const SAVE_MAILING_ADDRESS_SUCCESS = 'SAVE_MAILING_ADDRESS_SUCCESS';

export const SAVE_RESIDENTIAL_ADDRESS = 'SAVE_RESIDENTIAL_ADDRESS';
export const SAVE_RESIDENTIAL_ADDRESS_FAIL = 'SAVE_RESIDENTIAL_ADDRESS_FAIL';
export const SAVE_RESIDENTIAL_ADDRESS_SUCCESS = 'SAVE_RESIDENTIAL_ADDRESS_SUCCESS';

export const SAVE_PRIMARY_PHONE = 'SAVE_PRIMARY_PHONE';
export const SAVE_PRIMARY_PHONE_FAIL = 'SAVE_PRIMARY_PHONE_FAIL';
export const SAVE_PRIMARY_PHONE_SUCCESS = 'SAVE_PRIMARY_PHONE_SUCCESS';

export const SAVE_ALTERNATE_PHONE = 'SAVE_ALTERNATE_PHONE';
export const SAVE_ALTERNATE_PHONE_FAIL = 'SAVE_ALTERNATE_PHONE_FAIL';
export const SAVE_ALTERNATE_PHONE_SUCCESS = 'SAVE_ALTERNATE_PHONE_SUCCESS';

export const SAVE_EMAIL_ADDRESS = 'SAVE_EMAIL_ADDRESS';
export const SAVE_EMAIL_ADDRESS_FAIL = 'SAVE_EMAIL_ADDRESS_FAIL';
export const SAVE_EMAIL_ADDRESS_SUCCESS = 'SAVE_EMAIL_ADDRESS_SUCCESS';

// @todo once the endpoints are built we can actually send an API request.
function saveFieldHandler(apiRoute, requestStartAction, requestSuccessAction) {
  return fieldValue => {
    return dispatch => {
      dispatch({ type: requestStartAction });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dispatch({ type: requestSuccessAction, newValue: fieldValue }));
        }, 2000);
      });
    };
  };
}

export const updateEmailAddress = saveFieldHandler('/v0/email', SAVE_EMAIL_ADDRESS, SAVE_EMAIL_ADDRESS_SUCCESS, SAVE_EMAIL_ADDRESS_FAIL);
export const updatePrimaryPhone = saveFieldHandler('/v0/phone/primary', SAVE_PRIMARY_PHONE, SAVE_PRIMARY_PHONE_SUCCESS, SAVE_PRIMARY_PHONE_FAIL);
export const updateAlternatePhone = saveFieldHandler('/v0/phone/alternate', SAVE_ALTERNATE_PHONE, SAVE_ALTERNATE_PHONE_SUCCESS, SAVE_ALTERNATE_PHONE_FAIL);
export const updateMailingAddress = saveFieldHandler('/v0/address/mailing', SAVE_MAILING_ADDRESS, SAVE_MAILING_ADDRESS_SUCCESS, SAVE_MAILING_ADDRESS_FAIL);
export const updateResidentialAddress = saveFieldHandler('/v0/address/residential', SAVE_RESIDENTIAL_ADDRESS, SAVE_RESIDENTIAL_ADDRESS_SUCCESS, SAVE_RESIDENTIAL_ADDRESS_FAIL);

async function sendProfileRequests() {
  const result = {};
  const requests = [
    ['email', '/profile/email'],
    ['primaryTelephone', '/profile/primary_phone'],
    ['alternateTelephone', '/profile/alternate_phone'],
    ['mailingAddress', '/profile/mailing_address']
  ];

  /* eslint-disable no-await-in-loop */
  for (const [property, url] of requests) {
    let response = null;
    try {
      response = await apiRequest(url);
      result[property] = response.data.attributes;
    } catch (err) {
      // Allow the property to remain undefined
    }
  }

  return result;
}

function getVaProfile({ email, primaryTelephone, alternateTelephone, mailingAddress }) {
  return {
    email,
    primaryTelephone,
    alternateTelephone,
    mailingAddress
  };
}

function combineWithMockData(profile, realData) {
  return {
    ...realData,
    userFullName: profile.userFullName,
    dob: profile.dob,
    gender: profile.gender,
    profilePicture: '/img/profile.png',
    ssn: 'XXXXX1232',
    toursOfDuty: [
      {
        serviceBranch: 'Navy',
        dateRange: {
          start: '2018-02-17T20:31:57.286Z',
          end: '2018-02-18T20:31:57.286Z'
        }
      },
      {
        serviceBranch: 'Army',
        dateRange: {
          start: '2016-02-18T20:31:57.286Z',
          end: '2017-02-18T20:31:57.286Z'
        }
      }
    ],
    serviceAwards: [
      {
        name: 'Army Commendation Medal'
      }
    ]
  };
}

export function fetchVaProfile() {
  return async (dispatch, getState) => {
    const { user: { profile } } = getState();
    dispatch({ type: FETCH_VA_PROFILE });
    try {
      const data = await sendProfileRequests();
      const vaProfile = getVaProfile(data);
      const withMocked = combineWithMockData(profile, vaProfile);
      dispatch({ type: FETCH_VA_PROFILE_SUCCESS, newState: withMocked });
    } catch (err) {
      dispatch({ type: FETCH_VA_PROFILE_FAIL });
    }
  };
}

export function openModal(modal) {
  return { type: OPEN_MODAL, modal };
}
