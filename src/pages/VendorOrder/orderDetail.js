import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row, CardHeader } from "reactstrap";
import { useParams } from "react-router-dom";
import { MdDeliveryDining } from "react-icons/md";
import { TbZoomMoneyFilled } from "react-icons/tb";
import { IoIosCard } from "react-icons/io";
import { FaMoneyCheck } from "react-icons/fa";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import OrderProduct from "./orderProduct";
import { getVendorSingleOrder } from "../../slices/thunks";
import { useSelector, useDispatch } from "react-redux";

const VendorOrderDetail = () => {
  const { vendorSingleOrderList } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const orderData = vendorSingleOrderList.data;

  const params = useParams();
  const orderId = parseInt(params.id, 10);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    dispatch(getVendorSingleOrder(orderId));
  };

  const productDetails =
    orderData &&
    orderData.OrderItems.map((item) => ({
      id: item.orderItemID,
      name: item.Product.productName,
      color: "N/A",
      size: "N/A",
      price: `$${item.unitPrice}`,
      quantity: item.quantity,
      amount: `$${item.subtotal}`,
      rating: item.Product.averageRating,
    }));

  document.title = "Order Details | Velzon - React Admin & Dashboard Template";

  return (
    <div>
      <Container style={{ marginTop: "10%", marginBottom: "5%" }} fluid>
        <Row>
          <Col xl={9}>
            <Card>
              <CardHeader>
                <div className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Order #{orderId}
                  </h5>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-responsive table-card">
                  <table className="table table-nowrap align-middle table-borderless mb-0">
                    <thead className="table-light text-muted">
                      <tr>
                        <th scope="col">Product Details</th>
                        <th scope="col">Item Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Rating</th>
                        <th scope="col" className="text-end">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productDetails &&
                        productDetails.map((product, key) => (
                          <OrderProduct product={product} key={key} />
                        ))}
                      <tr className="border-top border-top-dashed">
                        <td colSpan="3"></td>
                        <td colSpan="2" className="fw-medium p-0">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td>Sub Total :</td>
                                <td className="text-end">
                                  ${orderData && orderData.orderAmount}
                                </td>
                              </tr>
                              <tr>
                                <td>Discount:</td>
                                <td className="text-end">-$0.00</td>
                              </tr>
                              <tr className="border-top border-top-dashed">
                                <th scope="row">Total Amount</th>
                                <th className="text-end">
                                  ${orderData && orderData.orderAmount}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
            <Row className="g-4 mb-4">
              <Col xxl={3} lg={6}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                          <TbZoomMoneyFilled
                            style={{ color: "white" }}
                            className="fs-24"
                          ></TbZoomMoneyFilled>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                          Payment Status
                        </p>
                        <h4 className=" mb-0">
                          {orderData && orderData.orderStatus}
                        </h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xxl={3} lg={6}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                          <MdDeliveryDining
                            style={{ color: "white" }}
                            className="fs-24"
                          ></MdDeliveryDining>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                          Delivery Status
                        </p>
                        <h4 className=" mb-0">Delivered</h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xxl={3} lg={6}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                          <IoIosCard
                            style={{ color: "white" }}
                            className="fs-24"
                          ></IoIosCard>
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                          Payment Method
                        </p>
                        <h4 className=" mb-0">Mastercard</h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xxl={3} lg={6}>
                <Card className="card-animate">
                  <CardBody>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-soft-info text-info rounded-circle fs-4">
                          <FaMoneyCheck
                            style={{ color: "white" }}
                            className="fs-24"
                          ></FaMoneyCheck>{" "}
                        </span>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <p className="text-uppercase fw-semibold fs-12 text-muted mb-1">
                          Total Amount
                        </p>
                        <h4 className=" mb-0">
                          ${orderData && orderData.orderAmount}
                        </h4>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl={3}>
            <Card>
              <CardBody>
                <div className="text-center">
                  <div className="position-relative d-inline-block">
                    <img
                      src={avatar1}
                      alt=""
                      className="avatar-lg rounded-circle img-thumbnail"
                    />
                  </div>
                  <h5 className="mt-3 mb-1">
                    {orderData && orderData.User.firstName}{" "}
                    {orderData && orderData.User.lastName}
                  </h5>
                  <p className="text-muted">
                    {orderData && orderData.User.email}
                  </p>
                </div>
                <div className="table-responsive">
                  <table className="table table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0" scope="row">
                          Customer ID :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.customerId}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Name :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.billingName}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Mobile Number :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.billingMobileNumber}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Email :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.billingEmail}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Address :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.billingAddress}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Delivery Address :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.shippingAddress}
                        </td>
                      </tr>
                      <tr>
                        <th className="ps-0" scope="row">
                          Order Date :
                        </th>
                        <td className="text-muted">
                          {orderData && orderData.orderDate}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VendorOrderDetail;
