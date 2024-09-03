import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import { deleteBulkPermission } from "../../slices/permission/thunk";
import {
  updateSettingSchema,
  createSettingSchema,
} from "../../Components/validations";
import {
  createSettingformFields,
  updateSettingformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { settingColumns } from "../../Components/Common/columnsConfig";

import {
  getAllSettingList,
  deleteSetting,
  updateSingleSetting,
  createSetting,
} from "../../slices/thunks";

import { updateSettingStates, updateState } from "../../slices/setting/reducer";

const InsertSetting = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, settingList, updateSetting, insertSetting } =
    useSelector((state) => state.setting);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getAllSettingList(filterParams));
  };

  const updateSettData = updateSetting.singleSetting;
  const initialValues = {
    key: String((updateSettData && updateSettData.key) || ""),
    value: String((updateSettData && updateSettData.value) || ""),
    label: String((updateSettData && updateSettData.label) || ""),
    description: String((updateSettData && updateSettData.description) || ""),
    settingId: (updateSettData && updateSettData.settingId) || 0,
  };

  const initialValue = {
    key: "",
    value: "",
    label: "",
    description: "",
  };

  const onDeleteClick = (event, settingId) => {
    event.preventDefault();
    dispatch(deleteSetting(settingId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? true : false;
    const payload = {
      isActive: newStatus,
      settingId: row.settingId,
    };
    dispatch(updateSingleSetting(payload));
  };

  const changeEditableStatus = (row, checked) => {
    const newStatus = checked ? true : false;
    const payload = {
      isEditable: newStatus,
      settingId: row.settingId,
    };
    dispatch(updateSingleSetting(payload));
  };

  const columns = settingColumns({
    dispatch,
    updateSettingStates,
    onDeleteClick,
    changeStatus,
    changeEditableStatus,
  });

  const handleBulkDelete = () => {
    const settingIds = selectedRows.map((row) => row.settingId);
    if (settingIds.length > 0) {
      const payload = {
        settingIds: settingIds,
      };
      dispatch(deleteBulkPermission(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Update Employee setting"} pageTitle="setting" />
          <FormModalBuilder
            formFields={
              updateSetting.isEdit
                ? updateSettingformFields
                : createSettingformFields
            }
            validationSchema={
              updateSetting.isEdit ? createSettingSchema : updateSettingSchema
            }
            submitButtonText={
              updateSetting.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updateSetting.isEdit ? updateSingleSetting : createSetting,
            ]}
            onUpdateStateActions={[
              updateSetting.isEdit ? updateSettingStates : updateState,
            ]}
            modalStates={[updateSetting.isEdit ? updateSetting : insertSetting]}
            modalTitle={`${
              updateSetting.isEdit ? "Update Setting" : "Add New Setting"
            }`}
            closeTitle=""
            initialValues={updateSetting.isEdit ? initialValues : initialValue}
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="setting"
          searchEnable={true}
          filterParams={filterParams}
          data={settingList.data && settingList.data.rows}
          totalRows={(settingList.data && settingList.data.count) || 0}
          loading={fetchingData && settingList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="settingData"
          checkboxEnabled={false}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default InsertSetting;
