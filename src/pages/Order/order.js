import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { orderColumns } from "../../Components/Common/columnsConfig";
import { getOrderList } from "../../slices/thunks";
import { updateOrderStates } from "../../slices/order/reducer";
import { deleteOrder, deleteBulkOrder } from "../../slices/thunks";

const OrderList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, orderList } = useSelector((state) => state.order);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getOrderList(filterParams));
  };

  const onDeleteClick = (event, orderId) => {
    event.preventDefault();
    dispatch(deleteOrder(orderId));
  };

  const columns = orderColumns({
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
          data={orderList.data && orderList.data.rows}
          totalRows={(orderList.data && orderList.data.count) || 0}
          loading={fetchingData && orderList.length === 0}
          showAddButton={false}
          showExportButton={true}
          exportFileName="OrderList"
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
export default OrderList;
