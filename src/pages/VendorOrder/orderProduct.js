/* eslint-disable react/prop-types */
import React from "react";

const OrderProduct = (props) => {
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <div className="text-warning fs-15">
        {Array.from({ length: fullStars }, (_, index) => (
          <i key={index} className="ri-star-fill"></i>
        ))}
        {Array.from({ length: halfStars }, (_, index) => (
          <i key={fullStars + index} className="ri-star-half-fill"></i>
        ))}
        {Array.from({ length: emptyStars }, (_, index) => (
          <i key={fullStars + halfStars + index} className="ri-star-line"></i>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <tr>
        <td>
          <div className="d-flex">
            <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
              <img
                src={props.product.img}
                alt=""
                className="img-fluid d-block"
              />
            </div>
            <div className="flex-grow-1 ms-3">
              <h5 className="fs-15">
                <a
                  href="apps-ecommerce-product-details"
                  className="link-primary"
                >
                  {props.product.name}
                </a>
              </h5>
              <p className="text-muted mb-0">
                Color: <span className="fw-medium">{props.product.color}</span>
              </p>
              <p className="text-muted mb-0">
                Size: <span className="fw-medium">{props.product.size}</span>
              </p>
            </div>
          </div>
        </td>
        <td>{props.product.price}</td>
        <td>{props.product.quantity}</td>
        <td>{generateStars(props.product.rating)}</td>
        <td className="fw-medium text-end">{props.product.amount}</td>
      </tr>
    </React.Fragment>
  );
};

export default OrderProduct;
