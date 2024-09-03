import React from "react";
import UiContent from "../../Components/Common/UiContent";
import { useFormik } from "formik";
import { validationSchema } from "../../Components/validations";
//import Components
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Button, Form } from "reactstrap";

import TextInput from "../../common/textInput";
import SelectDropdown from "../../common/selectDropdown";
import RadioGroup from "../../common/commonRadioButton";
import { showToast } from "../../slices/toast/reducer";
import { useDispatch } from "react-redux";
import CheckboxGroup from "../../common/checkBoxGroup";
import DateSelector from "../../common/commonDatePicker"

const countryOptions = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
];

const languageKnown = [
  { value: "english", label: "English" },
  { value: "gujarati", label: "Gujarati" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "urdu", label: "Urdu" },
  { value: "bhojpuri", label: "Bhojpuri" },
];

const hobbyOptions = [
  { label: "Reading", value: "reading" },
  { label: "Cooking", value: "cooking" },
  { label: "Gardening", value: "gardening" },
  { label: "Sports", value: "sports" },
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const BasicElements = () => {
  document.title = "Basic Elements | Velzon - React Admin & Dashboard Template";
  const formRef = React.useRef(null);
  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: "",
      emailId: "",
      password: "",
      mobile: "",
      country: "",
      langKnown: [],
      description: "",
      selectedDate: null,
      hobbies: [],
      gender: "",
      fileInput: {},
    },
    validationSchema,
    onSubmit: () => {
      dispatch(
        showToast({
          type: "success",
          msg: "Form Submited successfully",
        })
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  };
  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Basic Elements" pageTitle="Forms" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Container>
                    <div className="App">
                      <Form ref={formRef} onSubmit={handleSubmit}>
                        <TextInput
                          label="Full Name"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Enter Full Name"
                          validation={validation}
                        />
                        <TextInput
                          label="Email"
                          type="email"
                          name="emailId"
                          id="email"
                          placeholder="Enter Email"
                          validation={validation}
                        />
                        <TextInput
                          label="Password"
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Enter Password"
                          validation={validation}
                        />
                        <TextInput
                          label="Mobile"
                          type="tel"
                          pattern="[0-9]*"
                          maxLength={10}
                          name="mobile"
                          id="mobile"
                          placeholder="Enter Mobile Number"
                          validation={validation}
                        />
                        <TextInput
                          label="Description"
                          type="textarea"
                          name="description"
                          id="description"
                          placeholder="Enter description"
                          validation={validation}
                          textarea
                        />
                        <SelectDropdown
                          label="Country"
                          options={countryOptions}
                          name="country"
                          id="country"
                          placeholder="Select Country"
                          validation={validation}
                        />
                      
                        <DateSelector
                          label="Select Date"
                          name="selectedDate"
                          id="selectedDate"
                          placeholder="Select Date"
                          validation={validation}
                        />
                        <CheckboxGroup
                          label="Hobbies"
                          options={hobbyOptions}
                          name="hobbies"
                          id="hobbies"
                          validation={validation}
                          layout="vertical"
                        />
                        <RadioGroup
                          label="Gender"
                          options={genderOptions}
                          name="gender"
                          id="gender"
                          validation={validation}
                          layout="vertical"
                        />
                        <div className="modal-footer p-0 d-flex justify-content-start">
                          <Button
                            color="primary"
                            type="submit"
                            className="m-0 mt-4 right ms-auto"
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </Container>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BasicElements;
