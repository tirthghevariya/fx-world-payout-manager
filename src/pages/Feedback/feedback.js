import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { feedbackColumns } from "../../Components/Common/columnsConfig";
import { updateBrandStates, updateState } from "../../slices/brand/reducer";

import {
  getFeedbackList,
  deleteFeedback,
  bulkDeleteContact,
} from "../../slices/contact/thunk";

const FeedbackList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, getFeedback } = useSelector((state) => state.feedback);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getFeedbackList(filterParams));
  };

  const onDeleteClick = (event, contactId) => {
    event.preventDefault();
    dispatch(deleteFeedback(contactId));
  };

  const columns = feedbackColumns({
    onDeleteClick,
    dispatch,
    updateBrandStates,
  });

  const handleBulkDelete = () => {
    const contactIds = selectedRows.map((row) => row.contactId);
    if (contactIds.length > 0) {
      const payload = {
        contactIds: contactIds,
      };
      dispatch(bulkDeleteContact(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Brand"} pageTitle="brand" />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="brand"
          searchEnable={true}
          filterParams={filterParams}
          data={
            getFeedback.data && getFeedback.data.rows
              ? getFeedback.data.rows
              : []
          }
          totalRows={
            getFeedback.data && getFeedback.data.count
              ? getFeedback.data.count
              : 0
          }
          loading={fetchingData && getFeedback.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="BrandData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default FeedbackList;
