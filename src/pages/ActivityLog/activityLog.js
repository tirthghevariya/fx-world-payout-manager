import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  getLogList,
  deleteActivityLog,
  deleteBulkActivityLog,
} from "../../slices/thunks";
import { activityLogColumns } from "../../Components/Common/columnsConfig";
import { updateCouponStates, updateState } from "../../slices/coupon/reducer";

const ActivityLogList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, logList } = useSelector((state) => state.activityLog);
  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getLogList(filterParams));
  };

  const onDeleteClick = (event, logId) => {
    event.preventDefault();
    dispatch(deleteActivityLog(logId));
  };

  const columns = activityLogColumns({
    dispatch,
    updateCouponStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const logIds = selectedRows.map((row) => row.logId);
    if (logIds.length > 0) {
      const payload = {
        logIds: logIds,
      };
      dispatch(deleteBulkActivityLog(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content "></div>
      <div className="table-container mt-4">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="activityLog"
          searchEnable={true}
          filterParams={filterParams}
          data={(logList && logList.data && logList.data.rows) || []}
          totalRows={
            logList && logList.data && logList.data.count
              ? logList.data.count
              : 0
          }
          download={(logList && logList.data && logList.data) || []}
          loading={fetchingData && logList.length === 0}
          showAddButton={false}
          addOnClickMethod={() => {}}
          showExportButton={true}
          exportFileName="activityLog"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default ActivityLogList;
