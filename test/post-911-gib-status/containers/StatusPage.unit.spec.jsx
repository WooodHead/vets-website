import React from 'react';
import { findDOMNode } from 'react-dom';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import sinon from 'sinon';
import ReactTestUtils from 'react-dom/test-utils';

import StatusPage from '../../../src/js/post-911-gib-status/containers/StatusPage.jsx';

import reducer from '../../../src/js/post-911-gib-status/reducers/index.js';
import createCommonStore from '../../../src/js/common/store';

const store = createCommonStore(reducer);
const defaultProps = store.getState();
defaultProps.post911GIBStatus = {
  enrollmentData: {
    veteranIsEligible: true,
    remainingEntitlement: {},
    originalEntitlement: {},
    usedEntitlement: {}
  }
};

let oldFetch;
const setup = () => {
  oldFetch = global.fetch;
  global.sessionStorage = {
    userToken: '123abc'
  };
  global.fetch = sinon.stub();
  global.fetch.returns(Promise.resolve({ ok: true }));
};
const teardown = () => {
  global.fetch = oldFetch;
};

describe('<StatusPage>', () => {
  beforeEach(setup);
  it('should render', () => {
<<<<<<< HEAD
    const tree = SkinDeep.shallowRender(<StatusPage store={store} {...defaultProps}/>);
=======
    const tree = SkinDeep.shallowRender(<StatusPage store={store} enrollmentData={{ veteranIsEligible: true }}/>);
>>>>>>> 2b30e8c... Fix all but one failing test
    const vdom = tree.getRenderOutput();
    expect(vdom).to.exist;
  });

  it('should show title and print button', () => {
<<<<<<< HEAD
    const node = findDOMNode(ReactTestUtils.renderIntoDocument(<StatusPage store={store} {...defaultProps}/>));
=======
    const node = findDOMNode(ReactTestUtils.renderIntoDocument(<StatusPage store={store} enrollmentData={{ veteranIsEligible: true }}/>));
>>>>>>> 2b30e8c... Fix all but one failing test
    expect(node.querySelector('.schemaform-title').textContent)
      .to.contain('Post-9/11 GI Bill Statement of Benefits');
    expect(node.querySelector('.usa-button-primary').textContent)
      .to.contain('Print Benefit Information');
  });

  it('should not show intro and print button if veteran is not eligible', () => {
    const props = {
      enrollmentData: {
        veteranIsEligible: false,
        originalEntitlement: {},
        usedEntitlement: {},
        remainingEntitlement: {},
      }
    };

    const tree = SkinDeep.shallowRender(<StatusPage store={store} {...props}/>);
    expect(tree.subTree('.va-introtext')).to.be.false;
    expect(tree.subTree('.usa-button-primary')).to.be.false;
  });
  afterEach(teardown);
});

