import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import CommonDataTable from "../../common/DataTable";

import {
  createHeroSliderSchema,
  updateHeroSliderSchema,
} from "../../Components/validations";
import {
  createHeroSliderformFields,
  updateHeroSliderformFields,
  addButtonText,
  updateButtonText,
} from "../../Components/Common/formFields";
import { heroSliderColumns } from "../../Components/Common/columnsConfig";

import {
  getHeroSliderList,
  createHeroSlider,
  editHeroBanner,
  deleteHeroSlider,
  deletebulkHeroSlider,
} from "../../slices/heroSlider/thunk";
import {
  updateHeroSliderStates,
  updateState,
} from "../../slices/heroSlider/reducer";

const HeroSliderList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, sliderList, insertHeroSlider, updateHeroSlider } =
    useSelector((state) => state.heroSlider);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getHeroSliderList(filterParams));
  };
  const heroSliderData = updateHeroSlider.singleHeroSlider;

  const updateInitialValues = {
    imageUrl: (heroSliderData && heroSliderData.imageUrl) || [],
    bannerTitle: (heroSliderData && heroSliderData.bannerTitle) || "",
    bannerDescription:
      (heroSliderData && heroSliderData.bannerDescription) || "",
    bannerButtonText: (heroSliderData && heroSliderData.bannerButtonText) || "",
    isActive: "true",
    bannerButtonLink: (heroSliderData && heroSliderData.bannerButtonLink) || "",
    order: (heroSliderData && heroSliderData.order) || "",
    heroSliderId: (heroSliderData && heroSliderData.heroSliderId) || "",
  };
  const addInitialValue = {
    imageUrl: updateHeroSlider.imageUploadResponse || [],
    bannerTitle: "",
    bannerDescription: "",
    bannerButtonText: "",
    bannerButtonLink: "",
    order: "",
    isActive: true,
  };

  const onDeleteClick = (event, heroSliderId) => {
    event.preventDefault();
    dispatch(deleteHeroSlider(heroSliderId));
  };

  const changeStatus = (row, checked) => {
    const newStatus = checked ? true : false;
    const payload = {
      isActive: newStatus,
      heroSliderId: row.heroSliderId,
    };
    dispatch(editHeroBanner(payload));
  };

  const columns = heroSliderColumns({
    dispatch,
    updateHeroSliderStates,
    onDeleteClick,
    changeStatus,
  });

  const handleBulkDelete = () => {
    const heroSliderIds = selectedRows.map((row) => row.heroSliderId);
    if (heroSliderIds.length > 0) {
      const payload = {
        heroSliderIds: heroSliderIds,
      };
      dispatch(deletebulkHeroSlider(payload));
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
              updateHeroSlider.isEdit
                ? updateHeroSliderformFields
                : createHeroSliderformFields
            }
            validationSchema={
              updateHeroSlider.isEdit
                ? updateHeroSliderSchema
                : createHeroSliderSchema
            }
            submitButtonText={
              updateHeroSlider.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[
              updateHeroSlider.isEdit ? editHeroBanner : createHeroSlider,
            ]}
            onUpdateStateActions={[
              updateHeroSlider.isEdit ? updateHeroSliderStates : updateState,
            ]}
            modalStates={[
              updateHeroSlider.isEdit ? updateHeroSlider : insertHeroSlider,
            ]}
            modalTitle={`${
              updateHeroSlider.isEdit ? "Update Banner" : "Add New Banner"
            }`}
            closeTitle=""
            initialValues={
              updateHeroSlider.isEdit ? updateInitialValues : addInitialValue
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
          data={(sliderList && sliderList.data && sliderList.data.rows) || []}
          totalRows={
            sliderList && sliderList.data && sliderList.data.count
              ? sliderList.data.count
              : 0
          }
          loading={fetchingData && sliderList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showExportButton={true}
          exportFileName="heroSliderData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default HeroSliderList;
