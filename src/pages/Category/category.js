/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import Switch from "react-switch";
import TableSkeleton from "../../common/Skeleton";
import {
  getCategoryList,
  createCategory,
  updateCategories,
  deleteCategory,
  updateCategoriesStatus,
} from "../../slices/thunks";
import createCategoryformFields from "../../Components/Common/formFields";
import {
  updateCategoryStates,
  updateState,
} from "../../slices/category/reducer";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../Components/validations";
import {
  updateCategoryformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import TreeTablePagination from "../../common/TreeTablePagination";

const TreeNode = ({ node, isParent = true }) => {
  const { categoryName, categoryStatus, children, image, action } = node;
  const hasChildren = children && children.length > 0;

  return (
    <>
      <tr className={`tree-node ${isParent ? "parent-node" : "child-node"}`}>
        <td style={{ paddingLeft: isParent ? "0" : "20px" }}></td>
        <td>{categoryName}</td>
        <td>{image}</td>
        <td>{categoryStatus}</td>
        <td>{action}</td>
      </tr>

      {hasChildren &&
        children.map((child) => (
          <tr key={child.id} className="tree-node child-node">
            <td style={{ paddingLeft: "20px" }}></td>
            <td>{child.categoryName}</td>
            <td>{child.image}</td>
            <td>{child.categoryStatus}</td>
            <td>{child.action}</td>
          </tr>
        ))}
    </>
  );
};

const TreeTable = ({ data }) => {
  const headerStyles = {
    backgroundColor: "#E2E5EF",
    color: "#000000",
    textAlign: "center",
    borderTop: "1px solid #C7C9D1",
    borderBottom: "1px solid #C7C9D1",
  };

  const contentStyles = {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
  };

  return (
    <Table className="tree-table">
      <thead style={headerStyles}>
        <tr>
          <th></th>
          <th>Category Name</th>
          <th>Image</th>
          <th>Category status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className="tree-node-padding" style={contentStyles}>
        {data.length > 0 ? (
          data.map((node) => <TreeNode key={node.id} node={node} />)
        ) : (
          <tr>
            <td colSpan="5">
              <div style={{ width: "100%", display: "block" }}>
                <TableSkeleton rows={10} columns={5} />{" "}
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

const CategoryList = () => {
  const dispatch = useDispatch();
  const [, setFetchingData] = useState(false);

  const { filterParams, getCategory, insertCategory, updateCategory } =
    useSelector((state) => state.category);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getCategoryList(filterParams));
  };

  const categoryOption = [
    { label: "Main category", value: "0" },
    ...(getCategory.data && getCategory.data.rows
      ? getCategory.data.rows.map((category) => ({
          label: category.category.categoryName,
          value: category.category.categoryId
            ? category.category.categoryId.toString()
            : "",
        }))
      : []),
  ];

  const updateCatData = updateCategory.singleCategory;

  const updateInitialValues = {
    categoryName: String(
      (updateCatData &&
        updateCatData.category &&
        updateCatData.category.categoryName) ||
        ""
    ),
    description: String(
      (updateCatData &&
        updateCatData.category &&
        updateCatData.category.description) ||
        ""
    ),
    parentCategoryId: "1",
    categoryImage:
      (updateCatData &&
        updateCatData.category &&
        updateCategory.imageUploadResponse) ||
      [],
    categoryStatus:
      (updateCatData &&
        updateCatData.category &&
        updateCatData.category.categoryStatus) ||
      "",
    categoryId: String(
      (updateCatData &&
        updateCatData.category &&
        updateCatData.category.categoryId) ||
        ""
    ),
  };

  const addInitialValue = {
    categoryName: "",
    description: "",
    parentCategoryId: "",
    categoryImage: updateCategory.imageUploadResponse || [],
    categoryStatus: "",
  };

  const onDeleteClick = (event, categoryId) => {
    event.preventDefault();
    dispatch(deleteCategory(categoryId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      categoryStatus: newStatus,
      categoryId: row.category.categoryId,
    };
    dispatch(updateCategoriesStatus(payload));
  };

  const childchangeStatus = (child, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      categoryStatus: newStatus,
      categoryId: child.categoryId,
    };
    dispatch(updateCategoriesStatus(payload));
  };

  const data =
    getCategory.data && getCategory.data.rows
      ? getCategory.data.rows.map((row) => ({
          categoryName: `${row.category.categoryName}`,
          image:
            row.category.categoryImage &&
            row.category.categoryImage.split(",").map((imageUrl, index) => (
              <div key={index} className="d-flex align-items-center">
                <img
                  src={process.env.REACT_APP_IMAGE_URL + imageUrl.trim()}
                  alt={`Category Image ${index + 1}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )),
          categoryStatus: (
            <Switch
              onChange={(checked) => changeStatus(row, checked)}
              checked={row.category.categoryStatus === "Active"}
              height={18}
              width={35}
              handleDiameter={15}
              id={row.category.categoryId}
            />
          ),
          action: (
            <div className="d-flex">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    updateCategoryStates({
                      formOpen: true,
                      isEdit: true,
                      singleCategory: row,
                    })
                  );
                }}
                className="p-2 fs-13 nav-link refresh-button"
              >
                <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
              </a>
              <a
                href="#"
                onClick={(event) =>
                  onDeleteClick(event, row.category && row.category.categoryId)
                }
                className="p-2 fs-13 nav-link refresh-button"
              >
                <i
                  className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
                  style={{ color: "var(--vz-danger)" }}
                ></i>
              </a>
            </div>
          ),
          children:
            row.children && row.children.length
              ? row.children.map((child) => ({
                  categoryName: `${child.categoryName}`,
                  image: child.categoryImage
                    .split(",")
                    .map((imageUrl, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <img
                          src={
                            process.env.REACT_APP_IMAGE_URL + imageUrl.trim()
                          }
                          alt={`Category Image ${index + 1}`}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )),
                  categoryStatus: (
                    <Switch
                      onChange={(checked) => childchangeStatus(child, checked)}
                      checked={child.categoryStatus === "Active"}
                      height={18}
                      width={35}
                      handleDiameter={15}
                      id={child.categoryId}
                    />
                  ),
                  action: (
                    <div className="d-flex">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(
                            updateCategoryStates({
                              formOpen: true,
                              isEdit: true,
                              singleCategory: row,
                            })
                          );
                        }}
                        className="p-2 fs-13 nav-link refresh-button"
                      >
                        <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
                      </a>
                      <a
                        href="#"
                        onClick={(event) =>
                          onDeleteClick(
                            event,
                            child.category && child.category.categoryId
                          )
                        }
                        className="p-2 fs-13 nav-link refresh-button"
                      >
                        <i
                          className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
                          style={{ color: "var(--vz-danger)" }}
                        ></i>
                      </a>
                    </div>
                  ),
                  isCurrent: (
                    <span
                      className={`btn btn-sm ${
                        child.isCurrent === 0
                          ? "btn-soft-primary"
                          : "btn-soft-danger"
                      } `}
                    >
                      {child.isCurrent === 0 ? "Yes" : "No"}
                    </span>
                  ),
                }))
              : [],
        }))
      : [];

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
              updateCategory.isEdit
                ? updateCategoryformFields
                : createCategoryformFields(categoryOption)
            }
            validationSchema={
              updateCategory.isEdit
                ? updateCategorySchema
                : createCategorySchema
            }
            submitButtonText={
              updateCategory.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updateCategory.isEdit ? updateCategories : createCategory,
            ]}
            onUpdateStateActions={[
              updateCategory.isEdit ? updateCategoryStates : updateState,
            ]}
            modalStates={[
              updateCategory.isEdit ? updateCategory : insertCategory,
            ]}
            modalTitle={`${
              updateCategory.isEdit ? "Update Category" : "Add New Category"
            }`}
            closeTitle=""
            initialValues={
              updateCategory.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>
      <div>
        <div className="">
          <div
            className="d-flex"
            style={{ justifyContent: "space-between", alignItems: "flex-end" }}
          ></div>
        </div>
        <div
          className="button-margin"
          style={{ textAlign: "right", marginBottom: "20px" }}
        >
          <Button
            className="btn btn-primary"
            color="primary"
            type="button"
            onClick={() => dispatch(updateState({ formOpen: true }))}
          >
            <i className="ri-add-line mr-1"></i>Add
          </Button>
        </div>

        <TreeTable data={data} />
        <TreeTablePagination
          fetchData={getCategory.data}
          totalRecords={
            getCategory.data && getCategory.data.count
              ? getCategory.data.count
              : 0
          }
          data={
            getCategory.data && getCategory.data.rows
              ? getCategory.data.rows
              : []
          }
        />
      </div>
    </React.Fragment>
  );
};

export default CategoryList;
