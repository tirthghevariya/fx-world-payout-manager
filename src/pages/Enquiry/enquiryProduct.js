import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getEnquiryProduct } from "../../slices/thunks";

const EnquiryProduct = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, enquiryProduct } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    fetchData({ ...filterParams, isEnquiry: true });
  }, [dispatch]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getEnquiryProduct(filterParams));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
      wrap: true,
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">SKU</span>,
      selector: (row) => row.SKU || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Product Image</span>,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={process.env.REACT_APP_API_URL + row.productImage}
            alt="Category Image"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>
      ),
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Weight</span>,
      selector: (row) => row.weight || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Length</span>,
      selector: (row) => row.length || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Width</span>,
      selector: (row) => row.width || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">Height</span>,
      selector: (row) => row.height || "N/A",
      width: "80px",
    },
    {
      name: <span className="font-weight-bold fs-13">AverageRating</span>,
      selector: (row) => row.averageRating || "N/A",
    },
  ];

  return (
    <React.Fragment>
      <div className="mt-5">
        <Container fluid>
          <BreadCrumb title={"Monthly revenue report"} pageTitle="Report" />
        </Container>
      </div>

      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="enquiry"
          searchEnable={true}
          filterParams={filterParams}
          data={enquiryProduct.data && enquiryProduct.data.rows}
          totalRows={(enquiryProduct.data && enquiryProduct.data.count) || 0}
          loading={fetchingData && enquiryProduct.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          selectedRows={selectedRows}
          exportFileName="EnquiryProduct"
        />
      </div>
    </React.Fragment>
  );
};

export default EnquiryProduct;
