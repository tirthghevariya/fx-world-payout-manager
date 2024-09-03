import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getProductEnquiry } from "../../slices/thunks";

const ProductEnquiry = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, productEnquiry } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    fetchData({ ...filterParams, isEnquiry: true });
  }, [dispatch]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getProductEnquiry(filterParams));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">subject</span>,
      selector: (row) => row.subject,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">UserName</span>,
      selector: (row) => row.enquirerName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">User Email</span>,
      selector: (row) => row.enquirerEmail || "N/A",
    },
    {
      name: <span className="font-weight-bold fs-13">Message</span>,
      selector: (row) => row.message || "N/A",
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.product.productName || "N/A",
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
          data={productEnquiry.data && productEnquiry.data.rows}
          totalRows={(productEnquiry.data && productEnquiry.data.count) || 0}
          loading={fetchingData && productEnquiry.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          selectedRows={selectedRows}
          exportFileName="ProductEnquiry"
        />
      </div>
    </React.Fragment>
  );
};

export default ProductEnquiry;
