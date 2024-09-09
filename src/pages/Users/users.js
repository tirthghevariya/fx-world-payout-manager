import React, { useState, useEffect } from "react";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import AddForm from "./addForm";
import { useNavigate } from "react-router-dom";
import 'flatpickr/dist/flatpickr.min.css';
import { useDispatch, useSelector } from "react-redux";
import { updateState } from "../../slices/users/reducer";

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filterParams, insersUser } = useSelector((state) => state.user);

  useEffect(() => {
    const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
    console.log("superAdminUser", superAdminUser?.adminName)

    if (superAdminUser && superAdminUser.clientId) {
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
        .filter((entry) => entry.adminName === superAdminUser?.adminName); 

      setFormEntries(entries);
      setFilteredEntries(entries);
    } catch (error) {
      console.error("Error fetching form entries:", error.message);
    } finally {
      setFetchingData(false);
    }
  };


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

  const openDeleteModal = (id) => {
    setSelectedEntryId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedEntryId(null);
  };

  const handleStatusChange = async (event, id,row) => {
    const newStatus = event.target.value;
    if (newStatus === "super_admin") {
      // Open AddForm when 'super_admin' is selected
      dispatch(updateState({ formOpen: true, isSuperForm: true, userData: row }));
    } else {
      // Update userType in Firebase when any other option is selected
      try {
        const userDocRef = doc(db, "users", id);
        await updateDoc(userDocRef, { userType: newStatus });
        fetchData();  // Refresh the data after update
      } catch (error) {
        console.error("Error updating userType:", error.message);
      }
    }
  };


  const handleDeleteEntry = async () => {
    if (selectedEntryId) {
      try {
        await deleteDoc(doc(db, "users", selectedEntryId));
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
          value={row.userType}
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Form Entries" pageTitle="Entries" />
        </Container>
      </div>
      
      <div className="table-container">
        <CommonDataTable
          isShowTotal={false}
          columns={columns}
          data={filteredEntries}
          totalRows={filteredEntries.length}
          loading={fetchingData}
          showAddButton={true}
          checkboxEnabled={false}
          filterParams={filterParams}
          showExportButton={true}
          exportFileName="userData"
          searchEnable={true}
          updateStates={() => dispatch(updateState({ formOpen: true }))}
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
