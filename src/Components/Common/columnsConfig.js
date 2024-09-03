import React, { useState } from "react";
import Switch from "react-switch";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line react/prop-types
const ConfirmPopup = ({ message, setConfirmOpen, onConfirm }) => {
  return (
    <>
      <div
        className="position-fixed translate-middle-x bg-white p-2 border border-gray-500 rounded-3 shadow popup"
        style={{ zIndex: "100000", width: "265px" }}
      >
        <div>
          <p>{message}</p>
          <div className="d-flex flex-row align-items-end justify-content-end gap-2">
            <button
              className="btn btn-light"
              onClick={() => {
                setConfirmOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={(event) => {
                onConfirm(event);
                setConfirmOpen(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => setConfirmOpen(false)}
        className="position-fixed top-0 start-0 vw-100 vh-100"
        style={{
          zIndex: "10000",
        }}
      ></div>
    </>
  );
};

export const productColumns = ({
  onDeleteClick,
  dispatch,
  changeStatus,
  updateProductStates,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price,
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity,
    },
    {
      name: <span className="font-weight-bold fs-13">SKU</span>,
      selector: (row) => row.SKU,
    },
    {
      name: <span className="font-weight-bold fs-13">Optional Notes</span>,
      selector: (row) => row.optionalNotes,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Product Status</span>,
      selector: (row) => row.productStatus,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.productStatus === "Active"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Image</span>,
      cell: (row) => (
        <div>
          {row.productImage &&
            row.productImage.split(",").map((imageUrl, index) => (
              <div key={index} className="d-flex align-items-center">
                <img
                  src={process.env.REACT_APP_IMAGE_URL + imageUrl.trim()}
                  alt={`Product Image ${index + 1}`}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            ))}
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateProductStates({
                  formOpen: true,
                  isEdit: true,
                  singleProduct: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.productId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.productId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this product?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.productId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const categoryColumns = ({
  onDeleteClick,
  dispatch,
  changeStatus,
  updateCategoryStates,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Category Name</span>,
      selector: (row) => row.categoryName,
    },
    {
      name: <span className="font-weight-bold fs-13">Image</span>,
      cell: (row) => (
        <div className="d-flex align-items-center">
          <img
            src={process.env.REACT_APP_API_URL + row.categoryImage}
            alt="Category Image"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Category Status</span>,
      selector: (row) => row.categoryStatus,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.categoryStatus === "Active"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateCategoryStates({
                  formOpen: true,
                  isEdit: true,
                  singleCategory: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.categoryId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.categoryId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this category?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.categoryId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const UserColumns = ({
  dispatch,
  updateStatusStates,
  updateUserStates,
  onDeleteClick,
  updateUserStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">User Id</span>,
      selector: (row) => row.userId,
    },
    {
      name: <span className="font-weight-bold fs-13">First Name</span>,
      selector: (row) => row.firstName,
    },
    {
      name: <span className="font-weight-bold fs-13">Last Name</span>,
      selector: (row) => row.lastName,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
    },
    {
      name: <span className="font-weight-bold fs-13">Reason to Banned</span>,
      selector: (row) => row.bannedReason,
    },
    {
      name: <span className="font-weight-bold fs-13">Banned</span>,
      selector: (row) => row.userStatus,
      width: "100px",
      cell: (row) => (
        <Switch
          onChange={() => {
            if (row.userStatus === "Banned") {
              const payload = {
                userStatus: "Active",
                bannedReason: "",
                userId: row.userId,
              };
              dispatch(updateUserStatus(payload));
            } else {
              dispatch(
                updateStatusStates({
                  formOpen: true,
                  isEdit: true,
                  singleUser: row,
                })
              );
            }
          }}
          checked={row.userStatus === "Banned"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateUserStates({
                  formOpen: true,
                  isEdit: true,
                  singleUser: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.userId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.userId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this user?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.userId);
                setConfirmOpenForId(null);
              }}
            />
          )}
          {/* <a
            href="#"
            onClick={(event) => onDeleteClick(event, row?.)}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a> */}
        </div>
      ),
    },
  ];
};

export const PermissionColumns = ({
  dispatch,
  updatePermissionStates,
  onDeleteClick,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Permission Id</span>,
      selector: (row) => row.permissionId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Parent</span>,
      selector: (row) => row.parent,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updatePermissionStates({
                  formOpen: true,
                  isEdit: true,
                  singlePermission: row.permissionId,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.permissionId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.permissionId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this permission?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.permissionId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const settingColumns = ({
  dispatch,
  updateSettingStates,
  onDeleteClick,
  changeStatus,
  changeEditableStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Setting Id</span>,
      selector: (row) => row.settingId,
    },
    {
      name: <span className="font-weight-bold fs-13">Key</span>,
      selector: (row) => row.key,
    },
    {
      name: <span className="font-weight-bold fs-13">Value</span>,
      selector: (row) => row.value,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Label</span>,
      selector: (row) => row.label,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Editable</span>,
      selector: (row) => row.status,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeEditableStatus(row, checked)}
          checked={row.isEditable}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => row.status,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.isActive}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateSettingStates({
                  formOpen: true,
                  isEdit: true,
                  singleSetting: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.settingId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.settingId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this setting?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.settingId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const roleColumns = ({ dispatch, updateRoleStates, onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Role Id</span>,
      selector: (row) => row.roleId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/role/permission/${row.roleId}`}
            onClick={() => {
              dispatch(updateRoleStates({ singleRole: row.name }));
            }}
            className="p-2 fs-13 nav-link"
          >
            <i
              className="bx bx-calendar"
              style={{ color: "var(--vz-primary)", fontSize: "18px" }}
            ></i>
          </Link>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.roleId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.roleId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this role?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.roleId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const productReportColumns = () => {
  return [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price,
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity,
    },
    {
      name: <span className="font-weight-bold fs-13">SKU</span>,
      selector: (row) => row.SKU,
    },
  ];
};

export const productDateColumns = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: (row) => row.productName,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: (row) => row.price,
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: (row) => row.quantity,
    },
    {
      name: <span className="font-weight-bold fs-13">Create Date</span>,
      selector: (row) => row.createdAt,
      // format: (row) => {
      //   const date = new Date(row.createDate);
      //   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      // },
    },
  ];

  return columns;
};

export const vendorCommissionColumns = ({ dispatch, updateVendorStates }) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Company Name</span>,
      selector: (row) => row.companyName,
    },
    {
      name: <span className="font-weight-bold fs-13">Vendor Name</span>,
      selector: (row) => row.vendorName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total Sales</span>,
      selector: (row) => row.totalSales,
    },
    {
      name: <span className="font-weight-bold fs-13">Commission Rate</span>,
      selector: (row) => `${row.commissionRate}%`,
    },
    {
      name: <span className="font-weight-bold fs-13">Commission</span>,
      selector: (row) => row.commission,
    },
    {
      name: <span className="font-weight-bold fs-13">Total Amount Paid</span>,
      selector: (row) => row.totalAmountPaid,
    },
    {
      name: (
        <span className="font-weight-bold fs-13">Total Amount Pending</span>
      ),
      selector: (row) => row.totalAmountPending,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateVendorStates({
                  formOpen: true,
                  singleVendorCommission: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
        </div>
      ),
    },
  ];
  return columns;
};

export const adminCommissionColumns = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Company Name</span>,
      selector: (row) => row.companyName,
    },
    {
      name: <span className="font-weight-bold fs-13">Vendor Name</span>,
      selector: (row) => row.vendorName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Total Sales</span>,
      selector: (row) => row.totalSales,
    },
    {
      name: <span className="font-weight-bold fs-13">Commission Rate</span>,
      selector: (row) => `${row.commissionRate}%`,
    },
    {
      name: <span className="font-weight-bold fs-13">Commission</span>,
      selector: (row) => row.commission,
    },
    {
      name: <span className="font-weight-bold fs-13">Total Amount Paid</span>,
      selector: (row) => row.totalAmountPaid,
    },
    {
      name: (
        <span className="font-weight-bold fs-13">Total Amount Pending</span>
      ),
      selector: (row) => row.totalAmountPending,
    },
  ];
  return columns;
};

export const productLessThan10Columns = () => {
  const columns = [
    {
      name: "Product Name",
      selector: "productName",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "SKU",
      selector: "SKU",
    },
  ];

  // Wrap each column name with custom styling
  columns.forEach((column) => {
    column.name = <span className="font-weight-bold fs-13">{column.name}</span>;
  });

  return columns;
};

export const productRangeColumns = () => {
  const columns = [
    {
      name: "Product Name",
      selector: "productName",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "SKU",
      selector: "SKU",
    },
  ];

  columns.forEach((column) => {
    column.name = (
      <span className="font-weight-bold fs-13" key={column.selector}>
        {column.name}
      </span>
    );
  });

  return columns;
};

export const productStatusColumns = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Product Name</span>,
      selector: "productName",
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: "description",
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Price</span>,
      selector: "price",
    },
    {
      name: <span className="font-weight-bold fs-13">Quantity</span>,
      selector: "quantity",
    },
    {
      name: <span className="font-weight-bold fs-13">Product Status</span>,
      selector: "productStatus",
    },
  ];

  columns.forEach((column) => {
    column.name = (
      <span className="font-weight-bold fs-13" key={column.selector}>
        {column.name}
      </span>
    );
  });

  return columns;
};

export const userCreatedDateColumns = () => {
  const columns = [
    {
      name: "Product Name",
      selector: "productName",
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
    },
    {
      name: "Price",
      selector: "price",
    },
    {
      name: "Quantity",
      selector: "quantity",
    },
    {
      name: "SKU",
      selector: "SKU",
    },
  ];
  columns.forEach((column) => {
    column.name = (
      <span className="font-weight-bold fs-13" key={column.selector}>
        {column.name}
      </span>
    );
  });

  return columns;
};

export const notificationColumns = (onDeleteClick) => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Notification Id</span>,
      selector: (row) => row.notificationId,
    },
    {
      name: <span className="font-weight-bold fs-13">Title</span>,
      selector: (row) => row.title,
    },
    {
      name: <span className="font-weight-bold fs-13">Message</span>,
      selector: (row) => row.message,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => onDeleteClick(event, row.notificationid)}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];
  columns.forEach((column) => {
    column.name = (
      <span className="font-weight-bold fs-13" key={column.selector}>
        {column.name}
      </span>
    );
  });

  return columns;
};

export const userNotificationColumns = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Notification Id</span>,
      selector: (row) => row.id,
    },
    {
      name: <span className="font-weight-bold fs-13">Message</span>,
      selector: (row) => row.message,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => row.status,
    },
    {
      name: <span className="font-weight-bold fs-13">Create At</span>,
      selector: (row) => row.createdAt,
    },
  ];
  columns.forEach((column) => {
    column.name = (
      <span className="font-weight-bold fs-13" key={column.selector}>
        {column.name}
      </span>
    );
  });

  return columns;
};

export const orderColumns = ({
  dispatch,
  updateOrderStates,
  onDeleteClick,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Processing":
        return "primary";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return [
    {
      name: <span className="font-weight-bold fs-13">Order Id</span>,
      cell: (row) => (
        <Link
          to={`/order/update-order/${row.orderId}`}
          onClick={() => {
            dispatch(updateOrderStates({ singleOrder: row }));
          }}
          className="p-2 fs-13 nav-link"
        >
          {`#${row.orderId}`}
        </Link>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Order Amount</span>,
      selector: (row) => row.orderAmount,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Status</span>,
      selector: (row) => (
        <span
          className={`btn btn-sm btn-soft-${getStatusColor(
            row.orderStatus
          )} m-sm-1`}
        >
          {row.orderStatus}
        </span>
      ),
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Order Date</span>,
      selector: (row) => row.orderDate,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.shippingName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Address</span>,
      selector: (row) => row.shippingAddress,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.shippingEmail,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile Number</span>,
      selector: (row) => row.shippingMobileNumber,
      wrap: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.orderId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.orderId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this order?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.orderId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const vendorOrderColumns = ({
  dispatch,
  updateOrderStates,
  onDeleteClick,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Processing":
        return "primary";
      case "Shipped":
        return "info";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return [
    {
      name: <span className="font-weight-bold fs-13">Order Id</span>,
      cell: (row) => (
        <Link
          to={`/vendor/order-detail/${row.orderId}`}
          onClick={() => {
            dispatch(updateOrderStates({ singleOrder: row }));
          }}
          className="p-2 fs-13 nav-link"
        >
          {`#${row.orderId}`}
        </Link>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Order Amount</span>,
      selector: (row) => row.orderAmount,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Status</span>,
      selector: (row) => (
        <span
          className={`btn btn-sm btn-soft-${getStatusColor(
            row.orderStatus
          )} m-sm-1`}
        >
          {row.orderStatus}
        </span>
      ),
      width: "120px",
    },
    {
      name: <span className="font-weight-bold fs-13">Order Date</span>,
      selector: (row) => row.orderDate,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.shippingName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Address</span>,
      selector: (row) => row.shippingAddress,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.shippingEmail,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile Number</span>,
      selector: (row) => row.shippingMobileNumber,
      wrap: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.orderId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.orderId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this order?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.orderId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const PostTypeColumns = ({
  dispatch,
  updatePostTypeStates,
  onDeleteClick,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Post Type Id</span>,
      selector: (row) => row.postTypeId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Slug</span>,
      selector: (row) => row.slug,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updatePostTypeStates({
                  formOpen: true,
                  isEdit: true,
                  singlePostType: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.postTypeId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.postTypeId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this postType?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.postTypeId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const PostCategoryColumns = ({
  dispatch,
  updatePostCategoryStates,
  onDeleteClick,
  changeStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Post Type Id</span>,
      selector: (row) => row.postCategoryId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.name,
    },
    {
      name: <span className="font-weight-bold fs-13">Slug</span>,
      selector: (row) => row.slug,
    },
    {
      name: <span className="font-weight-bold fs-13">Category Status</span>,
      selector: (row) => row.categoryStatus,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.categoryStatus === "Active"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">metaTitle</span>,
      selector: (row) => row.metaTitle,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">metaDescription</span>,
      selector: (row) => row.metaDescription,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">metaKeywords</span>,
      selector: (row) => row.metaKeywords,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updatePostCategoryStates({
                  formOpen: true,
                  isEdit: true,
                  singlePostCategory: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.postCategoryId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.postCategoryId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this post category?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.postCategoryId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const PostColumns = ({ dispatch, updatePostStates, onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Post Type Id</span>,
      selector: (row) => row.postId,
    },
    {
      name: <span className="font-weight-bold fs-13">Title</span>,
      selector: (row) => row.title,
    },
    {
      name: <span className="font-weight-bold fs-13">Content</span>,
      selector: (row) => row.content,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Post Status</span>,
      selector: (row) => row.postStatus,
    },
    {
      name: <span className="font-weight-bold fs-13">Meta Title</span>,
      selector: (row) => row.metaTitle,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Meta Description</span>,
      selector: (row) => row.metaDescription,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Meta Keywords</span>,
      selector: (row) => row.metaKeywords,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/update/post/${row.postId}`}
            onClick={() => {
              dispatch(
                updatePostStates({
                  formOpen: true,
                  isEdit: true,
                  singlePost: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"
              style={{ color: "var(--vz-primary)", fontSize: "18px" }}
            ></i>
          </Link>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.postId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.postId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this post?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.postId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//Payment
export const paymentGatewayColumns = ({
  onDeleteClick,
  updatePaymentGatewayStates,
  dispatch,
}) => {
  return [
    {
      name: <span className="font-weight-bold fs-13">Id</span>,
      selector: (row) => row.paymentGatewayId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => row.paymentGatewayName,
    },
    {
      name: <span className="font-weight-bold fs-13">keyId</span>,
      selector: (row) => row.keyId,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Key Secret</span>,
      selector: (row) => row.keySecret,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">keyId</span>,
      selector: (row) => row.keyId,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updatePaymentGatewayStates({
                  formOpen: true,
                  isEdit: true,
                  singlePaymentGateway: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => onDeleteClick(event, row.paymentGatewayId)}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
        </div>
      ),
    },
  ];
};

export const couponColumns = ({
  dispatch,
  updateCouponStates,
  onDeleteClick,
  changeStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Coupon Id</span>,
      selector: (row) => row.couponId,
    },
    {
      name: <span className="font-weight-bold fs-13">Coupon Code</span>,
      selector: (row) => row.couponCode,
    },
    {
      name: <span className="font-weight-bold fs-13">Discount Type</span>,
      selector: (row) => row.discountType,
    },
    {
      name: <span className="font-weight-bold fs-13">Discount Amount</span>,
      selector: (row) => row.discountAmount,
    },
    {
      name: <span className="font-weight-bold fs-13">Expiry Date</span>,
      selector: (row) => row.expiryDate,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Coupon Status</span>,
      selector: (row) => row.isActive,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.isActive}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },

    {
      name: <span className="font-weight-bold fs-13">Usage Count</span>,
      selector: (row) => row.usageCount,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateCouponStates({
                  formOpen: true,
                  isEdit: true,
                  singleCoupon: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.couponId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.couponId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this coupon?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.couponId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//Employee
export const employeeColumns = ({
  dispatch,
  updateEmployeeStates,
  onDeleteClick,
  updateStatusStates,
  updateEmployeeStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Admin Id</span>,
      selector: (row) => row.adminId,
      width: "8%",
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: <span className="font-weight-bold fs-13">email</span>,
      selector: (row) => row.email,
      width: "14%",
    },
    {
      name: <span className="font-weight-bold fs-13">mobile</span>,
      selector: (row) => row.mobile,
    },
    {
      name: <span className="font-weight-bold fs-13">role</span>,
      selector: (row) => row.role,
      width: "6%",
    },
    {
      name: <span className="font-weight-bold fs-13">Super Admin</span>,
      selector: (row) => row.isSuperAdmin,
    },
    {
      name: <span className="font-weight-bold fs-13">Banned</span>,
      selector: (row) => row.accountStatus,
      width: "100px",
      cell: (row) => (
        <Switch
          onChange={() => {
            if (row.accountStatus === "Banned") {
              const payload = {
                accountStatus: "Active",
                bannedReason: "",
                adminId: row.adminId,
              };
              dispatch(updateEmployeeStatus(payload));
            } else {
              dispatch(
                updateStatusStates({
                  formOpen: true,
                  isEdit: true,
                  singleEmployee: row,
                })
              );
            }
          }}
          checked={row.accountStatus === "Banned"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.adminId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Banned Reason</span>,
      selector: (row) => row.bannedReason,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateEmployeeStates({
                  formOpen: true,
                  isEdit: true,
                  singleEmployee: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.adminId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.adminId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this admin?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.adminId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//email
export const emailColumns = ({
  dispatch,
  updateEmailStates,
  onDeleteClick,
  changeStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Template Name</span>,
      selector: (row) => row.templateName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row) => row.subject,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Template Status</span>,
      selector: (row) => row.status,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.status === "Active"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/update/email-template/${row.id}`}
            onClick={() => {
              dispatch(
                updateEmailStates({
                  formOpen: true,
                  isEdit: true,
                  singleEmail: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"
              style={{ color: "var(--vz-primary)", fontSize: "18px" }}
            ></i>
          </Link>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.id);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.id && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this email templates?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.id);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//activity log
export const activityLogColumns = ({ onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">User Id</span>,
      selector: (row) => row.userID,
    },
    {
      name: <span className="font-weight-bold fs-13">Activity Type</span>,
      selector: (row) => row.activityType,
    },
    {
      name: <span className="font-weight-bold fs-13">Order Status</span>,
      selector: (row) => (row.details && row.details.orderStatus) || "",
    },
    {
      name: <span className="font-weight-bold fs-13">Email Type</span>,
      selector: (row) => (row.details && row.details.email) || "",
    },
    {
      name: <span className="font-weight-bold fs-13">Username</span>,
      selector: (row) => (row.details && row.details.username) || "",
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.logId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.logId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this activity log?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.logId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const ticketColumns = ({
  onDeleteClick,
  changeStatus,
  dispatch,
  updateTicketStates,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <Link
            to={`/ticket-chat/${row.id}`}
            className="p-2 fs-13 nav-link"
            onClick={() => {
              dispatch(
                updateTicketStates({
                  singleTicket: row,
                })
              );
            }}
          >
            {`#${row.id}`}
          </Link>
        </div>
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Request By</span>,
      selector: (row) => row.requestedBy,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Type</span>,
      selector: (row) => row.type,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row) => row.subject,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => row.status,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.status === "open"}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Priority</span>,
      selector: (row) => row.priority,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateTicketStates({
                  formOpen: true,
                  isEdit: true,
                  singleTicket: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.id);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.id && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this ticket?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.id);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const heroSliderColumns = ({
  dispatch,
  updateHeroSliderStates,
  onDeleteClick,
  changeStatus,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Banner Title</span>,
      selector: (row) => row.bannerTitle,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Banner Description</span>,
      selector: (row) => row.bannerDescription,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Banner Button Text</span>,
      selector: (row) => row.bannerButtonText,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Banner Order</span>,
      selector: (row) => row.order,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Banner Status</span>,
      selector: (row) => row.isActive,
      cell: (row) => (
        <Switch
          onChange={(checked) => changeStatus(row, checked)}
          checked={row.isActive}
          height={18}
          width={35}
          handleDiameter={15}
          id={row.userId}
        />
      ),
    },
    {
      name: <span className="font-weight-bold fs-13">Create At</span>,
      selector: (row) => row.createdAt,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateHeroSliderStates({
                  formOpen: true,
                  isEdit: true,
                  singleHeroSlider: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.heroSliderId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.heroSliderId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this coupon?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.heroSliderId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const brandColumns = ({
  onDeleteClick,
  dispatch,
  updateBrandStates,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Brand Id</span>,
      selector: (row) => row.brandId,
    },
    {
      name: <span className="font-weight-bold fs-13">Brand Name</span>,
      selector: (row) => row.brandName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Description</span>,
      selector: (row) => row.description,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateBrandStates({
                  formOpen: true,
                  isEdit: true,
                  singleBrand: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.brandId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.brandId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this product?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.brandId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const feedbackColumns = ({ onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Contact Id</span>,
      selector: (row) => row.contactId,
    },
    {
      name: <span className="font-weight-bold fs-13">Name</span>,
      selector: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.email,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Mobile</span>,
      selector: (row) => row.mobile,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Subject</span>,
      selector: (row) => row.subject,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Message</span>,
      selector: (row) => row.message,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.contactId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.contactId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this product?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.contactId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const walletHistoryColumns = ({ onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);
  const getStatusColor = (type) => {
    switch (type) {
      case "Credit":
        return "success";
      case "Debit":
        return "danger";
      default:
        return "secondary";
    }
  };
  return [
    {
      name: <span className="font-weight-bold fs-13">Amount</span>,
      selector: (row) => row.amount,
    },
    {
      name: <span className="font-weight-bold fs-13"> Transaction Type</span>,
      selector: (row) => (
        <span
          className={`btn btn-sm btn-soft-${getStatusColor(row.type)} m-sm-1`}
        >
          {row.type}
        </span>
      ),
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Previous Amount</span>,
      selector: (row) => row.previousAmount,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Current Amount</span>,
      selector: (row) => row.currentAmount,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Transaction Status</span>,
      selector: (row) => row.status,
      wrap: true,
    },

    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.id);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.id && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this ticket?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.id);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

export const fundRequestColumns = ({
  onDeleteClick,
  dispatch,
  updateFundRequestStates,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);
  return [
    {
      name: <span className="font-weight-bold fs-13">Amount</span>,
      selector: (row) => row.amount,
    },
    {
      name: <span className="font-weight-bold fs-13">Status</span>,
      selector: (row) => row.status,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Message</span>,
      selector: (row) => row.message,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateFundRequestStates({
                  formOpen: true,
                  isEdit: true,
                  singleBrand: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.id);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.id && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this product?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.id);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//vendor
export const vendorColumns = ({ onDeleteClick }) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);
  return [
    {
      name: <span className="font-weight-bold fs-13">createdAt</span>,
      selector: (row) => row.userDetails.mobile,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Email</span>,
      selector: (row) => row.userDetails.email,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Wallet Ballance</span>,
      selector: (row) => row.userDetails.walletBalance,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Conpany Name</span>,
      selector: (row) => row.companyName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Company Phone No</span>,
      selector: (row) => row.companyPhoneNumber,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Address</span>,
      selector: (row) => row.companyAddress,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.id);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>
          {confirmOpenForId === row.id && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this product?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.id);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//Currency
export const currencyColumns = ({
  dispatch,
  updateCurrencyStates,
  onDeleteClick,
}) => {
  const [confirmOpenForId, setConfirmOpenForId] = useState(null);

  return [
    {
      name: <span className="font-weight-bold fs-13">Currency Id</span>,
      selector: (row) => row.currencyId,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Currency Name</span>,
      selector: (row) => row.currencyName,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Currency Code</span>,
      selector: (row) => row.currencyCode,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Symbol</span>,
      selector: (row) => row.symbol,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Country</span>,
      selector: (row) => row.country,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Exchange Rate</span>,
      selector: (row) => row.exchangeRate,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Action</span>,
      cell: (row) => (
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                updateCurrencyStates({
                  formOpen: true,
                  isEdit: true,
                  singleCurrency: row,
                })
              );
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i className="ri-pencil-fill fs-13 p-2 bg-soft-primary text-primary rounded-circle align-middle"></i>
          </a>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setConfirmOpenForId(row.currencyId);
            }}
            className="p-2 fs-13 nav-link refresh-button"
          >
            <i
              className="ri-delete-bin-7-fill fs-13 p-2 bg-soft-danger text-red rounded-circle align-middle"
              style={{ color: "var(--vz-danger)" }}
            ></i>
          </a>

          {confirmOpenForId === row.currencyId && (
            <ConfirmPopup
              message={"Are you sure you want to Delete this coupon?"}
              setConfirmOpen={() => setConfirmOpenForId(null)}
              onConfirm={(event) => {
                onDeleteClick(event, row.currencyId);
                setConfirmOpenForId(null);
              }}
            />
          )}
        </div>
      ),
    },
  ];
};

//customer feedback
export const customerFeedbackColumns = () => {
  const columns = [
    {
      name: <span className="font-weight-bold fs-13">Created At</span>,
      selector: (row) => row.createdAt,
    },
    {
      name: <span className="font-weight-bold fs-13">Rating</span>,
      selector: (row) => row.rating,
      wrap: true,
    },
    {
      name: <span className="font-weight-bold fs-13">Comment</span>,
      selector: (row) => row.comment,
    },
  ];
  return columns;
};
