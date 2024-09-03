import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getLessThan10ProductsList } from "../../slices/thunks";

const LessThan10ProductList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows] = useState([]);

  const { filterParams, getProductsLessThan10 } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getLessThan10ProductsList(filterParams));
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: <span className="font-weight-bold fs-13">SKU</span>,
      selector: (row) => row.SKU,
      sortable: true,
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
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getProductsLessThan10.data && getProductsLessThan10.data.rows}
          totalRows={
            (getProductsLessThan10.data && getProductsLessThan10.data.count) ||
            0
          }
          loading={fetchingData && getProductsLessThan10.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="LessThan10QuantityData"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default LessThan10ProductList;
