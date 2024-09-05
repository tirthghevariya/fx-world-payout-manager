import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import CommonDataTable from "../../common/DataTable";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import AddForm from "./addForm";
import { useNavigate } from "react-router-dom";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const Users = () => {
  const [fetchingData, setFetchingData] = useState(false);
  const [formEntries, setFormEntries] = useState([]);
  const [selectedRows,] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());


  const navigate = useNavigate();

  useEffect(() => {
    const superAdminUser = JSON.parse(localStorage.getItem("superAdminUser"));
    if (superAdminUser && superAdminUser.clientId) {
      fetchFormEntries();
    } else {
      navigate("/forms-elements");
    }
  }, [navigate]);

  const fetchFormEntries = async () => {
    setFetchingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "formEntries"));
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
      selector: () => "5%",
    },
    {
      name: <span className="font-weight-bold fs-13">Total</span>,
      selector: (row) => {
        const myWallet = parseFloat(row.myWallet) || 0.0;
        const trade = parseFloat(row.trade) || 0.0;
        const total = myWallet + trade;
        const calculatedValue = (total * 0.05).toFixed(2);
        return `$${calculatedValue}`;
      },
    },
    {
      name: <span className="font-weight-bold fs-13">Column 10</span>,
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
      name: <span className="font-weight-bold fs-13">Status</span>,
      cell: (row) => (
        <StatusDropdown
          value={row.status}
          onChange={(e) => handleStatusChange(e, row.id)}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">INR</span>,
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
      name: <span className="font-weight-bold fs-13">Notes</span>,
      selector: (row) => row.notes,
    },
    {
      name: <span className="font-weight-bold fs-13">Request</span>,
      selector: (row) => row.request,
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
          columns={columns}
          data={formEntries}
          totalRows={formEntries.length}
          loading={fetchingData}
          showAddButton={true}
          checkboxEnabled={false}
          bulkSelected={() => { }}
          bulkDelete={() => { }}
          selectedRows={selectedRows}
          showExportButton={true}
          exportFileName="userData"
          searchEnable={true}
          form={<AddForm />}
        />
      </div>
    </React.Fragment>
  );
};

export default Users;
