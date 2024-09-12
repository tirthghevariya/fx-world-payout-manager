import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { showToast } from "../../slices/toast/reducer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ParticlesAuth from "./ParticlesAuth";
import * as Yup from "yup";
import { useFormik } from "formik";
import { enableLoading, disableLoading } from "../../slices/auth/login/reducer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import bcrypt from "bcryptjs";
import logoLight from "../../assets/images/logo-light.png";
import withRouter from "../../Components/Common/withRouter";

const Login = (props) => {
  const dispatch = useDispatch();

  const { errorMsg, loading } = useSelector((state) => ({
    errorMsg: state.Login.errorMsg,
    loading: state.Login.loading,
  }));

  const navigate = useNavigate();

  useEffect(() => {
    const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

    if (superAdminUser && superAdminUser.clientId) {
      navigate("/entries");
    }
  }, [navigate]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      clientId: "",
      password: "",
    },

    validationSchema: Yup.object({
      clientId: Yup.string().required("Please Enter Your Client ID"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: async (values, { resetForm }) => {
      dispatch(enableLoading());

      try {
        // Query to check for both super_admin and main_admin
        const q = query(
          collection(db, "users"),
          where("clientId", "==", values.clientId),
          where("userType", "in", ["super_admin", "main_admin"]) // Check for both user types
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          const isPasswordCorrect = await bcrypt.compare(
            values.password,
            userData.password
          );

          if (isPasswordCorrect) {
            localStorage.setItem("superAdminUser", JSON.stringify(userData));
            props.router.navigate("/entries");
          } else {
            dispatch(
              showToast({
                type: "error",
                msg: "Invalid password. Please try again.",
              })
            );
          }
        } else {
          dispatch(
            showToast({
              type: "error",
              msg: "Invalid client ID or not authorized.",
            })
          );
        }
      } catch (error) {
        dispatch(
          showToast({
            type: "error",
            msg: "Error logging in: " + error.message,
          })
        );
      } finally {
        dispatch(disableLoading());
        resetForm();
      }
    },
  });

  document.title = process.env.REACT_APP_SITE_TITLE + " | Login";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content">
          <Container>
            <Row className="mt-4">
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50 mt-3">
                  <div className="mt-3">
                    <img src={logoLight} alt="" height="60" />
                  </div>
                  <p className="mt-3 fs-15">
                    Premium Admin & Dashboard Template paper <br />
                  </p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to fx world payout manager.
                      </p>
                    </div>
                    {errorMsg && errorMsg ? (
                      <Alert color="danger"> {errorMsg} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="clientId" className="form-label">
                            Client ID
                          </Label>
                          <Input
                            name="clientId"
                            className="form-control"
                            placeholder="Enter Client ID"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.clientId || ""}
                            invalid={
                              validation.touched.clientId &&
                                validation.errors.clientId
                                ? true
                                : false
                            }
                          />
                          {validation.touched.clientId &&
                            validation.errors.clientId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.clientId}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label" htmlFor="password">
                            Password
                          </Label>
                          <Input
                            name="password"
                            value={validation.values.password || ""}
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                                validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                            validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          <Button
                            disabled={loading ? true : false}
                            color="primary"
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            {loading === true ? (
                              <Spinner size="sm" className="me-2">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                            ) : (
                              false
                            )}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Login);
