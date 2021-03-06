import { expect } from 'chai';
import React from 'react';
import SkinDeep from 'skin-deep';

import { fileHelp } from '../../src/js/pensions/helpers.jsx';

describe('Pensions helpers', () => {
  const FileHelp = fileHelp;
  describe('fileHelp', () => {
    it('should render', () => {
      const formData = {
        'view:aidAttendance': true
      };
      const tree = SkinDeep.shallowRender(
        <FileHelp
          formData={formData}/>
      );

      expect(tree.text()).to.contain('Please upload all doc');
      expect(tree.everySubTree('li').length).to.equal(2);
    });
    it('should show disabled child bullet', () => {
      const formData = {
        dependents: [{
          disabled: true
        }]
      };
      const tree = SkinDeep.shallowRender(
        <FileHelp
          formData={formData}/>
      );

      expect(tree.everySubTree('li').length).to.equal(3);
    });
    it('should show school child bullet', () => {
      const formData = {
        dependents: [{
          attendingCollege: true
        }]
      };
      const tree = SkinDeep.shallowRender(
        <FileHelp
          formData={formData}/>
      );

      expect(tree.everySubTree('li').length).to.equal(3);
    });
  });
});
