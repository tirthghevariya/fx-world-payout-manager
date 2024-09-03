import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { transactionList } from "../../slices/thunks";

const Transaction = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, getTransactionList } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(transactionList(filterParams));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Transaction Id</span>,
      selector: (row) => row.transactionId,
    },
    {
      name: <span className="font-weight-bold fs-13">Transaction Date</span>,
      selector: (row) => row.transactionDate,
    },
    {
      name: <span className="font-weight-bold fs-13">Transaction Status</span>,
      selector: (row) => row.transactionStatus,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Transaction Amount</span>,
      selector: (row) => row.transactionAmount,
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

      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="transaction"
          searchEnable={true}
          filterParams={filterParams}
          data={getTransactionList.data && getTransactionList.data.rows}
          totalRows={
            (getTransactionList.data && getTransactionList.data.count) || 0
          }
          loading={fetchingData && getTransactionList.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          selectedRows={selectedRows}
          exportFileName="Transaction"
        />
      </div>
    </React.Fragment>
  );
};

export default Transaction;
