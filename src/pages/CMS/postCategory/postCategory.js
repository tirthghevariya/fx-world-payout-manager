import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../../Components/Common/CommonInputForm";
import CommonDataTable from "../../../common/DataTable";

import {
  createPostCategorySchema,
  updatePostCategorySchema,
} from "../../../Components/validations";
import {
  createPostCategoryformFields,
  updatePostCategoryformFields,
  addButtonText,
  updateButtonText,
} from "../../../Components/Common/formFields";
import { PostCategoryColumns } from "../../../Components/Common/columnsConfig";

import {
  getPostCategoryList,
  deletePostCategory,
  deleteBulkPostCategory,
  createPostCategory,
  editPostCategory,
  updatePostCategoryStatus,
} from "../../../slices/thunks";
import {
  updatePostCategoryStates,
  updateState,
} from "../../../slices/postCategory/reducer";

const PostCategory = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    filterParams,
    postCategoryList,
    insertPostCategory,
    updatePostCategory,
  } = useSelector((state) => state.postCategory);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getPostCategoryList(filterParams));
  };

  const singleData = updatePostCategory.singlePostCategory;
  const initialValues = {
    name: String(
      (updatePostCategory.singlePostCategory && singleData.name) || ""
    ),
    postCategoryId: String(
      (updatePostCategory.singlePostCategory && singleData.postCategoryId) ||
        "InActive"
    ),
    categoryStatus: String(
      (updatePostCategory.singlePostCategory && singleData.categoryStatus) || ""
    ),
    metaTitle: String(
      (updatePostCategory.singlePostCategory && singleData.metaTitle) || ""
    ),
    metaDescription: String(
      (updatePostCategory.singlePostCategory && singleData.metaDescription) ||
        ""
    ),
    metaKeywords: String(
      (updatePostCategory.singlePostCategory && singleData.metaKeywords) || ""
    ),
  };

  const initialValue = {
    name: "",
    categoryStatus: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  };

  const onDeleteClick = (event, postCategoryId) => {
    event.preventDefault();
    dispatch(deletePostCategory(postCategoryId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      categoryStatus: newStatus,
      postCategoryId: row.postCategoryId,
    };
    dispatch(updatePostCategoryStatus(payload));
  };

  const columns = PostCategoryColumns({
    dispatch,
    updatePostCategoryStates,
    onDeleteClick,
    changeStatus,
  });

  const handleBulkDelete = () => {
    const postCategoryIds = selectedRows.map((row) => row.postCategoryId);
    if (postCategoryIds.length > 0) {
      const payload = {
        postCategoryIds: postCategoryIds,
      };
      dispatch(deleteBulkPostCategory(payload));
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
              updatePostCategory.isEdit
                ? updatePostCategoryformFields
                : createPostCategoryformFields
            }
            validationSchema={
              updatePostCategory.isEdit
                ? updatePostCategorySchema
                : createPostCategorySchema
            }
            submitButtonText={
              updatePostCategory.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updatePostCategory.isEdit ? editPostCategory : createPostCategory,
            ]}
            onUpdateStateActions={[
              updatePostCategory.isEdit
                ? updatePostCategoryStates
                : updateState,
            ]}
            modalStates={[
              updatePostCategory.isEdit
                ? updatePostCategory
                : insertPostCategory,
            ]}
            modalTitle={`${
              updatePostCategory.isEdit
                ? "Update Post Category"
                : "Add New Post Category"
            }`}
            closeTitle=""
            initialValues={
              updatePostCategory.isEdit ? initialValues : initialValue
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
          data={postCategoryList.data && postCategoryList.data.rows}
          totalRows={
            (postCategoryList.data && postCategoryList.data.count) || 0
          }
          loading={fetchingData && postCategoryList.length === 0}
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

export default PostCategory;
