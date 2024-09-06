import React, { useState, useEffect } from "react";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import AddForm from "./addForm";
import { useNavigate } from "react-router-dom";
import 'flatpickr/dist/flatpickr.min.css';
import { useDispatch,useSelector } from "react-redux";
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
    if (superAdminUser && superAdminUser.clientId) {
      fetchData();
    } else {
      navigate("/payout-form");
    }
  }, [navigate]);

  const {  filterParams } =
    useSelector((state) => state.user);

  const fetchData = async () => {
    setFetchingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const entries = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setFormEntries(entries);
    } catch (error) {
      console.error("Error fetching form entries:", error.message);
    } finally {
      setFetchingData(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedEntryId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedEntryId(null);
  };


  const StatusDropdown = ({ value, onChange }) => {
    return (<select
      value={value}
      onChange={onChange}
      className="status-dropdown"
    >
      <option value="admin">Admin</option>
      <option value="super_admin">Super Admin</option>
    </select>)
  };

  const handleStatusChange = async (event, id) => {
    const newStatus = event.target.value;
    try {
      newStatus === "super_admin" ? dispatch(updateState({ formOpen: true, isSuperForm: true }))
        : dispatch(updateState({ formOpen: true, isSuperForm: false }))    

        // await updateDoc(doc(db, 'users', id), { userType: newStatus });
      // fetchData(); 
    } catch (error) {
      console.error('Error updating userType:', error.message);
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
      width:"20%"
    },
    {
      name: <span className="font-weight-bold fs-13">Type</span>,
      cell: (row) => (
        <StatusDropdown
          value={row.userType}
          onChange={(e) => handleStatusChange(e, row.id)}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Actions</span>,
      cell: (row) => (
        <button
          className="btn btn-danger delete-button"
          onClick={() => openDeleteModal(row.id)}
        >
          Delete
        </button>
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
          data={formEntries}
          totalRows={formEntries.length}
          loading={fetchingData}
          showAddButton={true}
          checkboxEnabled={false}
          filterParams={filterParams}
          showExportButton={true}
          exportFileName="userData"
          searchEnable={true}
          updateStates={() => dispatch(updateState({ formOpen: true }))}
            fetchData={fetchData} 

          form={<AddForm />}
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
