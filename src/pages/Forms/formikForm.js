import React, { useState, useEffect } from "react";
import UiContent from "../../Components/Common/UiContent";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row, Button, Form, Spinner, Label } from "reactstrap";
import TextInput from "../../common/textInput";
import { showToast } from "../../slices/toast/reducer";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// Validation schema
const entriesSchema = Yup.object().shape({
  clientId: Yup.string()
    .required("Client ID is required")
    .matches(/^FW\d{6}$/, "Client ID must start with 'FW' followed by 6 digits"),

  clientName: Yup.string().required("Client Name is required"), // This will be auto-filled

  // Conditionally required fields will be handled in onSubmit logic
});

const BasicElements = () => {
  const [clientName, setClientName] = useState("");
  const [adminNameFromClientId, setAdminNameFromClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(""); // Tracks selected wallet type
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  const navigate = useNavigate();

  useEffect(() => {
    const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
    if (superAdminUser && superAdminUser?.userType === "main_admin") {
      navigate("/entries");
    }
  }, [navigate]);

  const walletOptions = [
    { value: "trade", label: "Trade Profit Wallet" },
    { value: "myWallet", label: "Commission Wallet" },
  ];

  const dispatch = useDispatch();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      clientId: "",
      clientName: "",
      myWallet: "",
      trade: "",
      currentMonth: new Date().toLocaleString("default", { month: "long" }),
      adminName: superAdminUser?.adminName || "",
    },
    validationSchema: entriesSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      // Custom validation: Check if wallet type is selected and appropriate field is filled
      if (!selectedOption) {
        dispatch(
          showToast({
            type: "error",
            msg: "Please select a wallet type.",
          })
        );
        setLoading(false);
        return;
      }

      if (selectedOption === "myWallet" && !values.myWallet) {
        dispatch(
          showToast({
            type: "error",
            msg: "Please enter a value for My Wallet.",
          })
        );
        setLoading(false);
        return;
      }

      if (selectedOption === "trade" && !values.trade) {
        dispatch(
          showToast({
            type: "error",
            msg: "Please enter a value for Trade.",
          })
        );
        setLoading(false);
        return;
      }

      // Proceed with form submission logic if validation passes
      try {
        // Query to check if clientId exists in Firebase
        const q = query(
          collection(db, "formEntries"),
          where("clientId", "==", values.clientId),
          where("currentMonth", "==", values.currentMonth)
        );

        const querySnapshot = await getDocs(q);

        // Check if an entry exists for the clientId
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const docData = querySnapshot.docs[0].data();

          // Logic for updating values
          if (values.myWallet && docData.myWallet) {
            dispatch(
              showToast({
                type: "error",
                msg: `My Wallet already exists for Client ID ${values.clientId}. Please update Trade instead.`,
              })
            );
          } else if (values.trade && docData.trade) {
            dispatch(
              showToast({
                type: "error",
                msg: `Trade already exists for Client ID ${values.clientId}. Please update My Wallet instead.`,
              })
            );
          } else if (values.myWallet && docData.trade) {
            await updateDoc(docRef, {
              myWallet: values.myWallet,
            });
            dispatch(
              showToast({
                type: "success",
                msg: `Updated My Wallet for Client ID ${values.clientId}`,
              })
            );
          } else if (values.trade && docData.myWallet) {
            await updateDoc(docRef, {
              trade: values.trade,
            });
            dispatch(
              showToast({
                type: "success",
                msg: `Updated Trade for Client ID ${values.clientId}`,
              })
            );
          } else {
            await updateDoc(docRef, {
              ...docData,
              ...values,
            });
            dispatch(
              showToast({
                type: "success",
                msg: `Updated form for Client ID ${values.clientId}`,
              })
            );
          }
        } else {
          // Create a new document if no entry exists
          await addDoc(collection(db, "formEntries"), {
            ...values,
            adminName: superAdminUser?.adminName || adminNameFromClientId,
            status: "pending",
            notes: "Cash",
          });

          dispatch(
            showToast({
              type: "success",
              msg: "Form Submitted successfully",
            })
          );
        }
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

          setAdminNameFromClientId(clientData.adminName);
          validation.setFieldValue("adminName", clientData.adminName);
        } else {
          setClientName("");
          setAdminNameFromClientId("");
          validation.setFieldValue("clientName", "");
          validation.setFieldValue("adminName", "");
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

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption.value);
  };

  return (
    <React.Fragment>
      <UiContent />
      <div className="page-content mt-5">
        <Container fluid>
          <BreadCrumb />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Label style={{ textAlign: "left", display: "block", marginLeft: "10px", color: "red" }}>સુચના:-
                    દરેક ટીમ મેમ્બરે એન્ટ્રી પાડતી વખતે ધ્યાન રાખવું કે પોતાનું વૉલેટ સીલેક્ટ કરી ત્યાર બાદ તેની અમાઉંટ નીચે નાખવી.</Label>
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
                        <Label style={{ textAlign: "left", display: "block", marginTop: "10px" }}>
                          Select Wallet type
                        </Label>
                        <Select
                          className=""
                          options={walletOptions}
                          onChange={handleChange}
                          value={walletOptions.find(option => option.value === selectedOption)}
                          placeholder="Select Wallet type"
                          isSearchable={false}

                        />
                        {selectedOption === "myWallet" && (
                          <TextInput
                            label="Commission Wallet (USDT)"
                            type="text"
                            name="myWallet"
                            id="myWallet"
                            placeholder="Enter Wallet Amount"
                            validation={validation}
                          />
                        )}
                        {selectedOption === "trade" && (
                          <TextInput
                            label="Trade Profit Wallet (USDT)"
                            type="text"
                            name="trade"
                            id="trade"
                            placeholder="Enter Trade Amount"
                            validation={validation}
                          />
                        )}
                        <div className="modal-footer p-0 d-flex justify-content-start">
                          <Button
                            color="primary"
                            type="submit"
                            className="m-0 mt-4 right ms-auto"
                            disabled={loading}
                          >
                            {loading ? <Spinner size="sm" /> : "Submit"}
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
