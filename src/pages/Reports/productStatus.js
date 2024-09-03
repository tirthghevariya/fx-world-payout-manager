import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, FormGroup, Label, Input, Col } from "reactstrap";
import CommonDataTable from "../../common/DataTable";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getProductStatusList } from "../../slices/thunks";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";

const ProductStatus = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRows] = useState([]);

  const { filterParams, getProductStatus } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getProductStatusList(filterParams));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    const updatedFilterParams = { ...filterParams, status };
    fetchData(updatedFilterParams);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price,
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity,
    },
    {
      name: <span className="font-weight-bold fs-13">Product Status</span>,
      selector: (row) => row.productStatus,
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
        </Container>
      </div>
      <div className="table-container">
        <Col md={2} className="picker-margin">
          <FormGroup>
            <Label for="productStatus">Filter by Product Status:</Label>
            <Input
              type="select"
              name="productStatus"
              id="productStatus"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </Input>
          </FormGroup>
        </Col>
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getProductStatus.data && getProductStatus.data.rows}
          totalRows={
            (getProductStatus.data && getProductStatus.data.count) || 0
          }
          loading={fetchingData && getProductStatus.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="ProductStatus"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductStatus;
