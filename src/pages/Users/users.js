import React, { useState, useEffect } from "react";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import AddForm from "./addForm";
import { useNavigate } from "react-router-dom";
import 'flatpickr/dist/flatpickr.min.css';
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../slices/users/reducer";
import { showToast } from "../../slices/toast/reducer";
import Select from "react-select";

const DeleteModal = ({ isOpen, toggle, onDelete }) => (
  <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Delete User</ModalHeader>
    <ModalBody>Are you sure you want to delete this User?</ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Cancel</Button>
      <Button color="danger" onClick={onDelete}>Delete</Button>
    </ModalFooter>
  </Modal>
);

const Users = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const [formEntries, setFormEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [selectedUser, setSelectedUser] = useState({ value: "all", label: "All" });
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterParams, insersUser } = useSelector((state) => state.user);
  const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));

  useEffect(() => {

    if (superAdminUser && superAdminUser?.clientId) {
      fetchData();
    } else {
      navigate("/payout-form");
    }
  }, [navigate]);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
      const querySnapshot = await getDocs(collection(db, "users"));
      const entries = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))

      const q = query(collection(db, "users"), where("userType", "==", "super_admin"));
      const userData = await getDocs(q);
      const userEntries = userData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filtered = superAdminUser?.userType === "main_admin"
        ? (selectedUser?.value === "all" ? entries : entries.filter(entry => entry.adminName === selectedUser?.value))
        : entries.filter(entry => entry.adminName === superAdminUser?.adminName);
      setUserData(userEntries);
      setFormEntries(filtered);
      setFilteredEntries(filtered);
    } catch (error) {
      console.error("Error fetching form entries:", error.message);
    } finally {
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
  }, [selectedUser]);


  useEffect(() => {
    if (insersUser.search) {
      const filtered = formEntries.filter((entry) =>
        entry.username.toLowerCase().includes(insersUser.search.toLowerCase()) ||
        entry.clientId.toLowerCase().includes(insersUser.search.toLowerCase())
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(formEntries);
    }
  }, [insersUser.search, formEntries]);

  const openDeleteModal = (row) => {
    setSelectedEntryId(row);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedEntryId(null);
  };

  const handleChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };

  const handleStatusChange = async (event, id, row) => {
    const newStatus = event.target.value;
    if (newStatus === "super_admin") {
      dispatch(updateState({ formOpen: true, isSuperForm: true, userData: row }));
    } else {
      try {
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, { userType: newStatus });
        fetchData();
      } catch (error) {
        console.error("Error updating userType:", error.message);
      }
    }
  };

  const handleDeleteEntry = async () => {
    if (selectedEntryId) {
      if (selectedEntryId?.userType === 'super_admin') {
        console.log('This user cannot be deleted.');
        closeDeleteModal();
        dispatch(
          showToast({
            type: "error",
            msg: "Super admin cannot be delete",
          })
        );
        return;
      }
      try {
        await deleteDoc(doc(db, "users", selectedEntryId?.id));
        fetchData();
        closeDeleteModal();
      } catch (error) {
        console.error("Error deleting entry:", error.message);
      }
    }
  };

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Client ID</span>,
      selector: (row) => row.clientId,
    },
    {
      name: <span className="font-weight-bold fs-13">Client Name</span>,
      selector: (row) => row.username,
    },
    {
      name: <span className="font-weight-bold fs-13">Type</span>,
      cell: (row) => (
        <select
          value={row?.userType}
          onChange={(e) => handleStatusChange(e, row.id, row)}
          className="status-dropdown"
        >
          <option value="admin">Admin</option>
          <option value="super_admin">Super Admin</option>
        </select>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Actions</span>,
      cell: (row) => (
        <a
          href="#"
          onClick={(event) => openDeleteModal(row)}
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Form Entries" pageTitle="Entries" />
        </Container>
      </div>
      {superAdminUser?.userType === "main_admin" ? <div> <Label style={{ textAlign: "left", display: "block", marginLeft: "10px" }}
      >Select Admin</Label>
        <Select
          className="dd-style"
          options={userOptions}
          onChange={handleChange}
          value={selectedUser}
          placeholder="Select an Admin"
        /></div> : ""}

      <div className="table-container">
        <CommonDataTable
          isShowTotal={false}
          columns={columns}
          data={filteredEntries}
          exportData={filteredEntries}
          totalRows={filteredEntries.length}
          loading={fetchingData}
          showAddButton={true}
          checkboxEnabled={false}
          filterParams={filterParams}
          showExportButton={true}
          moduleName="User"
          exportFileName="usersData"
          searchEnable={true}
          updateStates={() => dispatch(updateState({ formOpen: true }))}
          fetchData={fetchData}
          form={<AddForm fetchData={fetchData} />}
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

export default Users;
