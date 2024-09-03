import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container, Label, Col } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getVendorCommission, editVendorCommission } from "../../slices/thunks";
import Flatpickr from "react-flatpickr";
import { vendorCommissionColumns } from "../../Components/Common/columnsConfig";
import {
  updateVendorCommissionformFields,
  updateButtonText,
} from "../../Components/Common/formFields";
import { updateVendorCommissionSchema } from "../../Components/validations";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import { updateVendorStates } from "../../slices/reports/reducer";

const VendorCommission = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const moment = require("moment");
  const [, setSelectedDateRange] = useState([]);
  const [selectedRows] = useState([]);

  const startDate = moment().subtract(15, "days").format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");

  const { filterParams, vendorCommission, updateVendorCommission } =
    useSelector((state) => state.reports);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getVendorCommission(filterParams));
  };

  const filterDateChange = (selectedDates) => {
    setSelectedDateRange(selectedDates);

    const formattedDates = selectedDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    if (formattedDates.length > 1) {
      const updatedDate = {
        ...filterParams,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
      };
      dispatch(getVendorCommission(updatedDate));
    }
  };

  const updateInitialValues = {
    vendorCommission:
      updateVendorCommission.singleVendorCommission &&
      updateVendorCommission.singleVendorCommission.commissionRate,
    vendorId:
      updateVendorCommission.singleVendorCommission &&
      updateVendorCommission.singleVendorCommission.vendorId,
  };

  const columns = vendorCommissionColumns({ dispatch, updateVendorStates });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
        </Container>
      </div>
      <div className="d-flex justify-content-between mb-3 picker-margin">
        <Col lg={4}>
          <Label for="ForminputState">Date Range</Label>
          <div className="col-sm-auto">
            <div className="input-group">
              <Flatpickr
                defaultValue={moment().format("DD/MM/YYYY")}
                placeholder="dd/mm/yyyy"
                className="form-control"
                style={{ width: "230px" }}
                options={{
                  mode: "range",
                  dateFormat: "d-m-Y",
                  defaultDate: [startDate, endDate],
                  onChange: filterDateChange,
                }}
              />
              <div className="input-group-text bg-primary border-primary text-white">
                <i className="ri-calendar-2-line"></i>
              </div>
            </div>
          </div>
        </Col>
      </div>
      <FormModalBuilder
        formFields={updateVendorCommissionformFields}
        validationSchema={updateVendorCommissionSchema}
        submitButtonText={updateButtonText}
        onSubmitActions={[editVendorCommission]}
        onUpdateStateActions={[updateVendorStates]}
        modalStates={[updateVendorCommission]}
        modalTitle={`${"Update Vendor Commission"}`}
        closeTitle=""
        initialValues={updateInitialValues}
      />
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={vendorCommission.data && vendorCommission.data.rows}
          totalRows={
            (vendorCommission.data && vendorCommission.data.count) || 0
          }
          loading={fetchingData && vendorCommission.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="VendorCommission"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default VendorCommission;
