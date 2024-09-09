import React, { useState } from "react";
import UiContent from "../../Components/Common/UiContent";
import { useFormik } from "formik";
import { entriesSchema } from "../../Components/validations";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Button, Form, Spinner } from "reactstrap";
import TextInput from "../../common/textInput";
import { showToast } from "../../slices/toast/reducer";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const BasicElements = () => {
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  const dispatch = useDispatch();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientId: "",
      clientName: "",
      myWallet: 0.0,
      trade: 0.0,
      currentMonth: new Date().toLocaleString("default", { month: "long" }),
      adminName: superAdminUser?.adminName || "",
    },
    validationSchema: entriesSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
            try {
        await addDoc(collection(db, "formEntries"), {
          ...values,
          status: "pending",
          notes: "Cash",
        });
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
      resetForm();
      setLoading(false);
    },
  });

  const handleClientIdChange = async (e) => {
    const clientId = e.target.value;

    validation.setFieldValue("clientId", clientId);

    if (clientId) {
      try {
        const q = query(
          collection(db, "users"),
          where("clientId", "==", clientId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const clientData = querySnapshot.docs[0].data();
          setClientName(clientData.username);
          validation.setFieldValue("clientName", clientData.username);
        } else {
          setClientName("");
          validation.setFieldValue("clientName", "");
        }
      } catch (error) {
        console.log("Error fetching client name:", error.message);
      }
    }
  };

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
                      <Form onSubmit={handleSubmit}>
                        {/* Client ID */}
                        <TextInput
                          label="Client ID"
                          type="text"
                          name="clientId"
                          id="clientId"
                          placeholder="Enter Client ID"
                          onChange={handleClientIdChange}
                          validation={validation}
                        />
                        {/* Client Name (Read-Only) */}
                        <TextInput
                          label="Client Name"
                          type="text"
                          name="clientName"
                          id="clientName"
                          placeholder="Client Name"
                          value={clientName}
                          readOnly={true}
                          validation={validation}
                        />
                        {/* My Wallet */}
                        <TextInput
                          label="My Wallet"
                          type="text"
                          name="myWallet"
                          id="myWallet"
                          placeholder="Enter Wallet Amount"
                          validation={validation}
                        />
                        {/* Trade */}
                        <TextInput
                          label="Trade"
                          type="text"
                          name="trade"
                          id="trade"
                          placeholder="Enter Trade Amount"
                          validation={validation}
                        />
                        <div className="modal-footer p-0 d-flex justify-content-start">
                          <Button
                            color="primary"
                            type="submit"
                            className="m-0 mt-4 right ms-auto"
                            disabled={loading} // Disable button when loading
                          >
                            {loading ? (
                              <Spinner size="sm" /> // Display loader
                            ) : (
                              "Submit"
                            )}
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
