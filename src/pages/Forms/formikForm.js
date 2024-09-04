import React from "react";
import UiContent from "../../Components/Common/UiContent";
import { useFormik } from "formik";
import { validationSchema } from "../../Components/validations";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Button, Form } from "reactstrap";
import TextInput from "../../common/textInput";
import SelectDropdown from "../../common/selectDropdown";
import RadioGroup from "../../common/commonRadioButton";
import { showToast } from "../../slices/toast/reducer";
import { useDispatch } from "react-redux";
import { db } from "../../firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const countryOptions = [
  { value: "usa", label: "USA" },
  { value: "uk", label: "UK" },
  { value: "canada", label: "Canada" },
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
      description: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, "formEntries"), values); // Add form data to Firestore
        dispatch(
          showToast({
            type: "success",
            msg: "Form Submitted successfully",
          })
        );
      } catch (error) {
        dispatch(
          showToast({
            type: "error",
            msg: "Error submitting form: " + error.message,
          })
        );
      }
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
      <div className="page-content  mt-4">
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
