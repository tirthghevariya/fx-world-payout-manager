import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import { updateState } from "../../slices/notification/reducer";
import { userNotificationColumns } from "../../Components/Common/columnsConfig";
import { bulkDeleteNotification } from "../../slices/thunks";

const Notification = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, notificationCount } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = () => {
    setFetchingData(true);
  };

  const columns = userNotificationColumns();

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
      <div className="page-content mt-4 "></div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={notificationCount.data && notificationCount.data.rows}
          totalRows={
            (notificationCount.data && notificationCount.data.count) || 0
          }
          loading={fetchingData && notificationCount.length === 0}
          showAddButton={false}
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
