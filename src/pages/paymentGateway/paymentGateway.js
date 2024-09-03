import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  createPGFormFields,
  updatePGFormFields,
} from "../../Components/Common/formFields";
import {
  updateState,
  updatePaymentGatewayStates,
} from "../../slices/paymentGateway/reducer";
import { createPGSchema, updatePGSchema } from "../../Components/validations";
import { paymentGatewayColumns } from "../../Components/Common/columnsConfig";
import {
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import {
  getPaymentGatewayList,
  deletePaymentGateway,
  createPaymentGateway,
  editPaymentGateway,
} from "../../slices/thunks";

const PaymentGateway = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    filterParams,
    paymentGatewayList,
    createPayment,
    updatePaymentGateway,
  } = useSelector((state) => state.paymentGateway);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getPaymentGatewayList(filterParams));
  };

  const addInitialValue = {
    paymentGatewayName: "",
    paymentGatewayUrl: "",
    paymentGatewayMode: "",
    keyId: "",
    keySecret: "",
    merchantId: "",
    merchantKey: "",
    clientId: "",
    clientSecret: "",
    other: "",
    paymentGatewayId: "",
  };

  const pgData = updatePaymentGateway.singlePaymentGateway;

  const updateInitialValue = {
    paymentGatewayName: pgData && pgData.paymentGatewayName,
    paymentGatewayUrl: pgData && pgData.paymentGatewayUrl,
    paymentGatewayMode: pgData && pgData.paymentGatewayMode,
    keyId: pgData && pgData.keyId,
    keySecret: pgData && pgData.keySecret,
    merchantId: pgData && pgData.merchantId,
    merchantKey: pgData && pgData.merchantKey,
    clientId: pgData && pgData.clientId,
    clientSecret: pgData && pgData.clientSecret,
    other: pgData && pgData.other,
    paymentGatewayId: pgData && pgData.paymentGatewayId,
  };

  const onDeleteClick = (event, paymentGatewayId) => {
    event.preventDefault();
    dispatch(deletePaymentGateway(paymentGatewayId));
  };

  const columns = paymentGatewayColumns({
    dispatch,
    updatePaymentGatewayStates,
    onDeleteClick,
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
          <FormModalBuilder
            formFields={
              updatePaymentGateway.isEdit
                ? updatePGFormFields
                : createPGFormFields
            }
            validationSchema={
              updatePaymentGateway.isEdit ? updatePGSchema : createPGSchema
            }
            submitButtonText={
              updatePaymentGateway.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updatePaymentGateway.isEdit
                ? editPaymentGateway
                : createPaymentGateway,
            ]}
            onUpdateStateActions={[
              updatePaymentGateway.isEdit
                ? updatePaymentGatewayStates
                : updateState,
            ]}
            modalStates={[
              updatePaymentGateway.isEdit
                ? updatePaymentGateway
                : createPayment,
            ]}
            modalTitle={`${
              updatePaymentGateway.isEdit
                ? "Update Post Type"
                : "Add New Payment Gateway"
            }`}
            closeTitle=""
            initialValues={
              updatePaymentGateway.isEdit ? updateInitialValue : addInitialValue
            }
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
          data={paymentGatewayList.data && paymentGatewayList.data.rows}
          totalRows={
            (paymentGatewayList.data && paymentGatewayList.data.count) || 0
          }
          loading={fetchingData && paymentGatewayList.length === 0}
          showAddButton={true}
          buttonName="Create"
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={false}
          checkboxEnabled={false}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default PaymentGateway;
