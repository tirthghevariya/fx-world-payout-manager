import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import { createCurrencySchema } from "../../Components/validations";
import {
  createCurrencyformFields,
  updateCurrencyformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { currencyColumns } from "../../Components/Common/columnsConfig";
import {
  getCurrencyList,
  deleteCurrency,
  deletebulkCurrency,
  createCurrency,
  editCurrency,
} from "../../slices/thunks";
import {
  updateCurrencyStates,
  updateState,
} from "../../slices/currency/reducer";

const CurrencyList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, currencyList, insertCurrency, updateCurrency } =
    useSelector((state) => state.currency);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getCurrencyList(filterParams));
  };

  const currencyData = updateCurrency.singleCurrency;

  const updateInitialValues = {
    currencyId: (currencyData && currencyData.currencyId) || "",
    currencyCode: (currencyData && currencyData.currencyCode) || "",
    currencyName: (currencyData && currencyData.currencyName) || "",
    symbol: (currencyData && currencyData.symbol) || "",
    country: (currencyData && currencyData.country) || "",
    exchangeRate: (currencyData && currencyData.exchangeRate) || "",
    decimalPlaces: (currencyData && currencyData.decimalPlaces) || "",
  };

  const addInitialValue = {
    currencyCode: "",
    currencyName: "",
    symbol: "",
    country: "",
    exchangeRate: 0,
    decimalPlaces: 0,
  };

  const onDeleteClick = (event, currencyId) => {
    event.preventDefault();
    dispatch(deleteCurrency(currencyId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? true : false;
    const payload = {
      isActive: newStatus,
      currencyId: row.currencyId,
    };
    dispatch(editCurrency(payload));
  };

  const columns = currencyColumns({
    dispatch,
    updateCurrencyStates,
    onDeleteClick,
    changeStatus,
  });

  const handleBulkDelete = () => {
    const currencyIds = selectedRows.map((row) => row.currencyId);
    if (currencyIds.length > 0) {
      const payload = {
        currencyIds: currencyIds,
      };
      dispatch(deletebulkCurrency(payload));
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
          <FormModalBuilder
            formFields={
              updateCurrency.isEdit
                ? updateCurrencyformFields
                : createCurrencyformFields
            }
            validationSchema={
              updateCurrency.isEdit
                ? createCurrencySchema
                : createCurrencySchema
            }
            submitButtonText={
              updateCurrency.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updateCurrency.isEdit ? editCurrency : createCurrency,
            ]}
            onUpdateStateActions={[
              updateCurrency.isEdit ? updateCurrencyStates : updateState,
            ]}
            modalStates={[
              updateCurrency.isEdit ? updateCurrency : insertCurrency,
            ]}
            modalTitle={`${
              updateCurrency.isEdit ? "Update Currency" : "Add New Currency"
            }`}
            closeTitle=""
            initialValues={
              updateCurrency.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="coupon"
          searchEnable={true}
          filterParams={filterParams}
          data={
            (currencyList && currencyList.data && currencyList.data.rows) || []
          }
          totalRows={
            currencyList && currencyList.data && currencyList.data.count
              ? currencyList.data.count
              : 0
          }
          loading={fetchingData && currencyList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="currencyData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default CurrencyList;
