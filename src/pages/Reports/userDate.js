import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container, Col, Label } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getUsersDateList } from "../../slices/thunks";
import Flatpickr from "react-flatpickr";
const UserDate = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const moment = require("moment");
  const [, setSelectedDateRange] = useState([]);
  const [selectedRows] = useState([]);

  const startDate = moment().subtract(15, "days").format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");
  const { filterParams, getUsersDate } = useSelector((state) => state.reports);
  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getUsersDateList(filterParams));
  };

  const filterDateChange = (selectedDates) => {
    setSelectedDateRange(selectedDates);

    const formattedDates = selectedDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    if (formattedDates.length > 1) {
      const updatedDate = {
        ...filterParams,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
      };
      dispatch(getUsersDateList(updatedDate));
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Username</span>,
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile No</span>,
      selector: (row) => row.mobile,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
    },
    {
      name: <span className="font-weight-bold fs-13">User Status</span>,
      selector: (row) => row.userStatus,
    },
    {
      name: <span className="font-weight-bold fs-13">Banned Reason</span>,
      selector: (row) => row.bannedReason,
    },
    {
      name: <span className="font-weight-bold fs-13">Created At</span>,
      selector: (row) => row.createdAt,
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
      <div className="d-flex justify-content-between mb-3 picker-margin">
        <Col lg={4}>
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
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getUsersDate.data && getUsersDate.data.rows}
          totalRows={(getUsersDate.data && getUsersDate.data.count) || 0}
          loading={fetchingData && getUsersDate.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="UserCreatedDate"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default UserDate;
