import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../../Components/Common/CommonInputForm";
import CommonDataTable from "../../../common/DataTable";

import {
  createPostTypeSchema,
  updatePostTypeSchema,
} from "../../../Components/validations";
import {
  createPostTypeformFields,
  updatePostTypeformFields,
  addButtonText,
  updateButtonText,
} from "../../../Components/Common/formFields";
import { PostTypeColumns } from "../../../Components/Common/columnsConfig";

import {
  getPostTypeList,
  deletePostType,
  deleteBulkPostType,
  createPostType,
  editPostType,
} from "../../../slices/thunks";
import {
  updatePostTypeStates,
  updateState,
} from "../../../slices/postType/reducer";

const PostType = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, postTypeList, insertPostType, updatePostType } =
    useSelector((state) => state.postType);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getPostTypeList(filterParams));
  };

  const singleData = updatePostType.singlePostType;
  const initialValues = {
    name: String((singleData && singleData.name) || ""),
    postTypeId: String((singleData && singleData.postTypeId) || ""),
  };
  const initialValue = {
    name: "",
    parent: "",
  };

  const onDeleteClick = (event, postTypeId) => {
    event.preventDefault();
    dispatch(deletePostType(postTypeId));
  };

  const columns = PostTypeColumns({
    dispatch,
    updatePostTypeStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const postTypeIds = selectedRows.map((row) => row.postTypeId);
    if (postTypeIds.length > 0) {
      const payload = {
        postTypeIds: postTypeIds,
      };
      dispatch(deleteBulkPostType(payload));
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
              updatePostType.isEdit
                ? updatePostTypeformFields
                : createPostTypeformFields
            }
            validationSchema={
              updatePostType.isEdit
                ? updatePostTypeSchema
                : createPostTypeSchema
            }
            submitButtonText={
              updatePostType.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updatePostType.isEdit ? editPostType : createPostType,
            ]}
            onUpdateStateActions={[
              updatePostType.isEdit ? updatePostTypeStates : updateState,
            ]}
            modalStates={[
              updatePostType.isEdit ? updatePostType : insertPostType,
            ]}
            modalTitle={`${
              updatePostType.isEdit ? "Update Post Type" : "Add New Post Type"
            }`}
            closeTitle=""
            initialValues={updatePostType.isEdit ? initialValues : initialValue}
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
          data={postTypeList.data && postTypeList.data.rows}
          totalRows={(postTypeList.data && postTypeList.data.count) || 0}
          loading={fetchingData && postTypeList.length === 0}
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

export default PostType;
