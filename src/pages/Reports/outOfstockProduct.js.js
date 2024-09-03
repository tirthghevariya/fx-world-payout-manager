import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getOutOfStockProductsList } from "../../slices/thunks";
import { productReportColumns } from "../../Components/Common/columnsConfig";

const OutofStockProduct = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, outOfStockProducts } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getOutOfStockProductsList());
  };

  const columns = productReportColumns();

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
          data={outOfStockProducts.data && outOfStockProducts.data.rows}
          totalRows={
            (outOfStockProducts.data && outOfStockProducts.data.count) || 0
          }
          loading={fetchingData && outOfStockProducts.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="LessTan10QuantityData"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default OutofStockProduct;
