import React, { useState, useEffect } from "react";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import 'flatpickr/dist/flatpickr.min.css';
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../slices/users/reducer";
import Select from "react-select";

const DeleteModal = ({ isOpen, toggle, onDelete }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete Entry</ModalHeader>
    <ModalBody>Are you sure you want to delete this entry?</ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Cancel</Button>
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </ModalFooter>
  </Modal>
);

const StatusDropdown = ({ value, onChange }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case 'success':
        return '#A1E2A0';
      case 'not-eligible':
        return '#FFF48E';
      case 'reinvest':
        return '#FCBDF8';
      case 'pending':
        return '#FF917D';
      default:
        return '#f9f9f9';
    }
  };
  return (
    <select
      value={value}
      onChange={onChange}
      className="status-dropdown"
      style={{ backgroundColor: getBackgroundColor(value) }}
    >
      <option value="success" style={{ backgroundColor: getBackgroundColor('success') }}>Success</option>
      <option value="not-eligible" style={{ backgroundColor: getBackgroundColor('not-eligible') }}>Not Eligible</option>
      <option value="reinvest" style={{ backgroundColor: getBackgroundColor('reinvest') }}>Re Invest</option>
      <option value="pending" style={{ backgroundColor: getBackgroundColor('pending') }}>Pending</option>
    </select>
  );
};

