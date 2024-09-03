import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  updateState,
  updateBulkImportState,
} from "../../slices/product/reducer";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getProductRangeList } from "../../slices/thunks";
import { productRangeColumns } from "../../Components/Common/columnsConfig";

const ProductRange = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [minQuantity, setMinQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [selectedRows] = useState([]);

  const { filterParams, getProductRange } = useSelector(
    (state) => state.reports
  );

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getProductRangeList(filterParams));
  };

  const handleRangeSubmit = (e) => {
    e.preventDefault();
    const updatedFilterParams = {
      ...filterParams,
      minQuantity: parseInt(minQuantity),
      maxQuantity: parseInt(maxQuantity),
    };
    fetchData(updatedFilterParams);
  };

  const columns = productRangeColumns();

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
      <div className="table-container">
        <Row className="range-margin">
          <Col md={8}>
            <Form onSubmit={handleRangeSubmit}>
              <Row md={4}>
                <FormGroup>
                  <Label for="minQuantity">Min Quantity</Label>
                  <Input
                    type="number"
                    id="minQuantity"
                    placeholder="Enter min quantity"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="maxQuantity">Max Quantity</Label>
                  <Input
                    type="number"
                    id="maxQuantity"
                    placeholder="Enter max quantity"
                    value={maxQuantity}
                    onChange={(e) => setMaxQuantity(e.target.value)}
                    required
                  />
                </FormGroup>
              </Row>
              <Button type="submit" color="primary">
                Apply Range
              </Button>
            </Form>
          </Col>
        </Row>
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="category"
          searchEnable={true}
          filterParams={filterParams}
          data={getProductRange.data && getProductRange.data.rows}
          totalRows={(getProductRange.data && getProductRange.data.count) || 0}
          loading={fetchingData && getProductRange.length === 0}
          showAddButton={false}
          addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
          showimportCsvButton={false}
          importOnClickMethod={() =>
            dispatch(updateBulkImportState({ formOpen: true }))
          }
          showExportButton={true}
          exportFileName="ProductRange"
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default ProductRange;
