import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonModal from "../../Components/Common/CommonModal";
import TextInput from "../../common/textInput";
import { updateShipingStates } from "../../slices/order/reducer";

const AddShippingDetail = () => {
  const dispatch = useDispatch();
  const { shipingDetail, updateOrder } = useSelector((state) => state.order);
  const { userList } = useSelector((state) => state.user);

  const shippingDetailsSchema = Yup.object().shape({
    customerId: Yup.string().required("Please select a customer"),
    shippingName: Yup.string().required("Shipping Name is required"),
    shippingAddress: Yup.string().required("Shipping Address is required"),
    shippingEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    shippingMobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid mobile number")
      .required("Mobile Number is required"),
  });

  const formik = useFormik({
    initialValues: {
      customerId: updateOrder.singleOrder.customerId || "",
      shippingName: updateOrder.singleOrder.shippingName || "",
      shippingAddress: updateOrder.singleOrder.shippingAddress || "",
      shippingEmail: updateOrder.singleOrder.shippingEmail || "",
      shippingMobileNumber: updateOrder.singleOrder.shippingMobileNumber || "",
    },
    validationSchema: shippingDetailsSchema,
    onSubmit: (values, { resetForm }) => {
      if (formik.isValid) {
        dispatch(
          updateShipingStates({
            detail: values,
            formOpen: false,
          })
        );
        resetForm();
      }
    },
  });

  return (
    <>
      <a
        href="#"
        onClick={() => dispatch(updateShipingStates({ formOpen: true }))}
        className="p-2 fs-13 nav-link refresh-button"
      >
        <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
      </a>

      <CommonModal
        isPopupOpen={shipingDetail.formOpen}
        modalSize={"md"}
        closeModal={() => dispatch(updateShipingStates({ formOpen: false }))}
        closeTitle=""
        modelTitle="Add Shipping Detail"
        modalBody={
          <Form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <Label for="customerId">Select Customer</Label>
              <Input
                type="select"
                name="customerId"
                id="customerId"
                value={formik.values.customerId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                invalid={
                  formik.touched.customerId && !!formik.errors.customerId
                }
              >
                <option value="">Select Customer</option>
                {userList.data &&
                  userList.data.rows.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {`${user.firstName} ${user.lastName}`}
                    </option>
                  ))}
              </Input>
              {formik.touched.customerId && formik.errors.customerId && (
                <FormFeedback>{formik.errors.customerId}</FormFeedback>
              )}
            </FormGroup>

            <TextInput
              label="Shipping Name"
              type="text"
              name="shippingName"
              id="shippingName"
              placeholder="Enter Full Name"
              validation={formik}
            />
            <TextInput
              label="Shipping Address"
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              placeholder="Enter Full Name"
              validation={formik}
            />
            <TextInput
              label="Shipping Email"
              type="text"
              name="shippingEmail"
              id="shippingEmail"
              placeholder="Enter Full Name"
              validation={formik}
            />

            <TextInput
              label="Mobile Number"
              type="text"
              name="shippingMobileNumber"
              id="shippingMobileNumber"
              placeholder="Enter Full Name"
              validation={formik}
            />
            <div className="d-flex align-items-start gap-3 mt-4">
              <Button
                color="primary"
                type="submit"
                className="btn btn-primary right ms-auto nexttab"
              >
                Add shipping detail
              </Button>
            </div>
          </Form>
        }
      />
    </>
  );
};

export default AddShippingDetail;
