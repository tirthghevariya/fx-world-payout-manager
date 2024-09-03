import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { HiddenColumns, AccountHistory } from "./ReactTable";

const ReactTable = () => {
  document.title = "React Tables | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Hidden Columns</h5>
                </CardHeader>
                <CardBody>
                  <HiddenColumns />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">
                    Account History Tree Table
                  </h5>
                </CardHeader>
                <CardBody>
                  <AccountHistory />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ReactTable;
