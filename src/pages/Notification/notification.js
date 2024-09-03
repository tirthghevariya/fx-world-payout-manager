import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import { sendNotificationFormFields } from "../../Components/Common/formFields";
import { updateState } from "../../slices/notification/reducer";
import { sendNotificationSchema } from "../../Components/validations";
import { notificationColumns } from "../../Components/Common/columnsConfig";
import { sendNotificationText } from "../../Components/Common/formFields";
import {
  getNotificationList,
  deleteNotification,
  sendSms,
  bulkDeleteNotification,
} from "../../slices/thunks";

const Notification = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, notificationList, sendSMS } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getNotificationList(filterParams));
  };

  const addInitialValue = {
    mobile: "",
    message: "",
  };

  const onDeleteClick = (event, notificationId) => {
    event.preventDefault();
    dispatch(deleteNotification(notificationId));
  };

  const columns = notificationColumns(onDeleteClick);

  const handleBulkDelete = () => {
    const notificationIds = selectedRows.map((row) => row.notificationId);
    if (notificationIds.length > 0) {
      const payload = {
        notificationIds: notificationIds,
      };
      dispatch(bulkDeleteNotification(payload));
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
          <FormModalBuilder
            formFields={sendNotificationFormFields}
            validationSchema={sendNotificationSchema}
            submitButtonText={sendNotificationText}
            onSubmitActions={[sendSms]}
            onUpdateStateActions={[updateState]}
            modalStates={[sendSMS]}
            modalTitle={"Send Notification"}
            closeTitle=""
            initialValues={addInitialValue}
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
          data={notificationList.data && notificationList.data.rows}
          totalRows={
            (notificationList.data && notificationList.data.count) || 0
          }
          loading={fetchingData && notificationList.length === 0}
          showAddButton={true}
          buttonName="Send"
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={false}
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Notification;
