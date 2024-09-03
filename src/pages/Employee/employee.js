import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  createEmployeeSchema,
  updateEmployeeStatusSchema,
  updateEmployeeSchema,
} from "../../Components/validations";
import {
  createEmployeeformFields,
  addButtonText,
  updateEmployeeStatusformFields,
  updateBannedButtonText,
  updateEmployeeformFields,
  updateButtonText,
} from "../../Components/Common/formFields";
import { employeeColumns } from "../../Components/Common/columnsConfig";
import {
  getEmployeeList,
  deleteEmployee,
  deletebulkEmployee,
  createEmployee,
  updateEmployeeStatus,
  updateEmployee,
} from "../../slices/thunks";
import {
  updateEmployeeStates,
  updateState,
  updateStatusStates,
} from "../../slices/employee/reducer";

import { getRoleList } from "../../slices/thunks";

const Employee = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    filterParams,
    employeeList,
    insertEmployee,
    updateStatus,
    editEmployee,
  } = useSelector((state) => state.employee);

  const { getRolesList } = useSelector((state) => state.role);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getEmployeeList(filterParams));
    dispatch(getRoleList());
  };

  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
    role: "47",
  };

  const employeeData = editEmployee.singleEmployee;
  const updateInitialValues = {
    email: employeeData && employeeData.email,
    password: "",
    firstName: employeeData && employeeData.firstName,
    lastName: employeeData && employeeData.lastName,
    mobile: employeeData && employeeData.mobile,
    role: employeeData && employeeData.role,
    adminId: employeeData && employeeData.adminId,
  };

  const onDeleteClick = (event, adminId) => {
    event.preventDefault();
    dispatch(deleteEmployee(adminId));
  };

  const columns = employeeColumns({
    dispatch,
    updateEmployeeStates,
    onDeleteClick,
    updateStatusStates,
    updateEmployeeStatus,
  });

  const handleBulkDelete = () => {
    const adminIds = selectedRows.map((row) => row.adminId);
    if (adminIds.length > 0) {
      const payload = {
        adminIds: adminIds,
      };
      dispatch(deletebulkEmployee(payload));
      setSelectedRows([]);
    }
  };

  const updateStatusInitial = {
    accountStatus: "Banned",
    bannedReason: "",
    adminId:
      updateStatus.singleEmployee && updateStatus.singleEmployee.adminId
        ? String(updateStatus.singleEmployee.adminId)
        : "",
  };

  const roleOption = [
    ...(getRolesList.data && getRolesList.data.rows
      ? getRolesList.data.rows.map((role) => ({
          label: role.name,
          value: role.roleId ? role.roleId.toString() : "",
        }))
      : []),
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Role"} pageTitle="Employee" />

          <FormModalBuilder
            formFields={updateEmployeeStatusformFields}
            validationSchema={updateEmployeeStatusSchema}
            submitButtonText={updateBannedButtonText}
            onSubmitActions={[updateEmployeeStatus]}
            onUpdateStateActions={[updateStatusStates]}
            modalStates={[updateStatus]}
            modalTitle={"Reason for Banning User"}
            closeTitle=""
            initialValues={updateStatusInitial}
          />

          <FormModalBuilder
            formFields={
              editEmployee.isEdit
                ? updateEmployeeformFields(roleOption)
                : createEmployeeformFields(roleOption)
            }
            validationSchema={
              editEmployee.isEdit ? updateEmployeeSchema : createEmployeeSchema
            }
            submitButtonText={
              editEmployee.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              editEmployee.isEdit ? updateEmployee : createEmployee,
            ]}
            onUpdateStateActions={[
              editEmployee.isEdit ? updateEmployeeStates : updateState,
            ]}
            modalStates={[editEmployee.isEdit ? editEmployee : insertEmployee]}
            modalTitle={`${
              editEmployee.isEdit ? "Update Employee" : "Add New Employee"
            }`}
            closeTitle=""
            initialValues={
              editEmployee.isEdit ? updateInitialValues : initialValues
            }
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="employee"
          searchEnable={true}
          filterParams={filterParams}
          data={(employeeList.data && employeeList.data.rows) || []}
          totalRows={(employeeList.data && employeeList.data.count) || 0}
          loading={fetchingData && employeeList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="Employee"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Employee;
