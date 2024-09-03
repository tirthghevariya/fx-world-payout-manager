import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../../Components/Common/CommonInputForm";
import CommonDataTable from "../../../common/DataTable";
import { createFundRequestSchema } from "../../../Components/validations";
import {
  createFundRequestformFields,
  updateFundRequestformFields,
  addButtonText,
  updateButtonText,
} from "../../../Components/Common/formFields";
import { fundRequestColumns } from "../../../Components/Common/columnsConfig";
import {
  editBrand,
  updateBrandStatus,
  getFundRequestHistory,
  createFundRequest,
  deleteFundRequest,
  bulkDeleteFundRequest,
} from "../../../slices/thunks";
import {
  updateState,
  updateFundRequestStates,
} from "../../../slices/wallet/reducer";

const FundRequest = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { fundRequest, filterParams, insertFundRequest, editFundRequest } =
    useSelector((state) => state.wallet);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getFundRequestHistory(filterParams));
  };

  const updateBrandData = editFundRequest.singleBrand;

  const updateInitialValues = {
    vendorId: 1,
    amount: updateBrandData && updateBrandData.amount,
    message: updateBrandData && updateBrandData.message,
    id: updateBrandData && updateBrandData.id,
  };

  const addInitialValue = {
    vendorId: 1,
    amount: "",
    message: "",
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

  const columns = fundRequestColumns({
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
          <FormModalBuilder
            formFields={
              editFundRequest.isEdit
                ? updateFundRequestformFields
                : createFundRequestformFields
            }
            validationSchema={
              editFundRequest.isEdit
                ? createFundRequestSchema
                : createFundRequestSchema
            }
            submitButtonText={
              editFundRequest.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              editFundRequest.isEdit ? editBrand : createFundRequest,
            ]}
            onUpdateStateActions={[
              editFundRequest.isEdit ? updateFundRequestStates : updateState,
            ]}
            modalStates={[
              editFundRequest.isEdit ? editFundRequest : insertFundRequest,
            ]}
            modalTitle={`${
              editFundRequest.isEdit ? "Update Fund Requst" : "Fund Request"
            }`}
            closeTitle=""
            initialValues={
              editFundRequest.isEdit ? updateInitialValues : addInitialValue
            }
          />
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
            fundRequest.data && fundRequest.data.rows
              ? fundRequest.data.rows
              : []
          }
          totalRows={
            fundRequest.data && fundRequest.data.count
              ? fundRequest.data.count
              : 0
          }
          loading={fetchingData && fundRequest.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="BrandData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default FundRequest;
