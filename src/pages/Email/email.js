import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { emailColumns } from "../../Components/Common/columnsConfig";
import {
  getEmailList,
  deleteEmail,
  deleteBulkEmail,
  updateEmailStatus,
} from "../../slices/thunks";
import { updateEmailStates } from "../../slices/email/reducer";
const Email = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, emailList } = useSelector((state) => state.email);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getEmailList(filterParams));
  };

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    dispatch(deleteEmail(id));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "inActive";
    const payload = {
      status: newStatus,
      id: row.id,
    };
    dispatch(updateEmailStatus(payload));
  };

  const columns = emailColumns({
    dispatch,
    updateEmailStates,
    onDeleteClick,
    changeStatus,
  });

  const handleBulkDelete = () => {
    const ids = selectedRows.map((row) => row.id);
    if (ids.length > 0) {
      const payload = {
        ids: ids,
      };
      dispatch(deleteBulkEmail(payload));
      setSelectedRows([]);
    }
  };

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
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="email"
          searchEnable={true}
          filterParams={filterParams}
          data={emailList.data && emailList.data.rows}
          totalRows={(emailList.data && emailList.data.count) || 0}
          loading={fetchingData && emailList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => {
            window.location.href = "create/email-template";
          }}
          showExportButton={true}
          exportFileName="EmailData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Email;
