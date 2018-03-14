import React from 'react';

import { transformForSubmit } from '../../common/schemaform/helpers';
import AdditionalInfo from '../../common/components/AdditionalInfo';


export function transform(formConfig, form) {
  const formData = transformForSubmit(formConfig, form);
  return JSON.stringify({
    educationBenefitsClaim: {
      form: formData
    }
  });
}


export const supportingEvidenceOrientation = (
  <p>We’ll now ask you where we can find medical records or evidence about your worsened conditions after they were rated. You don’t need to turn in any medical records that you’ve already submitted with your original claim. <strong>We only need new medical records or other evidence about your condition after you got your disability rating.</strong></p>
);


export const evidenceTypesDescription = ({ formData }) => {
  return (
    <p>What supporting evidence do you have that shows how your {formData.disability.diagnosticText} <strong>has worsened since VA rated your disability</strong>?</p>
  );
};


export const evidenceTypeHelp = (
  <AdditionalInfo triggerText="Which should I choose?">
    <h3>Types of evidence</h3>
    <h4>VA medical records</h4>
    <p>If you were treated at a VA medical center or clinic, you have VA medical records. This includes Tri-Care.</p>
    <h4>Private medical records</h4>
    <p>If you were treated by a private doctor, including Veteran’s Choice, we will need to see those records to proceed with your claim. Like DBQs.</p>
    <h4>Lay statements or other evidence</h4>
    <p>Also known as "buddy statements," written accounts from family or other people who know you can help support a claim. In most cases your medical records are enough, but claims involving Post Traumatic Stress Disorder or Military Sexual Trauma sometimes benefit from Lay Statements.</p>
  </AdditionalInfo>
);


export const disabilityNameTitle = ({ formData }) => {
  return (
    <legend className="schemaform-block-title schemaform-title-underline">{formData.disability.diagnosticText}</legend>
  );
};


export const facilityDescription = ({ formData }) => {
  return (
    <p>Tell us about facilities where VA treated you for {formData.disability.diagnosticText}, <strong>after you got your disability rating</strong>.</p>
  );
};


export const treatmentView = ({ formData }) => {
  const { startTreatment, endTreatment, treatmentCenterName } = formData.treatment;
  let treatmentPeriod = '';

  if (startTreatment && endTreatment) {
    treatmentPeriod = `${startTreatment} — ${endTreatment}`;
  } else if (startTreatment || endTreatment) {
    treatmentPeriod = `${(startTreatment || endTreatment)}`;
  }


  return (
    <div>
      <strong>{treatmentCenterName}</strong><br/>
      {treatmentPeriod}
    </div>
  );
};


export const vaMedicalRecordsIntro = ({ formData }) => {
  return (
    <p>Ok, first we’ll ask about your VA medical records related to your {formData.disability.diagnosticText}.</p>
  );
};


export const privateRecordsChoice = ({ formData }) => {
  return (
    <div>
      <h4>About private medical records</h4>
      <p>You said you were treated for {formData.disability.diagnosticText} by a private doctor. If you have those records, you can upload them here, or we can get them for you. If you want us to get your records, you’ll need to authorize their release.</p>
    </div>
  );
};


export const privateRecordsChoiceHelp = (
  <AdditionalInfo triggerText="Which should I choose?">
    <h5>Uploading your medical records</h5>
    <p>If you have an electronic copy of your medical records, uploading your records can speed the review of your claim.</p>
    <p>This works best if you have a fast internet connection and time for a large file upload. Records should be .pdf, .jpg, or .png files.</p>
    <h5>We get your records for you</h5>
    <p>If you tell us which VA medical center treated you for your condition, we can get your medical records for you. Getting your records may take us some time. This could take us longer to make a decision on your claim.</p>
  </AdditionalInfo>
);


export const privateMedicalRecordsIntro = ({ formData }) => {
  return (
    <p>Ok, first we’ll ask about your private medical records related to your {formData.disability.diagnosticText}.</p>
  );
};

