import React from 'react';
import ApplicationFormComponent from "../ApplicationFormComponent";
import {PageLabels, SectionHeaders} from '@cdo/apps/generated/pd/teacher1819ApplicationConstants';
import {isEmail, isZipCode} from '@cdo/apps/util/formatValidation';
import SchoolAutocompleteDropdown from '@cdo/apps/templates/SchoolAutocompleteDropdown';
import {
  Row,
  Col,
  ControlLabel,
  FormGroup
} from 'react-bootstrap';
import {styles} from './TeacherApplicationConstants';

export default class Section2YourSchool extends ApplicationFormComponent {
  static labels = PageLabels.section2YourSchool;

  static associatedFields = [
    ...Object.keys(PageLabels.section2YourSchool),
    "currentRole_other",
    "gradesTeaching_notTeachingExplanation",
    "subjectsTeaching_other",
    "subjectsExpectToTeach_other",
    "subjectsLicensedToTeach_other",
    "taughtInPast_other",
    "csOfferedAtSchool_other",
    "csOpportunitiesAtSchool_other"
  ];

  /**
   * @override
   */
  handleChange(newState) {
    if (newState.school || newState.schoolState || newState.schoolZipCode) {
      // School info changed? Clear page 4 partner and workshop mapping
      newState.ableToAttendSingle = undefined;
      newState.ableToAttendMultiple = undefined;
      newState.alternateWorkshops = undefined;
    }

    super.handleChange(newState);
  }

  handleSchoolChange = selectedSchool => {
    this.handleChange({school: selectedSchool && selectedSchool.value});
  };

  render() {
    return (
      <FormGroup>
        <h3>Section 2: {SectionHeaders.section2YourSchool}</h3>

        <p>
          If you work in a school district, please select your district and school below:
        </p>

        <FormGroup
          id="school"
          controlId="school"
          validationState={this.getValidationState("school")}
        >
          <Row>
            <Col md={6}>
              <ControlLabel>
                School
                <span style={{color: 'red'}}> *</span>
              </ControlLabel>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <SchoolAutocompleteDropdown
                value={this.props.data.school}
                onChange={this.handleSchoolChange}
              />
            </Col>
          </Row>
        </FormGroup>

        {this.props.data.school && this.props.data.school === '-1' &&
          <div style={styles.indented}>
            {this.inputFor("schoolName")}
            {this.inputFor("schoolAddress")}
            {this.inputFor("schoolCity")}
            {this.selectFor("schoolState", {placeholder: "Select a state"})}
            {this.inputFor("schoolZipCode")}
            {this.radioButtonsFor("schoolType")}
          </div>
        }

        {this.inputFor("principalFirstName")}
        {this.inputFor("principalLastName")}
        {this.selectFor("principalTitle", {
          placeholder: "Select a title",
          required: false
        })}
        {this.inputFor("principalEmail")}
        {this.inputFor("principalConfirmEmail")}
        {this.usPhoneNumberInputFor("principalPhoneNumber")}

        {this.radioButtonsWithAdditionalTextFieldsFor("currentRole", {
          "Other (Please List):" : "other"
        })}

        {this.checkBoxesFor("gradesAtSchool")}

        {this.checkBoxesWithAdditionalTextFieldsFor("gradesTeaching", {
          "I'm not teaching this year (please explain):" : "notTeachingExplanation"
        })}

        {this.checkBoxesFor("gradesExpectToTeach")}

        {this.checkBoxesWithAdditionalTextFieldsFor("subjectsTeaching", {
          "Other (Please List):" : "other"
        })}

        {this.checkBoxesWithAdditionalTextFieldsFor("subjectsExpectToTeach", {
          "Other (Please List):" : "other"
        })}

        <p style={styles.formText}>
          Requirements for licensing, certifications, and endorsements to teach computer science vary widely
          across the country. Please answer the following questions to the best of your knowledge, so that
          your Regional Partner can ensure that teachers selected for this program will be able to teach the
          course in the coming school year.
        </p>
        <p style={styles.formText}>
          Note: Code.org does not require specific licences to teach these courses, but to participate in this
          program, you must be able to teach this course during the 2018-19 school year.
        </p>

        {this.radioButtonsFor("doesSchoolRequireCsLicense")}
        {this.radioButtonsFor("haveCsLicense")}

        {this.checkBoxesWithAdditionalTextFieldsFor("subjectsLicensedToTeach", {
          "Other (Please List):" : "other"
        })}

        {this.checkBoxesWithAdditionalTextFieldsFor("taughtInPast", {
          "Other (Please List):" : "other"
        })}

        {this.checkBoxesFor("previousYearlongCdoPd")}

        {this.checkBoxesWithAdditionalTextFieldsFor("csOfferedAtSchool", {
          "Other (Please List):" : "other"
        })}

        {this.checkBoxesWithAdditionalTextFieldsFor("csOpportunitiesAtSchool", {
          "Other:" : "other"
        })}

      </FormGroup>
    );
  }

  /**
   * @override
   */
  static getDynamicallyRequiredFields(data) {
    const requiredFields = [];

    if (data.school && data.school === '-1') {
      requiredFields.push(
        "schoolName",
        "schoolAddress",
        "schoolCity",
        "schoolState",
        "schoolZipCode",
        "schoolType"
      );
    }

    return requiredFields;
  }

  /**
   * @override
   */
  static getErrorMessages(data) {
    const formatErrors = {};

    if (data.school && data.school === '-1' && data.schoolZipCode && !isZipCode(data.schoolZipCode)) {
      formatErrors.schoolZipCode = "Must be a valid zip code";
    }

    if (data.principalEmail) {
      if (!isEmail(data.principalEmail)) {
        formatErrors.principalEmail = "Must be a valid email address";
      }
      if (data.principalConfirmEmail && data.principalEmail !== data.principalConfirmEmail) {
        formatErrors.principalConfirmEmail = "Must match the principal email";
      }
    }

    return formatErrors;
  }

  /**
   * @override
   */
  static processPageData(data) {
    const changes = {};

    if (data.school && data.school !== '-1') {
      changes.schoolName = undefined;
      changes.schoolAddress = undefined;
      changes.schoolCity = undefined;
      changes.schoolState = undefined;
      changes.schoolZipCode = undefined;
      changes.schoolType = undefined;
    }

    return changes;
  }
}
