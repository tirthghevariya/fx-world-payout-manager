import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonDataTable from "../../common/DataTable";
import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  getTicketList,
  deleteTicket,
  deleteBulkTicket,
  updateTicketStatus,
  createTicket,
  editTicket,
} from "../../slices/thunks";
import classnames from "classnames";
import { ticketColumns } from "../../Components/Common/columnsConfig";
import FormModalBuilder from "../../Components/Common/CommonInputForm";
import { updateTicketStates, updateState } from "../../slices/ticket/reducer";
import {
  updateTicketSchema,
  createTicketSchema,
} from "../../Components/validations";
import {
  updateTicketformFields,
  updateButtonText,
  addButtonText,
} from "../../Components/Common/formFields";
import { createTicketformFields } from "../../Components/Common/formFields";
import { getUserList } from "../../slices/thunks";

const TicketList = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const { filterParams, ticketList, insertTicket, updateTicket } = useSelector(
    (state) => state.ticket
  );
  const { userList } = useSelector((state) => state.user);

  const ticketData = updateTicket.singleTicket;

  const updateInitialValues = {
    userId: (ticketData && ticketData.userId) || "",
    requestedBy: (ticketData && ticketData.requestedBy) || "",
    email: (ticketData && ticketData.email) || "",
    type: (ticketData && ticketData.type) || "",
    subject: (ticketData && ticketData.subject) || "",
    description: (ticketData && ticketData.description) || "",
    priority: (ticketData && ticketData.priority) || "",
    id: (ticketData && ticketData.id) || "",
  };

  const addInitialValue = {
    userId: "",
    requestedBy: "",
    email: "",
    type: "",
    subject: "",
    description: "",
    attachment: "",
    priority: "",
  };

  useEffect(() => {
    fetchData({
      ...filterParams,
      status: activeTab === "1" ? "open" : "closed",
    });
  }, [filterParams, activeTab]);

  const fetchData = (params) => {
    setFetchingData(true);
    dispatch(getTicketList(params)).finally(() => setFetchingData(false));
    dispatch(getUserList());
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onDeleteClick = (event, id) => {
    event.preventDefault();
    dispatch(deleteTicket(id));
  };

  const handleBulkDelete = () => {
    const ticketIds = selectedRows.map((row) => row.id);
    if (ticketIds.length > 0) {
      const payload = {
        ticketIds: ticketIds,
      };
      dispatch(deleteBulkTicket(payload));
      setSelectedRows([]);
    }
  };

  const userOption = [
    ...(userList.data && userList.data.rows
      ? userList.data.rows.map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.userId ? user.userId.toString() : "",
        }))
      : []),
  ];

  const changeStatus = (row, checked) => {
    const newStatus = checked ? "open" : "closed";
    const payload = {
      status: newStatus,
      id: row.id,
    };
    dispatch(updateTicketStatus(payload)).then(() => {
      fetchData({
        ...filterParams,
        status: activeTab === "1" ? "open" : "closed",
      });
    });
  };

  const columns = ticketColumns({
    onDeleteClick,
    dispatch,
    changeStatus,
    updateTicketStates,
  });

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    const updatedFilterParams = { ...filterParams, type: status };
    fetchData(updatedFilterParams);
  };

  const priorityOption = [
    { label: "Low", value: "low" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
  ];

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
              updateTicket.isEdit
                ? updateTicketformFields(userOption, priorityOption)
                : createTicketformFields(userOption, priorityOption)
            }
            validationSchema={
              updateTicket.isEdit ? updateTicketSchema : createTicketSchema
            }
            submitButtonText={
              updateTicket.isEdit ? updateButtonText : addButtonText
            }
            onSubmitActions={[updateTicket.isEdit ? editTicket : createTicket]}
            onUpdateStateActions={[
              updateTicket.isEdit ? updateTicketStates : updateState,
            ]}
            modalStates={[updateTicket.isEdit ? updateTicket : insertTicket]}
            modalTitle={`${
              updateTicket.isEdit ? "Update Ticket" : "Add New Ticket"
            }`}
            closeTitle=""
            initialValues={
              updateTicket.isEdit ? updateInitialValues : addInitialValue
            }
          />
        </Container>
      </div>

      <div className="table-container">
        <Col md={2} className="picker-margin">
          <FormGroup>
            <Label for="productStatus">Filter by Ticket Status:</Label>
            <Input
              type="select"
              name="productStatus"
              id="productStatus"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option value="Issue">Issue</option>
              <option value="product">Product</option>
            </Input>
          </FormGroup>
        </Col>
        <Nav tabs className="custom-tabs">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggleTab("1");
              }}
            >
              Open{" "}
              <span className="badge badges badge-success fs-11">
                {(ticketList.data && ticketList.data.open) || 0}
              </span>
            </NavLink>
          </NavItem>
          <NavItem className="mb-1">
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggleTab("2");
              }}
            >
              Closed
              <span className="badge badges badge-success fs-11 ">
                {" "}
                {(ticketList.data && ticketList.data.closed) || 0}
              </span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} className="mt-2">
          <TabPane tabId="1">
            <CommonDataTable
              columns={columns}
              fetchData={() => fetchData(filterParams)}
              from="transaction"
              searchEnable={true}
              filterParams={filterParams}
              data={ticketList.data && ticketList.data.rows}
              totalRows={(ticketList.data && ticketList.data.count) || 0}
              loading={fetchingData && ticketList.length === 0}
              showAddButton={true}
              addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
              showimportCsvButton={false}
              showExportButton={true}
              selectedRows={selectedRows}
              checkboxEnabled={true}
              bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
              exportFileName="TicketData"
              bulkDelete={handleBulkDelete}
            />
          </TabPane>
          <TabPane tabId="2">
            <CommonDataTable
              columns={columns}
              fetchData={() => fetchData(filterParams)}
              from="transaction"
              searchEnable={true}
              filterParams={filterParams}
              data={ticketList.data && ticketList.data.rows}
              totalRows={(ticketList.data && ticketList.data.count) || 0}
              loading={fetchingData && ticketList.length === 0}
              showAddButton={true}
              addOnClickMethod={() => dispatch(updateState({ formOpen: true }))}
              showimportCsvButton={false}
              showExportButton={true}
              selectedRows={selectedRows}
              checkboxEnabled={true}
              bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
              exportFileName="TicketData"
              bulkDelete={handleBulkDelete}
            />
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
};

export default TicketList;
