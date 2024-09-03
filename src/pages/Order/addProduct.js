import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonModal from "../../Components/Common/CommonModal";
import { updateProductStates } from "../../slices/order/reducer";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { addProduct, updateOrder } = useSelector((state) => state.order);
  useSelector((state) => state.user);

  const [selectedProducts, setSelectedProducts] = useState(
    updateOrder.singleOrder.OrderItems || []
  );

  const { getProduct } = useSelector((state) => state.product);

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
        resetForm();
      }
    },
  });

  const productValidationSchema = Yup.object().shape({
    productId: Yup.string().required("Please select a product"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .positive("Quantity must be positive")
      .required("Quantity is required"),
  });

  const formikProduct = useFormik({
    initialValues: {
      productId: "",
      quantity: 1,
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      if (values.productId && values.quantity) {
        dispatch(
          updateProductStates({
            productDetail: selectedProducts,
            formOpen: false,
          })
        );
        addProductInBag(values);
        formikProduct.resetForm();
      }
    },
  });

  const addProductInBag = (values) => {
    const { productId, quantity } = values;
    const selectedProduct = getProduct.data.rows.find(
      (product) => product.productId.toString() === productId
    );

    if (selectedProduct) {
      const existingProduct = selectedProducts.find(
        (product) => product.productId === selectedProduct.productId
      );
      if (existingProduct) {
        const updatedProducts = selectedProducts.map((product) =>
          product.productId === existingProduct.productId
            ? {
                ...product,
                quantity: product.quantity + parseInt(quantity, 10),
              }
            : product
        );
        setSelectedProducts(updatedProducts);
        dispatch(
          updateProductStates({
            productDetail: updatedProducts,
            formOpen: false,
          })
        );
      } else {
        const newProduct = {
          productId: selectedProduct.productId,
          productName: selectedProduct.productName,
          quantity: parseInt(quantity, 10),
          unitPrice: selectedProduct.price,
        };
        setSelectedProducts((prevProducts) => [...prevProducts, newProduct]);
        dispatch(
          updateProductStates({
            productDetail: [...selectedProducts, newProduct],
            formOpen: false,
          })
        );
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-4">
        <Button
          color="primary"
          type="submit"
          onClick={() => dispatch(updateProductStates({ formOpen: true }))}
        >
          Add Product
        </Button>
      </div>

      <CommonModal
        isPopupOpen={addProduct.formOpen}
        modalSize={"md"}
        closeModal={() => dispatch(updateProductStates({ formOpen: false }))}
        closeTitle=""
        modelTitle="Product Information"
        modalBody={
          <Col md={12}>
            <div>
              <div>
                <p className="text-muted">Please Select the Product</p>
              </div>
              <Form onSubmit={formikProduct.handleSubmit}>
                <FormGroup>
                  <Label for="productId">Select Product</Label>
                  <Input
                    type="select"
                    name="productId"
                    id="productId"
                    className="mb-2"
                    value={formikProduct.values.productId}
                    onChange={formikProduct.handleChange}
                    onBlur={formikProduct.handleBlur}
                    invalid={
                      formikProduct.touched.productId &&
                      !!formikProduct.errors.productId
                    }
                  >
                    <option value="">Select Product</option>
                    {getProduct.data &&
                      getProduct.data.rows.map((product) => (
                        <option
                          key={product.productId}
                          value={product.productId}
                        >
                          {product.productName} - ${product.price}
                        </option>
                      ))}
                  </Input>
                  {formikProduct.touched.productId &&
                    formikProduct.errors.productId && (
                      <FormFeedback>
                        {formikProduct.errors.productId}
                      </FormFeedback>
                    )}
                  <Label for="quantity">Quantity</Label>
                  <div className="d-flex align-items-center">
                    <Button
                      className="me-2"
                      color="primary"
                      onClick={() =>
                        formikProduct.setFieldValue(
                          "quantity",
                          formikProduct.values.quantity - 1
                        )
                      }
                      disabled={formikProduct.values.quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={formikProduct.values.quantity}
                      onChange={formikProduct.handleChange}
                      onBlur={formikProduct.handleBlur}
                      invalid={
                        formikProduct.touched.quantity &&
                        !!formikProduct.errors.quantity
                      }
                    />
                    <Button
                      className="ms-2"
                      color="primary"
                      onClick={() =>
                        formikProduct.setFieldValue(
                          "quantity",
                          formikProduct.values.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                  {formikProduct.touched.quantity &&
                    formikProduct.errors.quantity && (
                      <FormFeedback>
                        {formikProduct.errors.quantity}
                      </FormFeedback>
                    )}
                </FormGroup>
                {formikProduct.values.productId && (
                  <div className="mb-2">
                    <Label>Price:</Label>{" "}
                    <span>
                      $
                      {
                        getProduct.data.rows.find(
                          (product) =>
                            product.productId.toString() ===
                            formikProduct.values.productId
                        ).price
                      }
                    </span>
                  </div>
                )}
                <div className="d-flex align-items-start gap-3 mt-4">
                  <Button
                    color="primary"
                    type="submit"
                    className="btn btn-primary right ms-auto nexttab"
                  >
                    Add Product
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        }
      />
    </>
  );
};

export default AddProduct;
