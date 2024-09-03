import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";

import {
  createCouponSchema,
  updateCouponSchema,
} from "../../Components/validations";
import {
  createCouponformFields,
  updateCouponformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { couponColumns } from "../../Components/Common/columnsConfig";

import { updateCouponStates, updateState } from "../../slices/coupon/reducer";

import {
  getCouponList,
  createCoupon,
  editCoupon,
  updateCouponStatus,
  deleteCoupon,
  deleteBulkCoupon,
} from "../../slices/thunks";

const CouponList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, couponList, insertCoupon, updateCoupon } = useSelector(
    (state) => state.coupon
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getCouponList(filterParams));
  };
  const couponData = updateCoupon.singleCoupon;
  const updateInitialValues = {
    couponCode: (couponData && couponData.couponCode) || "",
    discountType: (couponData && couponData.discountType) || "",
    discountAmount: (couponData && couponData.discountAmount) || "",
    expiryDate: (couponData && couponData.expiryDate) || "",
    isActive: "true",
    usageCount: (couponData && couponData.usageCount) || "",
    description: (couponData && couponData.description) || "",
    couponId: (couponData && couponData.couponId) || "",
  };

  const addInitialValue = {
    couponCode: "",
    discountType: "",
    discountAmount: "",
    expiryDate: "",
    isActive: "true",
    usageCount: "",
    description: "",
  };

  const onDeleteClick = (event, couponId) => {
    event.preventDefault();
    dispatch(deleteCoupon(couponId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? true : false;
    const payload = {
      isActive: newStatus,
      couponId: row.couponId,
    };
    dispatch(updateCouponStatus(payload));
  };

  const columns = couponColumns({
    dispatch,
    updateCouponStates,
    onDeleteClick,
    changeStatus,
  });

  const handleBulkDelete = () => {
    const couponIds = selectedRows.map((row) => row.couponId);
    if (couponIds.length > 0) {
      const payload = {
        couponIds: couponIds,
      };
      dispatch(deleteBulkCoupon(payload));
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
              updateCoupon.isEdit
                ? updateCouponformFields
                : createCouponformFields
            }
            validationSchema={
              updateCoupon.isEdit ? updateCouponSchema : createCouponSchema
            }
            submitButtonText={
              updateCoupon.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[updateCoupon.isEdit ? editCoupon : createCoupon]}
            onUpdateStateActions={[
              updateCoupon.isEdit ? updateCouponStates : updateState,
            ]}
            modalStates={[updateCoupon.isEdit ? updateCoupon : insertCoupon]}
            modalTitle={`${
              updateCoupon.isEdit ? "Update Coupon" : "Add New Coupon"
            }`}
            closeTitle=""
            initialValues={
              updateCoupon.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="coupon"
          searchEnable={true}
          filterParams={filterParams}
          data={(couponList && couponList.data && couponList.data.rows) || []}
          totalRows={
            couponList && couponList.data && couponList.data.count
              ? couponList.data.count
              : 0
          }
          loading={fetchingData && couponList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="couponData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default CouponList;
