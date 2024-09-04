import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { createUserValidationSchema } from "../../Components/validations";
import UiContent from "../../Components/Common/UiContent";
import { Container, Row, Col, Card, CardBody, Form, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import TextInput from "../../common/textInput";
import SelectDropdown from "../../common/selectDropdown";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { showToast } from "../../slices/toast/reducer";

const CreateUser = () => {
    const userTypeOptions = [
        { value: "super_admin", label: "Super Admin" },
        { value: "admin", label: "Admin" },
    ];
    const [isSubmitting, setSubmitting] = useState(false); 
    const formRef = React.useRef(null);
    const dispatch = useDispatch();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            clientId: "",
            username: "",
            userType: "admin",
            adminName: "bhavesh_agravat",
        },
        validationSchema: createUserValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                setSubmitting(true);
                await addDoc(collection(db, "users"), values);
                dispatch(
                    showToast({
                        type: "success",
                        msg: "Form Submitted successfully",
                    })
                );
                resetForm();
            } catch (error) {
                dispatch(
                    showToast({
                        type: "error",
                        msg: "Error submitting form: " + error.message,
                    })
                );
            } finally {
                setSubmitting(false);
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
            <div className="page-content mt-5">
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
                                                    label="Client ID"
                                                    type="text"
                                                    name="clientId"
                                                    id="clientId"
                                                    placeholder="Enter Client ID"
                                                    validation={validation}
                                                />
                                                <TextInput
                                                    label="Username"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    placeholder="Enter Username"
                                                    validation={validation}
                                                />
                                                <SelectDropdown
                                                    label="User Type"
                                                    options={userTypeOptions}
                                                    name="userType"
                                                    id="userType"
                                                    placeholder="Select User Type"
                                                    validation={validation}
                                                />
                                                <SelectDropdown
                                                    label="Admin Name"
                                                    options={[
                                                        { value: "bhavesh_agravat", label: "Bhavesh Agravat" },
                                                        { value: "sandeep_agravat", label: "Sandeep Agravat" },
                                                    ]}
                                                    name="adminName"
                                                    id="adminName"
                                                    placeholder="Select Admin Name"
                                                    validation={validation}
                                                />
                                                <div className="modal-footer p-0 d-flex justify-content-start">
                                                    <Button
                                                        color="primary"
                                                        type="submit"
                                                        className="m-0 mt-4 right ms-auto"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <span
                                                                className="spinner-border spinner-border-sm me-2"
                                                                role="status"
                                                                aria-hidden="true"
                                                            ></span>
                                                        ) : null}
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

export default CreateUser;
