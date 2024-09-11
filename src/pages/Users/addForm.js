import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "reactstrap";
import CommonModal from "../../Components/Common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateState } from "../../slices/users/reducer";
import { db } from "../../firebase";
import { collection, addDoc, updateDoc ,doc} from "firebase/firestore";
import { showToast } from "../../slices/toast/reducer";
import { createAdminValidationSchema, createSuperAdminValidationSchema } from "../../Components/validations";
import TextInput from "../../common/textInput";
import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const AddForm = ({ fetchData }) => {
  const [fetchingData, setFetchingData] = useState(false);
  const dispatch = useDispatch();
  const { insersUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!fetchingData && insersUser.formOpen) {
      setFetchingData(true);
    }
  }, [dispatch, insersUser]);

  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));


  const formatUsername = (name) => {
    // Convert the name to lowercase, split it by spaces, and join it with underscores
    return name.toLowerCase().split(' ').join('_');
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientId: "",
      username: "",
      password: "",
      confirmPassword: "",
      userType: "admin",
      adminName: superAdminUser?.adminName || "",
    },
    validationSchema: insersUser.isSuperForm ? createSuperAdminValidationSchema : createAdminValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values.password !== values.confirmPassword) {
        dispatch(
          showToast({
            type: "error",
            msg: "Passwords do not match",
          })
        );
        return;
      }

      try {
        setSubmitting(true);
        const hashedPassword = await hashPassword(values.password);
  
        insersUser.isSuperForm ? await updateDoc(doc(db, 'users', insersUser.userData.id), { 
          adminName: formatUsername(insersUser?.userData.username || ""),
          clientId: insersUser?.userData.clientId||"",
          userType:"super_admin"||"admin",
          username: insersUser?.userData.username||"",
          password: hashedPassword||"" })
          :
          await addDoc(collection(db, "users"), {
            clientId: values.clientId,
            username: values.username,
            userType: "admin",
            adminName: superAdminUser?.adminName || "",
            password:""
          });
        fetchData();
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
        dispatch(updateState({ formOpen: false, isSuperForm: false }));
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  };

  const [isSubmitting, setSubmitting] = useState(false);
  const formRef = React.useRef(null);

  return (
    <>
      <CommonModal
        isPopupOpen={insersUser.formOpen}
        modalSize={"md"}
        closeModal={() => dispatch(updateState({ formOpen: false, isSuperForm: false }))}
        closeTitle=""
        modelTitle="Add New User"
        modalBody={
          <Row>
            <Col lg={12}>
              <div className="App">
                <Form ref={formRef} onSubmit={handleSubmit}>
                  {insersUser.isSuperForm ===false && (
                  <TextInput
                    label="Client ID"
                    type="text"
                    name="clientId"
                    id="clientId"
                    placeholder="Enter Client ID"
                    validation={validation}
                  />)}
                  {insersUser.isSuperForm === false && (
                  <TextInput
                    label="Username"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter Username"
                    validation={validation}
                  />)}
                  {insersUser.isSuperForm && (
                  <TextInput
                    label="Password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    validation={validation}
                  />)} 
                  {insersUser.isSuperForm && (
                  <TextInput
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    validation={validation}
                  />)}
                  {/* {insersUser.isSuperForm && (
                    <TextInput
                      label="Admin Name"
                      type="text"
                      name="adminName"
                      id="adminName"
                      placeholder="Enter Admin Name"
                      validation={validation}
                    />
                  )} */}
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
            </Col>
          </Row>
        }
      />
    </>
  );
};

export default AddForm;
