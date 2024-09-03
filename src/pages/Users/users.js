import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  getUserList,
  updateUsers,
  createUser,
  deleteUser,
  updateUserStatus,
  bulkDeleteUser,
} from "../../slices/thunks";
import {
  updateUserStates,
  updateState,
  updateStatusStates,
} from "../../slices/users/reducer";
import {
  createUserSchema,
  updateUserSchema,
  updateUserStatusSchema,
} from "../../Components/validations";
import {
  createUserformFields,
  updateUserformFields,
  updateUserStatusformFields,
  addButtonText,
  updateButtonText,
  updateBannedButtonText,
} from "../../Components/Common/formFields";
import { UserColumns } from "../../Components/Common/columnsConfig";

const Users = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, insersUser, updateUser, userList, updateStatus } =
    useSelector((state) => state.user);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getUserList(filterParams));
  };

  const addInitialValues = {
    email: "",
    firstName: "",
  };

  const updateStatusInitial = {
    userStatus: "Banned",
    bannedReason: "",
    userId:
      updateStatus.singleUser && updateStatus.singleUser.userId
        ? String(updateStatus.singleUser.userId)
        : "",
  };

  const updateInitialValue = {
    email:
      typeof updateUser.singleUser === "object" && updateUser.singleUser.email
        ? String(updateUser.singleUser.email)
        : "",
    firstName:
      updateUser.singleUser && updateUser.singleUser.firstName
        ? String(updateUser.singleUser.firstName)
        : "",
    userId:
      updateUser.singleUser && "userId" in updateUser.singleUser
        ? String(updateUser.singleUser.userId)
        : "",
  };

  const onDeleteClick = (event, userId) => {
    event.preventDefault();
    dispatch(deleteUser(userId));
  };

  const handleBulkDelete = () => {
    const userIds = selectedRows.map((row) => row.userId);
    if (userIds.length > 0) {
      const payload = {
        userIds: userIds,
      };

      dispatch(bulkDeleteUser(payload));
      setSelectedRows([]);
    }
  };

  const columns = UserColumns({
    dispatch,
    updateStatusStates,
    updateUserStates,
    onDeleteClick,
    updateUserStatus,
    selectedRows,
    setSelectedRows,
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
            formFields={updateUserStatusformFields}
            validationSchema={updateUserStatusSchema}
            submitButtonText={updateBannedButtonText}
            onSubmitActions={[updateUserStatus]}
            onUpdateStateActions={[updateStatusStates]}
            modalStates={[updateStatus]}
            modalTitle={"Reason for Banning User"}
            closeTitle=""
            initialValues={updateStatusInitial}
          />
          <FormModalBuilder
            formFields={
              updateUser.isEdit ? updateUserformFields : createUserformFields
            }
            validationSchema={
              updateUser.isEdit ? updateUserSchema : createUserSchema
            }
            submitButtonText={
              updateUser.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[updateUser.isEdit ? updateUsers : createUser]}
            onUpdateStateActions={[
              updateUser.isEdit ? updateUserStates : updateState,
            ]}
            modalStates={[updateUser.isEdit ? updateUser : insersUser]}
            modalTitle={`${updateUser.isEdit ? "Update User" : "Add New User"}`}
            closeTitle=""
            initialValues={
              updateUser.isEdit ? updateInitialValue : addInitialValues
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
          userId
          data={
            userList && userList.data && userList.data.rows
              ? userList.data.rows
              : []
          }
          totalRows={
            userList && userList.data && userList.data.count
              ? userList.data.count
              : 0
          }
          loading={fetchingData && userList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="userData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Users;
