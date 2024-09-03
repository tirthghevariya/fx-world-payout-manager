import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";

import { vendorColumns } from "../../Components/Common/columnsConfig";
import {
  updateBrandStatus,
  deleteFundRequest,
  bulkDeleteFundRequest,
} from "../../slices/thunks";
import { updateFundRequestStates } from "../../slices/wallet/reducer";
import { getVendorList } from "../../slices/thunks";

const VendorList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { vendorList, filterParams } = useSelector((state) => state.user);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getVendorList(filterParams));
  };

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    dispatch(deleteFundRequest(id));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      status: newStatus,
      id: row.id,
    };
    dispatch(updateBrandStatus(payload));
  };

  const columns = vendorColumns({
    onDeleteClick,
    dispatch,
    changeStatus,
    updateFundRequestStates,
  });

  const handleBulkDelete = () => {
    const Ids = selectedRows.map((row) => row.id);
    if (Ids.length > 0) {
      const payload = {
        Ids: Ids,
      };
      dispatch(bulkDeleteFundRequest(payload));
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
            vendorList.data && vendorList.data.rows ? vendorList.data.rows : []
          }
          totalRows={
            vendorList.data && vendorList.data.count ? vendorList.data.count : 0
          }
          loading={fetchingData && vendorList.length === 0}
          showAddButton={false}
          addOnClickMethod={() => {}}
          showExportButton={true}
          exportFileName="vendorList"
          checkboxEnabled={false}
          bulkSelected={() => {}}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default VendorList;
