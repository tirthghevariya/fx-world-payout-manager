import React from "react";
import { Container } from "reactstrap";

// import Components
import BreadCrumb from "../../Components/Common/BreadCrumb";

import TileBoxs from "./TileBoxs";

const Widgets = () => {
  document.title = "Widgets | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Widgets" pageTitle="Velzon" />
          <TileBoxs />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Widgets;
