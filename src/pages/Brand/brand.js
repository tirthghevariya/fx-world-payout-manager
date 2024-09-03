import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";
import { createBrandSchema } from "../../Components/validations";
import {
  createBrandformFields,
  updateBrandformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { brandColumns } from "../../Components/Common/columnsConfig";
import { updateBrandStates, updateState } from "../../slices/brand/reducer";
import {
  createBrand,
  editBrand,
  getBrandsList,
  deleteBrand,
  bulkDeleteBrand,
  updateBrandStatus,
} from "../../slices/thunks";

const BrandList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { updateCategory } = useSelector((state) => state.category);

  const { filterParams, insertBrand, updateBrand, getBrands } = useSelector(
    (state) => state.brand
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getBrandsList(filterParams));
  };

  const updateBrandData = updateBrand.singleBrand;

  const updateInitialValues = {
    brandName: String((updateBrandData && updateBrandData.brandName) || ""),
    description: String((updateBrandData && updateBrandData.description) || ""),
    logoUrl: Array.isArray(updateCategory.imageUploadResponse)
      ? updateCategory.imageUploadResponse.join(",")
      : (updateBrandData && updateCategory.imageUploadResponse) || "",
    brandId: String((updateBrandData && updateBrandData.brandId) || ""),
  };

  const addInitialValue = {
    brandName: "",
    description: "",
    logoUrl: Array.isArray(updateCategory.imageUploadResponse)
      ? updateCategory.imageUploadResponse.join(",")
      : updateCategory.imageUploadResponse || "",
  };

  const onDeleteClick = (event, brandId) => {
    event.preventDefault();
    dispatch(deleteBrand(brandId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "Active" : "InActive";
    const payload = {
      status: newStatus,
      brandId: row.brandId,
    };
    dispatch(updateBrandStatus(payload));
  };

  const columns = brandColumns({
    onDeleteClick,
    dispatch,
    changeStatus,
    updateBrandStates,
  });

  const handleBulkDelete = () => {
    const brandIds = selectedRows.map((row) => row.brandId);
    if (brandIds.length > 0) {
      const payload = {
        brandIds: brandIds,
      };
      dispatch(bulkDeleteBrand(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Brand"} pageTitle="brand" />
          <FormModalBuilder
            formFields={
              updateBrand.isEdit ? updateBrandformFields : createBrandformFields
            }
            validationSchema={
              updateBrand.isEdit ? createBrandSchema : createBrandSchema
            }
            submitButtonText={
              updateBrand.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[updateBrand.isEdit ? editBrand : createBrand]}
            onUpdateStateActions={[
              updateBrand.isEdit ? updateBrandStates : updateState,
            ]}
            modalStates={[updateBrand.isEdit ? updateBrand : insertBrand]}
            modalTitle={`${
              updateBrand.isEdit ? "Update brand" : "Add New brand"
            }`}
            closeTitle=""
            initialValues={
              updateBrand.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="brand"
          searchEnable={true}
          filterParams={filterParams}
          data={
            getBrands.data && getBrands.data.rows ? getBrands.data.rows : []
          }
          totalRows={
            getBrands.data && getBrands.data.count ? getBrands.data.count : 0
          }
          loading={fetchingData && getBrands.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="BrandData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default BrandList;
