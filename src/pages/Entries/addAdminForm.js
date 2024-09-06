import React, { useState, useEffect } from "react";
import { Button, Form,Row,Col,Card,CardBody,Container } from "reactstrap";
import CommonModal from "../../Components/Common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { updateState } from "../../slices/users/reducer";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { showToast } from "../../slices/toast/reducer";
import { createUserValidationSchema } from "../../Components/validations";
import TextInput from "../../common/textInput";

const AddAdminForm = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const dispatch = useDispatch();

  const { insersUser } =
    useSelector((state) => state.user);


  useEffect(() => {
    if (!fetchingData && insersUser.formOpen) {
      setFetchingData(true);
    }

  }, [dispatch,  insersUser]);
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientId: "",
      username: "",
      userType: "admin",
      adminName: superAdminUser.adminName ||"",
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
        dispatch(updateState({ formOpen: false }))
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
        // lg ,sm,xl
        modalSize={"md"}
        closeModal={() => dispatch(updateState({ formOpen: false }))}
        closeTitle=""
        modelTitle="Add New Admin"
        modalBody={
          <Row>
            <Col lg={12}>
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

export default AddAdminForm;
