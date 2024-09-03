import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import { Container, Label, Col } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getProductDateList } from "../../slices/thunks";
import Flatpickr from "react-flatpickr";
import { productDateColumns } from "../../Components/Common/columnsConfig";
const ProductDate = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const moment = require("moment");
  const [, setSelectedDateRange] = useState([]);
  const [selectedRows] = useState([]);

  const startDate = moment().subtract(15, "days").format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");
  const { filterParams, getProductDate } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getProductDateList(filterParams));
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
      dispatch(getProductDateList(updatedDate));
    }
  };

  const columns = productDateColumns();
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
      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getProductDate.data && getProductDate.data.rows}
          totalRows={(getProductDate.data && getProductDate.data.count) || 0}
          loading={fetchingData && getProductDate.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="ProductDate"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductDate;
