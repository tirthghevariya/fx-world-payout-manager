import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { vendorOrderColumns } from "../../Components/Common/columnsConfig";
import { updateOrderStates } from "../../slices/order/reducer";
import {
  deleteOrder,
  deleteBulkOrder,
  getVendorOrderList,
} from "../../slices/thunks";

const VendorOrderList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, vendorOrderList } = useSelector((state) => state.order);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getVendorOrderList(filterParams));
  };

  const onDeleteClick = (event, orderId) => {
    event.preventDefault();
    dispatch(deleteOrder(orderId));
  };

  const columns = vendorOrderColumns({
    dispatch,
    updateOrderStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const orderIds = selectedRows.map((row) => row.orderId);
    if (orderIds.length > 0) {
      const payload = {
        orderIds: orderIds,
      };
      dispatch(deleteBulkOrder(payload));
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
          from="orderList"
          searchEnable={true}
          filterParams={filterParams}
          data={vendorOrderList.data && vendorOrderList.data}
          totalRows={(vendorOrderList.data && vendorOrderList.data.count) || 0}
          loading={fetchingData && vendorOrderList.length === 0}
          showAddButton={false}
          showExportButton={true}
          exportFileName="VendorOrderList"
          checkboxEnabled={true}
          showOrderButton={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};
export default VendorOrderList;
