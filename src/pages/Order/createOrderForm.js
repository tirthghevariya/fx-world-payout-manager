import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Form,
  Label,
  Row,
  Col,
  Table,
  Container,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProductList } from "../../slices/thunks";
import { getUserList } from "../../slices/thunks";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { OrderProduct, update } from "../../slices/thunks";
import AddShipingDetail from "./addShipingDetail";
import AddBillingDetail from "./addBillingDetail";
import useRazorpay from "react-razorpay";
import { updateStatus } from "../../slices/thunks";
import Select from "react-select";
import AddProduct from "./addProduct";
import { updateProductStates } from "../../slices/order/reducer";
import Flatpickr from "react-flatpickr";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import { applyCoupon } from "../../slices/thunks";
import { useNavigate } from "react-router-dom";
import { getPaymentGatewayList } from "../../slices/thunks";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CreateOrderForm = () => {
  const [Razorpay] = useRazorpay();
  defineElement(lottie.loadAnimation);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { createOrder, shipingDetail, billingDetail, updateOrder, addProduct } =
    useSelector((state) => state.order);

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const { paymentGatewayList } = useSelector((state) => state.paymentGateway);

  const { checkCoupon } = useSelector((state) => state.coupon);

  const { getProduct } = useSelector((state) => state.product);

  const moment = require("moment");

  const handlePaytmPayment = () => {
    window.location.href = "https://securegw.paytm.in/theia/processTransaction";
  };
  const handleStripPayment = () => {
    window.location.href = "https://stripe.com/in";
  };
  const handlePayuMoneyPayment = () => {
    window.location.href =
      "https://payu.in/?gad_source=1&gclid=CjwKCAjwl4yyBhAgEiwADSEjeFFJu3CAEIicP2oVJgCvv4CY68iEpMq5gp0IYUspDLBxkm6vOnWXVhoC-tsQAvD_BwE&utm_campaign=Search-Brand-PayUmoney&utm_medium=cpc&utm_source=google&utm_term=payu%20money%20payment%20gateway";
  };

  useEffect(() => {
    if (checkCoupon === "Invalid coupon code or expired") {
      setCouponError("Invalid coupon code or expired");
    } else {
      setCouponError("");
    }
  }, [checkCoupon]);

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const [, setRzp] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);

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
        addProductInBag(values);
        formikProduct.resetForm();
      }
    },
  });

  const applyCouponCode = () => {
    dispatch(applyCoupon(couponCode));
    setCouponCode("");
  };

  const addProductInBag = (values) => {
    const { productId, quantity } = values;
    const selectedProduct = getProduct.data.rows.find(
      (product) => product.productId.toString() === productId
    );

    if (selectedProduct) {
      const existingProduct = addProduct.productDetail.find(
        (product) => product.productId === selectedProduct.productId
      );

      if (existingProduct) {
        const updatedProducts = addProduct.productDetail.map((product) =>
          product.productId === existingProduct.productId
            ? {
                ...product,
                quantity: product.quantity + parseInt(quantity, 10),
              }
            : product
        );
        dispatch(
          updateProductStates({
            productDetail: updatedProducts,
          })
        );
      } else {
        const newProduct = {
          productId: selectedProduct.productId,
          productName: selectedProduct.productName,
          quantity: parseInt(quantity, 10),
          unitPrice: selectedProduct.price,
        };
        dispatch(
          updateProductStates({
            productDetail: (prevProducts) => [...prevProducts, newProduct],
          })
        );
      }
    }
  };

  useEffect(() => {
    if (!fetchingData) {
      setFetchingData(true);
      dispatch(getProductList());
      dispatch(getUserList());
      dispatch(getPaymentGatewayList());
    }
  }, [dispatch, createOrder]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    if (addProduct.productDetail && Array.isArray(addProduct.productDetail)) {
      addProduct.productDetail.forEach((product) => {
        subtotal += product.unitPrice * product.quantity;
      });
    }
    return subtotal;
  };

  // Calculate subtotal
  const subtotal = calculateSubtotal();

  const handleDecreaseQuantity = (productId) => {
    const updatedProducts = addProduct.productDetail
      .map((product) => {
        if (product.productId === productId) {
          const updatedQuantity = Math.max(product.quantity - 1, 0);
          if (updatedQuantity === 0) {
            return null;
          }
          return {
            ...product,
            quantity: updatedQuantity,
          };
        }
        return product;
      })
      .filter(Boolean);
    dispatch(
      updateProductStates({
        productDetail: updatedProducts,
      })
    );
  };

  const isShippingDetailsComplete = (details) => {
    return (
      details.shippingName &&
      details.shippingAddress &&
      details.shippingEmail &&
      details.shippingMobileNumber
    );
  };

  const isBillingDetailsComplete = (details) => {
    return (
      details.billingName &&
      details.billingAddress &&
      details.billingEmail &&
      details.billingMobileNumber
    );
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedProducts = addProduct.productDetail.map((product) => {
      if (product.productId === productId) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
    dispatch(
      updateProductStates({
        productDetail: updatedProducts,
      })
    );
  };

  const handleRazorpayPayment = async () => {
    const options = {
      key: "rzp_test_Jdg73VaLq0DRCL",
      amount: calculateTotalAmount() * 100,
      currency: "INR",
      name: "WRP Solution",
      description: "Order Payment",
      handler: async () => {
        // Handle successful payment response here
        if (addProduct.productDetail.length === 0) {
          alert("Please add at least one product to your Cart.");
          return;
        }
        const shippingDetails = shipingDetail.detail;
        if (!shippingDetails || !isShippingDetailsComplete(shippingDetails)) {
          alert("Please provide complete shipping details.");
          return;
        }

        const billingDetails = billingDetail.detail;
        if (!billingDetails || !isBillingDetailsComplete(billingDetails)) {
          alert("Please provide complete billing details.");
          return;
        }

        const orderItems = addProduct.productDetail.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          unitPrice: product.unitPrice,
        }));

        const payload = {
          orderItems: orderItems,
          shippingDetails: {
            shippingName: shippingDetails.shippingName,
            shippingAddress: shippingDetails.shippingAddress,
            shippingEmail: shippingDetails.shippingEmail,
            shippingMobileNumber: shippingDetails.shippingMobileNumber,
          },
          billingDetails: {
            billingName: billingDetails.billingName,
            billingAddress: billingDetails.billingAddress,
            billingEmail: billingDetails.billingEmail,
            billingMobileNumber: billingDetails.billingMobileNumber,
          },
          customerId: shippingDetails.customerId,
        };
        payload.couponCode =
          checkCoupon.coupon && checkCoupon.coupon.couponCode;
        payload.orderId = updateOrder.singleOrder.orderId;
        updateOrder.singleOrder.orderId
          ? dispatch(update(payload))
          : dispatch(OrderProduct(payload));
        navigate("/order-completed");
      },
      prefill: {
        name: shipingDetail.detail.shippingName || "",
        email: shipingDetail.detail.shippingEmail || "",
        contact: shipingDetail.detail.shippingMobileNumber || "",
      },
      notes: {
        address: shipingDetail.detail.shippingAddress || "",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzpInstance = new Razorpay(options);
    rzpInstance.open();
    setRzp(rzpInstance);
  };

  const calculateTotalAmount = () => {
    let totalAmount = subtotal;
    if (checkCoupon.coupon) {
      if (checkCoupon.coupon.discountType === "Percentage") {
        totalAmount -=
          (subtotal * (checkCoupon.coupon.discountAmount || 0)) / 100;
      } else {
        totalAmount -= Math.min(
          subtotal - 1,
          checkCoupon.coupon.discountAmount
        );
      }
    }
    return Math.max(totalAmount, 1);
  };

  const currentDate = new Date();
  const formattedCurrentDate = moment(currentDate).format("DD/MM/YYYY HH:mm");

  const statusOption = [
    { label: "Select Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "Processing", value: "Processing" },
    { label: "Shipped", value: "Shipped" },
    { label: "Delivered", value: "Delivered" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  return (
    <div className="order-padding mb-5">
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
        </Container>
      </div>
      <Card>
        <CardBody>
          <Row>
            <Col md={4}>
              <div className="d-flex justify-content-between mt-0">
                <Col lg={12}>
                  <Label for="ForminputState">Date :</Label>
                  <div className="col-sm-auto">
                    <div className="input-group">
                      <Flatpickr
                        defaultValue={formattedCurrentDate}
                        placeholder="dd/mm/yyyy hh:mm"
                        className="form-control"
                        style={{ width: "230px" }}
                        options={{
                          mode: "range",
                          dateFormat: "d-m-Y H:i",
                          defaultDate: [formattedCurrentDate],
                          time24hr: true,
                        }}
                      />

                      <div className="input-group-text bg-primary border-primary text-white">
                        <i className="ri-calendar-2-line"></i>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>

              <div>
                <Form onSubmit={formikProduct.handleSubmit}>
                  {updateOrder.singleOrder &&
                  updateOrder.singleOrder.orderId ? (
                    <div>
                      <Label className="mt-2" for="quantity">
                        Status :
                      </Label>
                      <Select
                        defaultValue={updateOrder.singleOrder.orderStatus}
                        options={statusOption}
                        onChange={(e) => {
                          const payload = {
                            orderId: updateOrder.singleOrder.orderId,
                            orderStatus: e.value,
                            email: shipingDetail.detail.shippingEmail,
                            username: billingDetail.detail.billingName,
                          };
                          dispatch(updateStatus(payload));
                        }}
                      ></Select>
                    </div>
                  ) : null}
                </Form>
              </div>
            </Col>
            <Col md={4}>
              <Row className="justify-content-between align-items-center">
                <Col>
                  <h6 className="mb-0">Shiping Detail</h6>
                </Col>
                <Col>
                  <AddShipingDetail />
                </Col>
              </Row>

              <Row className="justify-content-between align-items-center">
                <Col>
                  <p className="text-muted mb-1">{`Name : ${
                    shipingDetail.detail.shippingName ||
                    updateOrder.singleOrder.shippingName ||
                    ""
                  }`}</p>
                  <p className="text-muted mb-1">{`Email : ${
                    shipingDetail.detail.shippingEmail ||
                    updateOrder.singleOrder.shippingEmail ||
                    ""
                  }`}</p>
                  <p className=" text-muted mb-1">{`Address : ${
                    shipingDetail.detail.shippingAddress ||
                    updateOrder.singleOrder.shippingAddress ||
                    ""
                  }`}</p>
                  <p className=" text-muted mb-1">{`Mobile No : ${
                    shipingDetail.detail.shippingMobileNumber ||
                    updateOrder.singleOrder.shippingMobileNumber ||
                    ""
                  }`}</p>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="justify-content-between align-items-center">
                <Col>
                  <h6 className="mb-0">Billing Detail</h6>
                </Col>
                <Col>
                  <AddBillingDetail />
                </Col>
              </Row>
              <Row className="justify-content-between align-items-center">
                <Col>
                  <p className="text-muted mb-1">{`Name : ${
                    billingDetail.detail.billingName ||
                    updateOrder.singleOrder.billingName ||
                    ""
                  }`}</p>
                  <p className="text-muted mb-1">{`Address : ${
                    billingDetail.detail.billingAddress ||
                    updateOrder.singleOrder.billingAddress ||
                    ""
                  }`}</p>
                  <p className=" text-muted mb-1">{`Email : ${
                    billingDetail.detail.billingEmail ||
                    updateOrder.singleOrder.billingEmail ||
                    ""
                  }`}</p>
                  <p className=" text-muted mb-1">{`Mobile No : ${
                    billingDetail.detail.billingMobileNumber ||
                    updateOrder.singleOrder.billingMobileNumber ||
                    ""
                  }`}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Col>
        <AddProduct />
      </Col>

      <Card>
        <CardBody>
          <Col xl={12}>
            {addProduct.productDetail &&
            addProduct.productDetail.length > 0 &&
            addProduct.productDetail ? (
              <CardHeader>
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-2">Order Items</h5>
                  </div>
                </div>
              </CardHeader>
            ) : null}

            {addProduct.productDetail &&
              addProduct.productDetail.length > 0 &&
              addProduct.productDetail
                .filter((cartItem) => cartItem.quantity > 0)
                .map((cartItem) => (
                  <React.Fragment key={cartItem.id}>
                    <Card className="product">
                      <CardBody>
                        <Row className="gy-3">
                          <div className="col-sm-auto">
                            <div className="avatar-lg bg-light rounded p-1">
                              <img
                                src={cartItem.img}
                                alt=""
                                className="img-fluid d-block"
                              />
                            </div>
                          </div>
                          <div className="col-sm">
                            <h5 className="fs-14 text-truncate">
                              {cartItem.productName}
                            </h5>

                            <div className="input-step">
                              <button
                                type="button"
                                className="minus"
                                onClick={() =>
                                  handleDecreaseQuantity(cartItem.productId)
                                }
                              >
                                –
                              </button>
                              <Input
                                type="text"
                                className="product-quantity"
                                value={cartItem.quantity}
                                name="demo_vertical"
                                readOnly
                              />
                              <button
                                type="button"
                                className="plus"
                                onClick={() =>
                                  handleIncreaseQuantity(cartItem.productId)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-sm-auto">
                            <div className="text-lg-end">
                              <p className="text-muted mb-1">Cost</p>
                              <h5 className="fs-14">
                                $
                                <span
                                  id="ticket_price"
                                  className="product-price"
                                >
                                  {cartItem.unitPrice}
                                </span>
                              </h5>
                            </div>
                          </div>
                          <div className="col-sm-auto">
                            <div className="text-lg-end">
                              <p className="text-muted mb-1">Qty</p>
                              <h5 className="fs-14">
                                <span
                                  id="ticket_price"
                                  className="product-price"
                                >
                                  x {cartItem.quantity}
                                </span>
                              </h5>
                            </div>
                          </div>
                          <div className="col-sm-auto">
                            <div className="text-lg-end">
                              <p className="text-muted mb-1">Total</p>
                              <h5 className="fs-14">
                                $
                                <span
                                  id="ticket_price"
                                  className="product-price "
                                >
                                  {cartItem.unitPrice * cartItem.quantity}
                                </span>
                              </h5>
                            </div>
                          </div>
                        </Row>
                      </CardBody>
                    </Card>
                  </React.Fragment>
                ))}

            <Col md={{ size: 5, offset: 7 }}>
              <CardHeader className="bg-soft-light border-bottom-dashed">
                <div className="text-start mx-n2">
                  <h6 className="mb-2">
                    Have a <span className="fw-semibold">promo</span> code ?
                  </h6>
                </div>
                <div className="hstack gap-3 px-2 mx-n3">
                  <input
                    className="form-control me-auto"
                    type="text"
                    placeholder="Enter coupon code"
                    aria-label="Add Promo Code here..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn btn-success w-xs"
                    onClick={applyCouponCode}
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <h6 className="text-danger mt-1">{couponError}</h6>
                )}
              </CardHeader>
              <Table className="table-borderless">
                <tbody>
                  <tr>
                    <td>Sub Total :</td>
                    <td className="text-end" id="cart-subtotal">
                      $ {subtotal}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Discount{" "}
                      <span className="text-muted">
                        (
                        {(checkCoupon.coupon &&
                          checkCoupon.coupon.couponCode) ||
                          "Apply discount"}
                        )
                      </span>{" "}
                      :{" "}
                    </td>

                    <td className="text-end" id="cart-discount">
                      {checkCoupon.coupon &&
                      checkCoupon.coupon.discountType === "Percentage"
                        ? "$ " +
                          (subtotal *
                            (checkCoupon.coupon.discountAmount || 0)) /
                            100
                        : checkCoupon.coupon
                        ? checkCoupon.coupon.discountAmount > subtotal
                          ? "$ " + (subtotal - 1 === -1 ? 0 : subtotal - 1)
                          : "$ " +
                            Math.min(
                              subtotal - 1,
                              checkCoupon.coupon.discountAmount
                            )
                        : "$ 0"}
                    </td>
                  </tr>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h6>Payment Type</h6>
                    {paymentGatewayList.data &&
                      paymentGatewayList.data.rows.map((payment) => (
                        <label
                          key={payment.paymentGatewayId}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                          }}
                        >
                          <Input
                            className="radio-margin"
                            type="radio"
                            value={payment.paymentGatewayName}
                            checked={
                              selectedValue === payment.paymentGatewayName
                            }
                            onChange={handleChange}
                            style={{ marginRight: "5px" }}
                          />
                          {payment.paymentGatewayName}
                        </label>
                      ))}
                    {/* <div>Selected payment gateway: {selectedValue}</div> */}
                  </div>
                  <tr className="table-active">
                    <th>Total (USD) :</th>
                    <td className="text-end">
                      <span className="fw-semibold" id="cart-total">
                        $
                        {subtotal === 0
                          ? 0
                          : checkCoupon.coupon &&
                            checkCoupon.coupon.discountType === "Percentage"
                          ? Math.max(
                              subtotal -
                                (subtotal *
                                  (checkCoupon.coupon.discountAmount || 0)) /
                                  100,
                              1
                            )
                          : checkCoupon.coupon
                          ? Math.max(
                              subtotal - checkCoupon.coupon.discountAmount,
                              1
                            )
                          : subtotal}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Col>
        </CardBody>
      </Card>
      {selectedValue === "Paypal" ? (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <PayPalScriptProvider
            options={{
              "client-id": "test",
            }}
          >
            <PayPalButtons
              style={{
                color: "black",
                label: "pay",
                tagline: false,
              }}
              // createOrder={createOrder}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <div className="d-flex justify-content-end mb-4">
          <Button
            className="mb-4"
            color="primary"
            onClick={() => {
              if (addProduct.productDetail.length === 0) {
                alert("Please add at least one product to your Cart.");
                return;
              }
              const shippingDetails = shipingDetail.detail;
              if (
                !shippingDetails ||
                !isShippingDetailsComplete(shippingDetails)
              ) {
                alert("Please provide complete shipping details.");
                return;
              }

              const billingDetails = billingDetail.detail;
              if (
                !billingDetails ||
                !isBillingDetailsComplete(billingDetails)
              ) {
                alert("Please provide complete billing details.");
                return;
              }
              if (selectedValue === "Razorpay") {
                handleRazorpayPayment();
              } else if (selectedValue === "Paytm") {
                handlePaytmPayment();
              } else if (selectedValue === "PayuMoney") {
                handlePayuMoneyPayment();
              } else if (selectedValue === "Strip") {
                handleStripPayment();
              }
            }}
          >
            {updateOrder.singleOrder.orderId ? "Update Order" : "Place Order"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateOrderForm;
