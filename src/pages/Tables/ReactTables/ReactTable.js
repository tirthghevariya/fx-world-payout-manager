/* eslint-disable react/prop-types */
import React from "react";
import CommonDataTable from "../../../common/DataTable";
import TreeTablePagination from "../../../common/TreeTablePagination";
import { Table, Col } from "reactstrap";

const TreeNode = ({ node }) => {
  return (
    <>
      <tr className="tree-node">
        <td>{node.bankCount}</td>
        <td>{node.fullName}</td>
        <td>{node.userId}</td>
      </tr>

      <tr className="tree-node">
        <td colSpan="4" className="tree-node-padding">
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Bank Name</th>
                <th>Account No</th>
                <th>IFSC Code</th>
                <th>Is Current</th>
              </tr>
            </thead>
            <tbody>
              {node.children.map((child) => (
                <tr key={child.id}>
                  <td></td>
                  <td>{child.name}</td>
                  <td>{child.bankName}</td>
                  <td>{child.ifsc}</td>
                  <td>{child.isCurrent}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </td>
      </tr>
    </>
  );
};

const TreeTable = ({ data }) => (
  <Table className="tree-table">
    <thead>
      <tr>
        <th></th>
        <th>Bank Count</th>
        <th>Full Name</th>
        <th>User Id</th>
      </tr>
    </thead>
    <tbody className="tree-node tree-node-padding">
      {data.length > 0 ? (
        data.map((node) => <TreeNode key={node.id} node={node} />)
      ) : (
        <tr>
          <td colSpan="3" className="text-center">
            There are no records to display
          </td>
        </tr>
      )}
    </tbody>
  </Table>
);

const AccountHistory = () => {
  const accountData = [
    {
      userFullName: "name",
      userId: "7769687",
      bankCount: 1,
      children: [
        {
          bankName: "Nemas",
          bankAccountNumber: "kkk",
          ifscCode: "vdbd",
          createdAt: "2024-02-06 13:38:43",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "Dharmik Oslaniya",
      userId: "6069136",
      bankCount: 1,
      children: [
        {
          bankName: "State Bank of India",
          bankAccountNumber: "98767899870",
          ifscCode: "SBIIN0007",
          createdAt: "2024-01-09 10:18:42",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "Neo Anderson",
      userId: "9049623",
      bankCount: 1,
      children: [
        {
          bankName: "HDFC",
          bankAccountNumber: "123456789012",
          ifscCode: "HDFC-10867",
          createdAt: "2024-01-15 14:15:33",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "paras",
      userId: "9961137",
      bankCount: 1,
      children: [
        {
          bankName: "paras",
          bankAccountNumber: "paras",
          ifscCode: "paras",
          createdAt: "2024-01-06 12:45:53",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "Paras Virani",
      userId: "3729855",
      bankCount: 1,
      children: [
        {
          bankName: "paras",
          bankAccountNumber: "paras",
          ifscCode: "paras",
          createdAt: "2024-01-09 10:03:53",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "Sage Hermit",
      userId: "5591502",
      bankCount: 1,
      children: [
        {
          bankName: "SBI",
          bankAccountNumber: "123456789012",
          ifscCode: "1086723451",
          createdAt: "2024-01-12 12:28:59",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "Omen Fred",
      userId: "6971105",
      bankCount: 1,
      children: [
        {
          bankName: "ICICI",
          bankAccountNumber: "345789123456",
          ifscCode: "ICICI-10867",
          createdAt: "2024-01-27 16:15:17",
          isCurrent: "0",
        },
      ],
    },
    {
      userFullName: "maxwell",
      userId: "3042272",
      bankCount: 1,
      children: [
        {
          bankName: "rbi",
          bankAccountNumber: "123412341234",
          ifscCode: "1234123412",
          createdAt: "2024-02-09 10:10:00",
          isCurrent: "0",
        },
      ],
    },
  ];

  const accountHistory = accountData;
  const data =
    accountHistory && accountHistory && accountHistory.length > 0
      ? accountHistory.map((row) => ({
          id: row.bankCount,
          bankCount: `${row.bankCount}`,
          fullName: `${row.userFullName}`,
          userId: `${row.userId}`,
          children: row.children.map((child) => ({
            id: row.id,
            name: `${child.bankAccountNumber}`,
            bankName: `${child.bankName}`,
            ifsc: `${child.ifscCode}`,
            isCurrent: (
              <span
                className={`btn btn-sm ${
                  child.isCurrent === 0 ? "btn-soft-primary" : "btn-soft-danger"
                } `}
              >
                {child.isCurrent === 0 ? "Yes" : "No"}
              </span>
            ),
          })),
        }))
      : [];

  return (
    <div>
      <div className="">
        <div
          className="d-flex"
          style={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <Col lg={4}></Col>
        </div>
      </div>
      <TreeTable data={data} />
      <TreeTablePagination
        fetchData={accountHistory}
        totalRecords={accountHistory}
        data={accountHistory}
      />
    </div>
  );
};

const HiddenColumns = () => {
  const sortingTable = {
    error: false,
    msg: "Here is the list of users",
    data: {
      rows: [
        {
          _id: "65f1389097a5854730b125f4",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c2ee8fbd7cab8277e49",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c2fe8fbd7cab8277e4b",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c30e8fbd7cab8277e4d",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c31e8fbd7cab8277e4f",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c31e8fbd7cab8277e51",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c32e8fbd7cab8277e53",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c32e8fbd7cab8277e55",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c33e8fbd7cab8277e57",
          name: "Stive",
          email: "stive@gmail.com",
        },
        {
          _id: "66028c33e8fbd7cab8277e59",
          name: "Stive",
          email: "stive@gmail.com",
        },
      ],
    },
  };

  const data = sortingTable;

  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Full Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13"> Email</span>,
      selector: (row) => row.email,
    },
    {
      name: <span className="font-weight-bold fs-13">Last Login</span>,
      selector: (row) => row.Id,
    },
    {
      name: <span className="font-weight-bold fs-13">Last Login</span>,
      cell: () => (
        <div className="d-flex">
          <a href="#" className="p-2 fs-13 nav-link refresh-button">
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a href="#" className="p-2 fs-13 nav-link refresh-button">
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <CommonDataTable
        columns={columns}
        fetchData={data}
        from="sortingTable"
        searchEnable={true}
        data={data.data.rows}
        totalRows={data.length || 0}
        loading={data && data.length === 0}
        showExportButton={true}
        exportFileName="advanceData"
      />
    </React.Fragment>
  );
};

export { HiddenColumns, AccountHistory };
