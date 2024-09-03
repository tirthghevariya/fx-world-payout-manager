// Inside ProductByCategory component

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryList, getCategoryPGList } from "../../slices/thunks";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import Lightbox from "yet-another-react-lightbox";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import "yet-another-react-lightbox/styles.css";

const ProductByCategory = () => {
  const dispatch = useDispatch();
  const [, setFetchingData] = useState(false);
  const { filterParams, getCategory, pgCategory } = useSelector(
    (state) => state.category
  );
  useEffect(() => {
    fetchData(filterParams);
    dispatch(getCategoryPGList());
  }, [filterParams]);

  const [filterParam, setFilterParam] = useState({ isCategory: 0 });

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getCategoryList(filterParams));
  };

  document.title = "Gallery | Velzon - React Admin & Dashboard Template";
  const [index, setIndex] = useState(-1);

  const handleCategoryChange = (categoryId) => {
    setFilterParam({ ...filterParams, isCategory: categoryId });
    fetchData({ ...filterParams, isCategory: categoryId });
  };

  const scrollRef = useRef(null);

  const handleWheelClick = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
    e.stopPropagation();
  };

  return (
    <React.Fragment>
      <div className="page-content mt-5">
        <Container fluid>
          <BreadCrumb title="Gallery" pageTitle="Pages" />
          <Row>
            <Col lg={12}>
              <div className="">
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <div className="text-center">
                        <ul
                          className="list-inline categories-filter animation-nav"
                          id="filter"
                        >
                          <div
                            className="text-center itemconfiguration scrollable"
                            onWheelCapture={handleWheelClick}
                            ref={scrollRef}
                          >
                            <ul
                              className="list-inline categories-filter animation-nav "
                              id="filter"
                            >
                              <li className="list-inline-item">
                                <Link
                                  to="#"
                                  onClick={() => handleCategoryChange(0)}
                                  className={
                                    filterParam.isCategory === 0
                                      ? "categories active"
                                      : "categories"
                                  }
                                >
                                  All
                                </Link>
                              </li>
                              {pgCategory.data &&
                                pgCategory.data.rows.map((item) => (
                                  <li
                                    className="list-inline-item"
                                    key={item.category.categoryId}
                                  >
                                    <Link
                                      to="#"
                                      onClick={() =>
                                        handleCategoryChange(
                                          item.category.categoryId
                                        )
                                      }
                                      className={
                                        filterParam.isCategory ===
                                        item.category.categoryId
                                          ? "categories active"
                                          : "categories"
                                      }
                                    >
                                      {item.category.categoryName}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </ul>
                      </div>

                      <Masonry className="row">
                        {getCategory.data &&
                          getCategory.data.rows.map((categoryItem) =>
                            categoryItem.products.map((productItem) => (
                              <Col
                                xxl={3}
                                xl={4}
                                sm={6}
                                className="element-item project designing development"
                                key={productItem.productId}
                              >
                                <Card className="gallery-box">
                                  <div className="gallery-container">
                                    <Link
                                      className="image-popup"
                                      to="#"
                                      title={productItem.productName}
                                      onClick={() =>
                                        setIndex(productItem.productId)
                                      }
                                    >
                                      <img
                                        className="gallery-img img-fluid mx-auto"
                                        src={
                                          process.env.REACT_APP_IMAGE_URL +
                                          productItem.productImage
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="box-content">
                                    <div className="pt-3">
                                      <h6
                                        style={{
                                          color: "#202020",
                                          font: "lexend",
                                          marginBottom: "5px",
                                          fontSize: "18px",
                                        }}
                                        className="rizzui-title-h6 text-base truncate font-inter"
                                      >
                                        {productItem.productName}
                                      </h6>
                                      <p
                                        style={{
                                          marginBottom: "-5px",
                                          color: "#5E5E5E",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {productItem.description}
                                      </p>
                                      <div
                                        className="d-flex"
                                        style={{ marginTop: "0px" }}
                                      >
                                        <div className="mt-2 flex font-semibold">
                                          ${productItem.price}
                                        </div>
                                        <del className="m-2 text-muted">
                                          {`$${
                                            productItem.price +
                                            (productItem.price * 41) / 100
                                          }`}
                                        </del>
                                      </div>
                                    </div>
                                  </div>
                                </Card>
                              </Col>
                            ))
                          )}
                      </Masonry>
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* LightBox */}
      <Lightbox
        index={index}
        // slides={slideGallery}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
    </React.Fragment>
  );
};

export default ProductByCategory;
