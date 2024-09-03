import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import TextInput from "../../common/textInput";
import CommonModal from "../../Components/Common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateBilingStates } from "../../slices/order/reducer";
const AddBillingDetail = () => {
  const dispatch = useDispatch();
  const { billingDetail, updateOrder } = useSelector((state) => state.order);

  const billingDetailsSchema = Yup.object().shape({
    billingName: Yup.string().required("Billing Name is required"),
    billingAddress: Yup.string().required("Billing Address is required"),
    billingEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    billingMobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
  });

  const formikMain = useFormik({
    initialValues: {
      billingName: updateOrder.singleOrder.billingName || "",
      billingAddress: updateOrder.singleOrder.billingAddress || "",
      billingEmail: updateOrder.singleOrder.billingEmail || "",
      billingMobileNumber: updateOrder.singleOrder.billingMobileNumber || "",
    },
    validationSchema: billingDetailsSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(updateBilingStates({ detail: values, formOpen: false }));
      resetForm();
    },
  });
  return (
    <>
      <a
        href="#"
        onClick={() => dispatch(updateBilingStates({ formOpen: true }))}
        className="p-2 fs-13 nav-link refresh-button"
      >
        <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
      </a>

      <CommonModal
        isPopupOpen={billingDetail.formOpen}
        modalSize={"md"}
        closeModal={() => dispatch(updateBilingStates({ formOpen: false }))}
        closeTitle=""
        modelTitle="Add Billing Detail"
        modalBody={
          <Form onSubmit={formikMain.handleSubmit}>
            <FormGroup className="mb-4">
              <TextInput
                label="Billing Name"
                type="text"
                name="billingName"
                id="billingName"
                placeholder="Enter Full Name"
                validation={formikMain}
              />
              <TextInput
                label="Billing Address"
                type="text"
                name="billingAddress"
                id="billingAddress"
                placeholder="Enter Address"
                validation={formikMain}
              />
              <TextInput
                label="Billing Email"
                type="text"
                name="billingEmail"
                id="billingEmail"
                placeholder="Enter Email"
                validation={formikMain}
              />
              <TextInput
                label="Mobile Number"
                type="text"
                name="billingMobileNumber"
                id="billingMobileNumber"
                placeholder="Enter Mobile Number"
                validation={formikMain}
              />
            </FormGroup>
            <div className="d-flex align-items-start gap-3 mt-4">
              <Button
                color="primary"
                type="submit"
                className="btn btn-primary right ms-auto nexttab"
              >
                Add billing detail
              </Button>
            </div>
          </Form>
        }
      />
    </>
  );
};

export default AddBillingDetail;
