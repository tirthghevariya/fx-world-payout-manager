import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import {
  getProductList,
  deleteProduct,
  createProduct,
  updateProducts,
  updateProductStatus,
  bulkDeleteProduct,
} from "../../slices/thunks";
import { getCategoryList } from "../../slices/thunks";
import {
  updateState,
  updateProductStates,
  updateBulkImportState,
} from "../../slices/product/reducer";
import {
  updateProductSchema,
  createProductSchema,
} from "../../Components/validations";
import {
  createProductformFields,
  updateProductformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import BulkImport from "./bulkImportForm";
import { productColumns } from "../../Components/Common/columnsConfig";
import { getBrandsList } from "../../slices/thunks";

const ProductList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { updateCategory } = useSelector((state) => state.category);
  const { getBrands } = useSelector((state) => state.brand);
  const { filterParams, getProduct, insertProduct, updateProduct, bulkImport } =
    useSelector((state) => state.product);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getProductList(filterParams));
    dispatch(getCategoryList());
    dispatch(getBrandsList());
  };

  const { getCategory } = useSelector((state) => state.category);
  const updateProData = updateProduct.singleProduct;

  const updateInitialValues = {
    productName: String((updateProData && updateProData.productName) || ""),
    description: String((updateProData && updateProData.description) || ""),
    price: String((updateProData && updateProData.price) || ""),
    quantity: String((updateProData && updateProData.quantity) || ""),
    categoryId: String((updateProData && updateProData.categoryId) || ""),
    brandId: String((updateProData && updateProData.brandId) || ""),
    SKU: String((updateProData && updateProData.SKU) || ""),
    productStatus: String((updateProData && updateProData.productStatus) || ""),
    weight: String((updateProData && updateProData.weight) || ""),
    length: String((updateProData && updateProData.length) || ""),
    width: String((updateProData && updateProData.width) || ""),
    height: String((updateProData && updateProData.height) || ""),
    optionalNotes: String((updateProData && updateProData.optionalNotes) || ""),
    productImage:
      (updateProData && updateCategory.imageUploadResponse) ||
      (updateProData && updateProData.productImage),
    productId: String((updateProData && updateProData.productId) || ""),
  };

  const addInitialValue = {
    productName: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    SKU: "",
    productStatus: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    optionalNotes: "",
    productImage: updateCategory.imageUploadResponse || [],
  };

  const onDeleteClick = (event, productId) => {
    event.preventDefault();
    dispatch(deleteProduct(productId));
  };

  const categoriesOption = [
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

  const brandsOption = [
    ...(getBrands.data && getBrands.data.rows
      ? getBrands.data.rows.map((brand) => ({
          label: brand.brandName,
          value: brand.brandId ? brand.brandId.toString() : "",
        }))
      : []),
  ];

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      productStatus: newStatus,
      productId: row.productId,
    };
    dispatch(updateProductStatus(payload));
  };

  const columns = productColumns({
    onDeleteClick,
    dispatch,
    changeStatus,
    updateProductStates,
  });

  const handleBulkDelete = () => {
    const productIds = selectedRows.map((row) => row.productId);
    if (productIds.length > 0) {
      const payload = {
        productIds: productIds,
      };
      dispatch(bulkDeleteProduct(payload));
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
              updateProduct.isEdit
                ? updateProductformFields(categoriesOption, brandsOption)
                : createProductformFields(categoriesOption, brandsOption)
            }
            validationSchema={
              updateProduct.isEdit ? createProductSchema : updateProductSchema
            }
            submitButtonText={
              updateProduct.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updateProduct.isEdit ? updateProducts : createProduct,
            ]}
            onUpdateStateActions={[
              updateProduct.isEdit ? updateProductStates : updateState,
            ]}
            modalStates={[updateProduct.isEdit ? updateProduct : insertProduct]}
            modalTitle={`${
              updateProduct.isEdit ? "Update Product" : "Add New Product"
            }`}
            closeTitle=""
            initialValues={
              updateProduct.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>
      <BulkImport popupData={bulkImport} />
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={
            getProduct.data && getProduct.data.rows ? getProduct.data.rows : []
          }
          totalRows={
            getProduct.data && getProduct.data.count ? getProduct.data.count : 0
          }
          loading={fetchingData && getProduct.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={true}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showBulkImportButton={true}
          bulkImport={() => dispatch(updateBulkImportState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="CategoryData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductList;
