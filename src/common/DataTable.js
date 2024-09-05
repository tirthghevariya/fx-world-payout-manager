
import React, { useState } from "react";
import SearchField from "./DataTableSearch";
import DataTable, { createTheme } from "react-data-table-component";
import { toSnake } from "./ReqResConvertCase";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { Button } from "reactstrap";
import TableSkeleton from "./Skeleton";
import { Link } from "react-router-dom";

const CommonDataTable = (props) => {
  const { layoutModeType } = useSelector((state) => ({
    layoutModeType: state.Layout.layoutModeType,
  }));

  createTheme("dark", {
    background: {
      default: "transparent",
    },
  });

  const [filterParams, setFilterParams] = useState(props.filterParams);

  const updateFilterParams = async (newFilterParams) => {
    setFilterParams(newFilterParams);
    await props.fetchData(newFilterParams);
  };

  const exportToExcel = async () => {
    updateFilterParams({ ...filterParams, isDownload: true });

    try {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (filterParams.isDownload) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });

      const ws = XLSX.utils.json_to_sheet(props.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      XLSX.writeFile(wb, `${props.exportFileName || "data"}.xlsx`, {
        bookType: "xlsx",
        type: "buffer",
        compression: true,
      });
      updateFilterParams({ ...filterParams, isDownload: false });
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      updateFilterParams({ ...filterParams, isDownload: false });
    }
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    const updatedFilterParams = {
      ...filterParams,
      currentPage: page,
      perPage: newPerPage,
    };
    setFilterParams(updatedFilterParams);
    props.fetchData(updatedFilterParams);
  };

  return (
    <div>
      <div className="button-margin">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="form-icon" style={{ flex: "1", maxWidth: "30%" }}>
            {props.searchEnable && (
              <div className="">
                <SearchField
                  filterParams={props.filterParams}
                  fetchData={props.fetchData}
                />
              </div>
            )}
          </div>
          <div>
            {props.showAddButton && (
              <div>{props.form}</div>
            )}
            {props.showOrderButton && (
              <Link
                to="/order/order-product"
                className="btn btn-primary add-button-margin"
              >
                Order Product
              </Link>
            )}
            {props.showExportButton && (
              <Button
                className="btn btn-primary add-button-margin"
                color="primary"
                type="submit"
                onClick={exportToExcel}
              >
                <i className="bx bxs-file-export"></i>Export
              </Button>
            )}
            {props.showBulkImportButton && (
              <Button
                className="btn btn-primary add-button-margin"
                color="primary"
                type="submit"
                onClick={props.bulkImport}
              >
                <i className="bx bxs-file-export"></i>BulkImport
              </Button>
            )}
            {props.selectedRows.length === 0 ? null : (
              <Button
                className="btn btn-danger "
                color="danger"
                disabled={props.selectedRows.length === 0}
                onClick={props.bulkDelete}
              >
                Delete Item
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="table-container" style={{ marginBottom: "50px" }}>
        <DataTable
          theme={layoutModeType === "light" ? "" : "dark"}
          columns={props.columns}
          data={props.data}
          pagination
          highlightOnHover
          paginationServer
          selectableRows={props.checkboxEnabled ? props.checkboxEnabled : false}
          progressComponent={
            <div style={{ width: "100%" }}>
              <TableSkeleton rows={10} columns={props.columns.length} />
            </div>
          }
          progressPending={props.loading}
          onChangeRowsPerPage={handleRowsPerPageChange}
          sortServer
          persistTableHead
          paginationPerPage={
            props.perPage || process.env.REACT_APP_RECORDS_PER_PAGE
          }
          paginationTotalRows={props.totalRows}
          onSelectedRowsChange={({ selectedRows }) => {
            if (props.bulkSelected) {
              props.bulkSelected(selectedRows);
            }
          }}
          onSort={(sortingColumns, order) => {
            const orderBy = sortingColumns.selector
              .toString()
              .replace("row => row.", "");
            orderBy = orderBy.replace("(row) => row.", "");
            orderBy = orderBy.replace("row%20=>%20row.", "");
            const updatedFilterParams = {
              ...filterParams,
              order,
              orderBy: toSnake(orderBy),
            };
            setFilterParams(updatedFilterParams);
            props.fetchData(updatedFilterParams);
          }}
          onChangePage={(page) => {
            const updatedFilterParams = {
              ...filterParams,
              currentPage: page,
            };
            setFilterParams(updatedFilterParams);
            props.fetchData(updatedFilterParams);
          }}
        />
      </div>
    </div>
  );
};

export default CommonDataTable;
