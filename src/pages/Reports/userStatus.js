import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container, Col, FormGroup, Label, Input } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getUserStatusList } from "../../slices/thunks";

const UserStatus = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRows] = useState([]);

  const { filterParams, getUserStatus } = useSelector((state) => state.reports);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getUserStatusList(filterParams));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    const updatedFilterParams = { ...filterParams, status };
    fetchData(updatedFilterParams);
  };
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">User Name</span>,
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile No</span>,
      selector: (row) => row.mobile,
      wrap: true,
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
      name: <span className="font-weight-bold fs-13">CreatedAt</span>,
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
            <option value="Active">Active</option>
            <option value="banned">Banned</option>
          </Input>
        </FormGroup>
      </Col>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getUserStatus.data && getUserStatus.data.rows}
          totalRows={(getUserStatus.data && getUserStatus.data.count) || 0}
          loading={fetchingData && getUserStatus.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          selectedRows={selectedRows}
          exportFileName="UserStatus"
        />
      </div>
    </React.Fragment>
  );
};

export default UserStatus;
