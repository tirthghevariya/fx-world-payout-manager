import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getCustomerFeedbackList } from "../../slices/thunks";
import { customerFeedbackColumns } from "../../Components/Common/columnsConfig";

const CustomerFeedback = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, feedback } = useSelector((state) => state.reports);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getCustomerFeedbackList(filterParams));
  };

  const columns = customerFeedbackColumns();

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
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={feedback.data && feedback.data.rows}
          totalRows={(feedback.data && feedback.data.count) || 0}
          loading={fetchingData && feedback.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="CustomerFeedback"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default CustomerFeedback;
