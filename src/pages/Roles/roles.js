import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  getRoleList,
  deleteRole,
  createRoles,
  deletebulkRoles,
} from "../../slices/thunks";
import { updateState, updateRoleStates } from "../../slices/roles/reducer";
import { createRoleSchema } from "../../Components/validations";
import {
  createRoleformFields,
  addButtonText,
} from "../../Components/Common/formFields";
import { keysToSnake } from "../../common/ReqResConvertCase";
import { roleColumns } from "../../Components/Common/columnsConfig";

const Roles = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { getRolesList, filterParams, insertRole } = useSelector(
    (state) => state.role
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getRoleList(keysToSnake(filterParams)));
  };

  const initialValues = {
    name: "",
    permission: [],
  };

  const onDeleteClick = (event, roleId) => {
    event.preventDefault();
    dispatch(deleteRole(roleId));
  };

  const columns = roleColumns({
    dispatch,
    updateRoleStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const roleIds = selectedRows.map((row) => row.roleId);
    if (roleIds.length > 0) {
      const payload = {
        roleIds: roleIds,
      };
      dispatch(deletebulkRoles(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Role"} pageTitle="Roles" />
          <FormModalBuilder
            formFields={createRoleformFields}
            validationSchema={createRoleSchema}
            submitButtonText={addButtonText}
            onSubmitActions={[createRoles]}
            onUpdateStateActions={[updateState]}
            modalStates={[insertRole]}
            modalTitle="Add New Role"
            closeTitle=""
            initialValues={initialValues}
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="role"
          searchEnable={true}
          filterParams={filterParams}
          data={
            (getRolesList && getRolesList.data && getRolesList.data.rows) || []
          }
          totalRows={
            (getRolesList && getRolesList.data && getRolesList.data.count) || 0
          }
          loading={fetchingData && getRolesList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="PermissionData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Roles;
