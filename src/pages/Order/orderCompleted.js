import React, { useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import { useNavigate } from "react-router-dom";

const OrderCompletedScreen = () => {
  defineElement(lottie.loadAnimation);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/order", { replace: true });
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [history]);

  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <lord-icon
          src="https://cdn.lordicon.com/lupuorrc.json"
          trigger="loop"
          colors="primary:#0ab39c,secondary:#405189"
          style={{ width: "120px", height: "120px" }}
        ></lord-icon>
      </div>
      <h5>Thank you! Your Order is Completed!</h5>
      <p className="text-muted">
        You will receive an order confirmation email with details of your order.
      </p>
      {/* <h3 className="fw-semibold">
        Order ID:{" "}
        <Link
          to="/apps-ecommerce-order-details"
          className="text-decoration-underline"
        ></Link>
      </h3> */}
    </div>
  );
};

export default OrderCompletedScreen;
