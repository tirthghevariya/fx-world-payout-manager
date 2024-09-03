import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../../common/DataTable";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { walletHistoryColumns } from "../../../Components/Common/columnsConfig";
import {
  updateTicketStates,
  updateState,
} from "../../../slices/ticket/reducer";

import {
  getWalletHistoryList,
  deleteWalletHistory,
  deleteBulkWalletHistory,
} from "../../../slices/thunks";

const WalletHistory = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { walletHistory, filterParams } = useSelector((state) => state.wallet);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getWalletHistoryList(filterParams));
  };

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    dispatch(deleteWalletHistory(id));
  };

  const handleBulkDelete = () => {
    const Ids = selectedRows.map((row) => row.id);
    if (Ids.length > 0) {
      const payload = {
        Ids: Ids,
      };
      dispatch(deleteBulkWalletHistory(payload));
      setSelectedRows([]);
    }
  };

  const columns = walletHistoryColumns({
    onDeleteClick,
    dispatch,
    updateTicketStates,
  });

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
          fetchData={() => fetchData(filterParams)}
          from="transaction"
          searchEnable={true}
          filterParams={filterParams}
          data={walletHistory.data && walletHistory.data.rows}
          totalRows={(walletHistory.data && walletHistory.data.count) || 0}
          loading={fetchingData && walletHistory.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          showExportButton={true}
          selectedRows={selectedRows}
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          exportFileName="TicketData"
          bulkDelete={handleBulkDelete}
        />
      </div>
    </React.Fragment>
  );
};

export default WalletHistory;
