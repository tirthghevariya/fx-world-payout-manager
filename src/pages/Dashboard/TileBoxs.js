/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Label,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import CountUp from "react-countup";
import RegisterVsActive from "./Graphs/registerVsActive";
import Flatpickr from "react-flatpickr";
import { registerVsActiveUser } from "../../slices/thunks";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardCount } from "../../slices/thunks";
import Last15DaysOrderReport from "./Graphs/last15DaysOrderReport";
import TopPerformingReport from "./Graphs/topPerformingVendor";
const CountUpComponent = ({ end }) => {
  const [endValue, setEndValue] = useState(end);

  useEffect(() => {
    setEndValue(end);
  }, [end]);

  return <CountUp start={0} end={endValue} duration={3} />;
};

const Widget = ({ widget }) => {
  const widgetConfig = {
    id: widget.id,
    label: widget.label,
    badge: widget.badgeIcon,
    counter: widget.counter,
    separator: ",",
  };
  const memoizedCountUp = useMemo(
    () => <CountUpComponent end={widgetConfig.counter} />,
    [widgetConfig.counter]
  );

  return (
    <Col xl={3} md={6}>
      <Card>
        <CardBody style={{ height: "100px", overflow: "hidden" }}>
          <div className="d-flex align-items-center counter-widget">
            <div className="flex-grow-1">
              <p className="text-uppercase fw-semibold fs-14 text-muted mb-1">
                {widgetConfig.label}
              </p>
              <h2 className="mb-0 mr-2">{memoizedCountUp}</h2>
            </div>
            <div className="avatar-sm flex-shrink-0">
              <span className="avatar-title bg-light text-primary rounded-circle fs-3">
                <i className={"align-middle " + widgetConfig.badge}></i>
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const TileBoxs = () => {
  const dispatch = useDispatch();

  const moment = require("moment");

  const [, setSelectedDateRange] = useState([]);

  const startDate = moment().subtract(15, "days").format("DD-MM-YYYY");
  const endDate = moment().format("DD-MM-YYYY");
  const { updateDate } = useSelector((state) => state.user);
  const [fetchingData, setFetchingData] = useState(false);

  const { dashboardCount } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!fetchingData) {
      setFetchingData(true);
      fetchData();
    }
  }, [dispatch, dashboardCount]);

  function fetchData() {
    dispatch(getDashboardCount());
  }

  const filterDateChange = (selectedDates) => {
    setSelectedDateRange(selectedDates);

    const formattedDates = selectedDates.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );

    if (formattedDates.length > 1) {
      const updatedDate = {
        ...updateDate,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
      };
      dispatch(registerVsActiveUser(updatedDate));
    }
  };

  const [activeTab, setActiveTab] = useState("statistics");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const widgetData = [
    {
      id: 1,
      label: "Today Register User",
      badgeIcon: "las la-users",
      counter:
        (dashboardCount.data && dashboardCount.data.todayRegisterUser) || 0,
    },
    {
      id: 2,
      label: "Total Register User",
      badgeIcon: "bx bx-user-plus",
      counter:
        (dashboardCount.data && dashboardCount.data.totalRegisterUsers) || 0,
    },
    {
      id: 3,
      label: "Today Active Users",
      badgeIcon: "l ri-scales-fill",
      counter:
        (dashboardCount.data && dashboardCount.data.todayActiveUsersCount) || 0,
    },
    {
      id: 4,
      label: "LastWeek Active Users",
      badgeIcon: "bx bx-phone-off",
      counter:
        (dashboardCount.data && dashboardCount.data.lastWeekActiveUsersCount) ||
        0,
    },
    {
      id: 5,
      label: "LastMonth Active Users",
      badgeIcon: "ri-wallet-line",
      counter:
        (dashboardCount.data &&
          dashboardCount.data.lastMonthActiveUsersCount) ||
        0,
    },
    {
      id: 6,
      label: "Total Active Users",
      badgeIcon: "las la-wallet",
      counter:
        (dashboardCount.data && dashboardCount.data.totalActiveUsers) || 0,
    },
    {
      id: 7,
      label: "Total Products",
      badgeIcon: "ri-wallet-line",
      counter:
        (dashboardCount.data && dashboardCount.data.totalProductsCount) || 0,
    },
    {
      id: 8,
      label: "Total Categories",
      badgeIcon: "las la-wallet",
      counter:
        (dashboardCount.data && dashboardCount.data.totalCategoriesCount) || 0,
    },
    {
      id: 9,
      label: "Total Sub Category",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.totalSubCategoryCount) || 0,
    },
    {
      id: 9,
      label: "Today Order",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.todayOrderCount) || 0,
    },
    {
      id: 9,
      label: "Total Order",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.totalOrderCount) || 0,
    },
    {
      id: 9,
      label: "This Week Order",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.thisWeekOrderCount) || 0,
    },
    {
      id: 10,
      label: "Total Vendors",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.totalVendorsCount) || 0,
    },
    {
      id: 11,
      label: "Pending Vendor Approvals",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data &&
          dashboardCount.data.pendingVendorApprovalsCount) ||
        0,
    },
    {
      id: 12,
      label: "Total Wishlist",
      badgeIcon: "ri-wallet-3-line",
      counter:
        (dashboardCount.data && dashboardCount.data.totalWishlistCount) || 0,
    },
    {
      id: 12,
      label: "Total Revenue",
      badgeIcon: "ri-wallet-3-line",
      counter: (dashboardCount.data && dashboardCount.data.totalRevenue) || 0,
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col className="col-12">
          <h5 className="text-decoration-underline mb-3 pb-1">Tile Boxs</h5>
        </Col>
      </Row>

      <Nav
        tabs
        className="nav nav-tabs nav-border-top nav-border-top-primary mb-4"
      >
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "statistics" })}
            onClick={() => toggleTab("statistics")}
          >
            Statistics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "graph" })}
            onClick={() => toggleTab("graph")}
          >
            Graph
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="statistics">
          <Row>
            {" "}
            {widgetData && widgetData.length > 0 ? (
              widgetData.map((widget, key) => (
                <Widget key={key} widget={widget} />
              ))
            ) : (
              <p>No widget data available.</p>
            )}
          </Row>
        </TabPane>
        <TabPane tabId="graph">
          <div className="d-flex justify-content-between mt-4">
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
          <Row>
            <Col>
              <Row>
                <Col xs={6}>
                  <Card className="card-animate mt-4">
                    <CardBody>
                      <h5>Register Vs Active</h5>
                      {activeTab === "graph" ? <RegisterVsActive /> : <></>}
                    </CardBody>
                  </Card>
                </Col>
                <Col xs={6}>
                  <Card className="card-animate mt-4">
                    <CardBody>
                      <h5>Last 15 Days Order Reports</h5>
                      {activeTab === "graph" ? (
                        <Last15DaysOrderReport />
                      ) : (
                        <></>
                      )}
                    </CardBody>
                  </Card>
                </Col>

                <Col xs={6}>
                  <Card className="card-animate mt-1">
                    <CardBody>
                      <h5>Top Performing Report</h5>
                      {activeTab === "graph" ? <TopPerformingReport /> : <></>}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row></Row>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default TileBoxs;
