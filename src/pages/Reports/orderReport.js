import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import {
  Container,
  Col,
  FormGroup,
  Label,
  Input,
  Row,
  Form,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { orderReportList } from "../../slices/thunks";
import Flatpickr from "react-flatpickr";

const OrderReport = () => {
  const moment = require("moment");

  const startDate = moment().subtract(15, "days").format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRows] = useState([]);
  const [, setSelectedDateRange] = useState([]);
  const { orderFilterParams, getOrderReport } = useSelector(
    (state) => state.reports
  );
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const filterDateChange = (selectedDates) => {
    setSelectedDateRange(selectedDates);

    const formattedDates = selectedDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    if (formattedDates.length > 1) {
      const updatedDate = {
        ...orderFilterParams,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
      };
      dispatch(orderReportList(updatedDate));
    }
  };

  useEffect(() => {
    fetchData(orderFilterParams);
  }, [orderFilterParams]);

  const fetchData = (orderFilterParams) => {
    setFetchingData(true);
    dispatch(orderReportList(orderFilterParams));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    const updatedFilterParams = { ...orderFilterParams, status };
    fetchData(updatedFilterParams);
  };

  const handleRangeSubmit = (e) => {
    e.preventDefault();
    const updatedFilterParams = {
      ...orderFilterParams,
      minAmount: parseInt(minAmount),
      maxAmount: parseInt(maxAmount),
    };
    fetchData(updatedFilterParams);
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Order Product</span>,
      selector: (row) => row.orderAmount,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Amount</span>,
      selector: (row) => row.orderAmount,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Date</span>,
      selector: (row) => row.orderDate,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Status</span>,
      selector: (row) => row.orderStatus,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.billingName,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile No</span>,
      selector: (row) => row.billingMobileNumber,
    },
    {
      name: <span className="font-weight-bold fs-13">Coupon Code</span>,
      selector: (row) => (row.couponCode ? row.couponCode : "Not apply"),
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

      <div className="d-flex justify-content-start mb-3 row-margin">
        <Col lg={3} className="mb-3">
          <Label for="ForminputState">Date Range</Label>
          <div className="col-sm-auto">
            <div className="input-group">
              <Flatpickr
                defaultValue={moment().format("DD/MM/YYYY")}
                placeholder="dd/mm/yyyy"
                className="form-control"
                style={{ width: "230px" }}
                options={{
                  mode: "range",
                  dateFormat: "d-m-Y",
                  defaultDate: [startDate, endDate],
                  onChange: filterDateChange,
                }}
              />
              <div className="input-group-text bg-primary border-primary text-white">
                <i className="ri-calendar-2-line"></i>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3} className="picker-margin mb-3">
          <FormGroup>
            <Label for="productStatus">Filter by Product Status</Label>
            <Input
              type="select"
              name="productStatus"
              id="productStatus"
              value={selectedStatus}
              onChange={handleStatusChange}
              style={{ width: "100%" }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </Input>
          </FormGroup>
        </Col>

        <Col className="mb-3">
          <Form onSubmit={handleRangeSubmit}>
            <Row>
              <Col className="margin-input">
                <FormGroup>
                  <Label for="minAmount">Min Amount</Label>
                  <Input
                    type="number"
                    id="minAmount"
                    placeholder="Enter min quantity"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col className="input-margin">
                <FormGroup>
                  <Label for="maxAmount">Max Amount</Label>
                  <Input
                    type="number"
                    id="maxAmount"
                    placeholder="Enter max quantity"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex justify-content-end range-button">
              <Button type="submit" color="primary">
                Apply Range
              </Button>
            </div>
          </Form>
        </Col>
      </div>

      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={orderFilterParams}
          data={getOrderReport.data && getOrderReport.data.rows}
          totalRows={(getOrderReport.data && getOrderReport.data.count) || 0}
          loading={fetchingData && getOrderReport.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          selectedRows={selectedRows}
          exportFileName="OrderReport"
        />
      </div>
    </React.Fragment>
  );
};

export default OrderReport;
