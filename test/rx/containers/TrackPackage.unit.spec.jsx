import React from 'react';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';
// import { set } from 'lodash/fp';

import { TrackPackage } from '../../../src/js/rx/containers/TrackPackage';
import { trackings } from '../../e2e/rx-helpers.js';

const props = {
  isPending: false,
  items: trackings.data
};

describe('<TrackPackage>', () => {
  it('should render', () => {
    const tree = SkinDeep.shallowRender(<TrackPackage {...props}/>);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.be.ok;
  });

  it('should render tracking info when available', () => {
    const tree = SkinDeep.shallowRender(<TrackPackage {...props}/>);
    expect(tree.dive(['.rx-tab-explainer']).text()).to.equal(
      'Tracking information for each order expires 30 days after shipment.'
    );

    const table = tree.dive(['.rx-detail-history']);
    const rows = table.dive(['tbody']).everySubTree('tr');

    expect(table).to.be.ok;
    rows.forEach((row, rowIndex) => {
      const attrs = trackings.data[rowIndex].attributes;

      expect(row.dive(['TrackPackageLink']).text())
        .to.equal(attrs.trackingNumber);

      rows[rowIndex].everySubTree('div').forEach((div, divIndex) => {
        if (divIndex === 0) {
          expect(div.text()).to.equal(attrs.prescriptionName);
        } else {
          expect(div.text()).to.equal(attrs.otherPrescriptions[divIndex - 1].prescriptionName);
        }
      });
    });
  });
});