const Entries = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const [formEntries, setFormEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedUser, setSelectedUser] = useState({ value: "all", label: "All" });
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filterParams, insersUser } = useSelector((state) => state.user);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      const q = query(collection(db, "users"), where("userType", "==", "super_admin"));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUserData(entries);
      setFetchingData(false);

    } catch (error) {
      console.error("Error fetching form entries:", error.message);
      setFetchingData(false);
    }
  };

  const userOptions = [
    { value: "all", label: "All" },
    ...(Array.isArray(userData) ? userData.map((user) => ({
      value: user.adminName,
      label: user.username,
    })) : []),
  ];

  useEffect(() => {
    fetchData();
    if (superAdminUser && superAdminUser.clientId) {
      fetchFormEntries();
    } else {
      navigate("/payout-form");
    }
  }, [navigate]);

  useEffect(() => {
    fetchFormEntries();
  }, [selectedUser]);

  const fetchFormEntries = async () => {
    setFetchingData(true);
    try {
      const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
      if (!superAdminUser || !superAdminUser.adminName) {
        console.error("No super admin user found or adminName is missing.");
        return;
      }

      const querySnapshot = await getDocs(collection(db, "formEntries"));
      const entries = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filtered = superAdminUser.userType === "main_admin"
        ? (selectedUser?.value === "all" ? entries : entries.filter(entry => entry.adminName === selectedUser?.value))
        : entries.filter(entry => entry.adminName === superAdminUser.adminName);

      setFormEntries(filtered);
      setFilteredEntries(filtered);
    } catch (error) {
      console.error("Error fetching form entries:", error.message);
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedUser(selectedOption); // Update state with selected option
  };

  useEffect(() => {
    if (insersUser && insersUser.search) {
      const searchValue = insersUser.search.toLowerCase();
      const filtered = formEntries.filter((entry) =>
        entry.clientId.toLowerCase().includes(searchValue) ||
        entry.clientName.toLowerCase().includes(searchValue) ||
        entry.currentMonth.toLowerCase().includes(searchValue)
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(formEntries);
    }
  }, [insersUser, formEntries]);

  const openDeleteModal = (id) => {
    setSelectedEntryId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedEntryId(null);
  };

  const handleDeleteEntry = async () => {

    if (selectedEntryId) {
      try {
        await deleteDoc(doc(db, "formEntries", selectedEntryId));
        fetchFormEntries();
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting entry:", error.message);
      }
    }
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;
    try {
      await updateDoc(doc(db, 'formEntries', id), { status: newStatus });
      fetchFormEntries();
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };


  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Client ID</span>,
      selector: (row) => row.clientId,
    },
    {
      name: <span className="font-weight-bold fs-13">Client Name</span>,
      selector: (row) => row.clientName,
      width: "20%"
    },
    {
      name: <span className="font-weight-bold fs-13">My Wallet</span>,
      selector: (row) => {
        const myWallet = parseFloat(row.myWallet) || 0.0;
        return `$${myWallet.toFixed(2)}`;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Trade</span>,
      selector: (row) => {
        const trade = parseFloat(row.trade) || 0.0;
        return `$${trade.toFixed(2)}`;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">5% Charge</span>,
      selector: (row) => {
        const myWallet = parseFloat(row.myWallet) || 0.0;
        const trade = parseFloat(row.trade) || 0.0;
        const total = myWallet + trade;
        const calculatedValue = (total * 0.05).toFixed(2);
        return `$${calculatedValue}`;
      },
    },

    {
      name: <span className="font-weight-bold fs-13">Income In $</span>,
      selector: (row) => {
        const myWallet = parseFloat(row.myWallet) || 0.0;
        const trade = parseFloat(row.trade) || 0.0;
        const total = myWallet + trade;
        const calculatedValue = (total * 0.05).toFixed(2);
        const column10Value = (total - parseFloat(calculatedValue)).toFixed(2);
        return `$${column10Value}`;
      },
    },

    {
      name: <span className="font-weight-bold fs-13">Income In ₹</span>,
      selector: (row) => {
        const myWallet = parseFloat(row.myWallet) || 0.0;
        const trade = parseFloat(row.trade) || 0.0;
        const total = myWallet + trade;
        const calculatedValue = (total * 0.05).toFixed(2);
        const inrValue = (total - parseFloat(calculatedValue)) * 85;
        return `₹${inrValue.toFixed(2)}`;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      cell: (row) => (
        <StatusDropdown
          value={row.status}
          onChange={(e) => handleStatusChange(e, row.id)}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Actions</span>,
      cell: (row) => (
        <a
          href="#"
          onClick={(event) => openDeleteModal(row.id)}
          className="p-2 fs-13 nav-link refresh-button"
        >
          <i
            className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
            style={{ color: "var(--vz-danger)" }}
          ></i>
        </a>
      ),
    },
  ];

  const generateJSONData = (entries) => {
    return entries.map((entry) => ({
      id: entry.id,
      clientId: entry.clientId,
      clientName: entry.clientName,
      myWallet: parseFloat(entry.myWallet) || 0.0,
      trade: parseFloat(entry.trade) || 0.0,
      charge: ((parseFloat(entry.myWallet) || 0.0) + (parseFloat(entry.trade) || 0.0)) * 0.05,
      incomeInDollar: ((parseFloat(entry.myWallet) || 0.0) + (parseFloat(entry.trade) || 0.0)) - (((parseFloat(entry.myWallet) || 0.0) + (parseFloat(entry.trade) || 0.0)) * 0.05),
      incomeInInr: (((parseFloat(entry.myWallet) || 0.0) + (parseFloat(entry.trade) || 0.0)) - (((parseFloat(entry.myWallet) || 0.0) + (parseFloat(entry.trade) || 0.0)) * 0.05)) * 85,
      status: entry.status
    }));
  };

  const jsonData = generateJSONData(formEntries);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Form Entries" pageTitle="Entries" />
        </Container>
      </div>
      {superAdminUser.userType === "main_admin" ? <div>
        <Label style={{ textAlign: "left", display: "block", marginLeft: "10px" }}
        >Select Admin</Label>
        <Select
          className="dd-style"
          options={userOptions}
          onChange={handleChange}
          value={selectedUser}
          placeholder="Select an Admin"
        />
      </div> : ""}

      <div className="table-container">
        <CommonDataTable
          isShowTotal={true}
          columns={columns}
          data={filteredEntries}
          exportData={jsonData}
          totalRows={filteredEntries.length}
          loading={fetchingData}
          showAddButton={false}
          checkboxEnabled={false}
          filterParams={filterParams}
          moduleName="Entries"
          showExportButton={true}
          exportFileName="payoutEntries"
          searchEnable={true}
          updateStates={() => dispatch(updateState({ formOpen: true }))}
          fetchData={fetchFormEntries}
        />
      </div>
      <DeleteModal
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        onDelete={handleDeleteEntry}
      />
    </React.Fragment>
  );
};

export default Entries;
