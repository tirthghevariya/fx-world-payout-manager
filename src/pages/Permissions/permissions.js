import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  createPermission,
  updatePermissions,
  permissionsList,
  deletePermission,
  deleteBulkPermission,
} from "../../slices/permission/thunk";
import {
  updateState,
  updatePermissionStates,
} from "../../slices/permission/reducer";
import {
  createPermissionSchema,
  updatePermissionSchema,
} from "../../Components/validations";
import {
  createPermissionformFields,
  updatePermissionformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { PermissionColumns } from "../../Components/Common/columnsConfig";

const PermissionsList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    filterParams,
    insertPermission,
    updatePermission,
    getPermissionList,
  } = useSelector((state) => state.permission);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(permissionsList(filterParams));
  };

  const initialValues = {
    name: "",
    parent: String(updatePermission.singlePermission || ""),
  };
  const initialValue = {
    name: "",
    parent: "",
  };

  const onDeleteClick = (event, permissionId) => {
    event.preventDefault();
    dispatch(deletePermission(permissionId));
  };

  const columns = PermissionColumns({
    dispatch,
    updatePermissionStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const permissionIds = selectedRows.map((row) => row.permissionId);
    if (permissionIds.length > 0) {
      const payload = {
        permissionIds: permissionIds,
      };
      dispatch(deleteBulkPermission(payload));
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
              updatePermission.isEdit
                ? updatePermissionformFields
                : createPermissionformFields
            }
            validationSchema={
              updatePermission.isEdit
                ? updatePermissionSchema
                : createPermissionSchema
            }
            submitButtonText={
              updatePermission.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updatePermission.isEdit ? updatePermissions : createPermission,
            ]}
            onUpdateStateActions={[
              updatePermission.isEdit ? updatePermissionStates : updateState,
            ]}
            modalStates={[
              updatePermission.isEdit ? updatePermission : insertPermission,
            ]}
            modalTitle={`${
              updatePermission.isEdit
                ? "Update permission"
                : "Add New Permission"
            }`}
            closeTitle=""
            initialValues={
              updatePermission.isEdit ? initialValues : initialValue
            }
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="permission"
          searchEnable={true}
          filterParams={filterParams}
          data={
            (getPermissionList &&
              getPermissionList.data &&
              getPermissionList.data.rows) ||
            []
          }
          totalRows={
            getPermissionList &&
            getPermissionList.data &&
            getPermissionList.data.count
              ? getPermissionList.data.count
              : 0
          }
          loading={fetchingData && getPermissionList.length === 0}
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

export default PermissionsList;
