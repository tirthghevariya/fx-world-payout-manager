import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Spinner, Button, FormFeedback } from "reactstrap";
import CommonModal from "../../Components/Common/CommonModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateBulkImportState } from "../../slices/product/reducer";
import { getProductKeysList, bulkFileImport } from "../../slices/thunks";
import { UPLOAD_CSV_FILE } from "../../helpers/url_helper";
import axios from "axios";
import Papa from "papaparse";
import Select from "react-select";

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const BulkImport = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const { bulkImport, getProductsKeysList } = useSelector(
    (state) => state.product
  );
  const [fetchingData, setFetchingData] = useState(false);
  const [, setUploading] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    if (!fetchingData && bulkImport.formOpen && bulkImport) {
      setFetchingData(true);
      fetchData();
    }
  }, [dispatch, bulkImport, getProductsKeysList]);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getProductKeysList());
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      csvFile: null,
      selectedOptions: {},
    },
    validationSchema: Yup.object({
      selectedOptions: Yup.object().required("Please Enter Topic Name"),
    }),
    onSubmit: (values) => {
      const selectedOptions = {};
      getProductsKeysList.data.forEach((product, index) => {
        selectedOptions[product] = values[`selectedOption_${index}`].value;
      });

      const formData = {
        selectedOptions: {
          ...selectedOptions,
          csvFile: bulkImport.csvFile,
        },
      };

      dispatch(updateBulkImportState({ loading: true }));
      dispatch(bulkFileImport(formData));
    },
  });

  return (
    <>
      <CommonModal
        isPopupOpen={bulkImport.formOpen}
        modalSize={"md"}
        closeModal={() => dispatch(updateBulkImportState({ formOpen: false }))}
        closeTitle=""
        modelTitle="Bulk Import"
        modalBody={
          <Form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }}
          >
            <div className="App">
              <FilePond
                files={files}
                allowMultiple={true}
                onupdatefiles={setFiles}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={["text/csv"]}
                server={{
                  process: async (file, load, error, progress) => {
                    try {
                      setUploading(true);

                      const formData = new FormData();
                      formData.append("documents", file);

                      const response = await axios.post(
                        process.env.REACT_APP_API_URL + UPLOAD_CSV_FILE,
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                          onUploadProgress: (e) => {
                            progress(e.lengthComputable, e.loaded, e.total);
                          },
                        }
                      );

                      const reader = new FileReader();
                      reader.onload = () => {
                        const csvData = reader.result;
                        Papa.parse(csvData, {
                          header: false,
                          complete: (results) => {
                            const row = results.data.slice(2)[1];
                            const options = row.map((value, index) => ({
                              value: index,
                              label: value,
                            }));
                            setDropdownOptions(options);
                          },
                        });
                      };
                      reader.readAsText(file);

                      if (response.data.finalDocumentPaths) {
                        dispatch(
                          updateBulkImportState({
                            csvFile: response.data.finalDocumentPaths,
                          })
                        );
                      }
                      load(response.data.finalDocumentPaths);
                    } catch (err) {
                      console.error(err);
                      error("Upload failed");
                    } finally {
                      setUploading(false);
                    }

                    return {
                      abort: () => {
                        console.log("Upload aborted");
                      },
                    };
                  },
                }}
              />
            </div>
            <div
              className="mb-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  {getProductsKeysList.data &&
                    getProductsKeysList.data.map((product, index) => (
                      <div key={index} style={{ marginTop: "11px" }}>
                        <div>{`${product} :`}</div>
                      </div>
                    ))}
                </div>
                <div style={{ width: "200px" }}>
                  {getProductsKeysList.data &&
                    getProductsKeysList.data.map((product, index) => (
                      <div key={index} style={{ marginTop: "5px" }}>
                        <Select
                          className="dropdown-height"
                          options={dropdownOptions}
                          placeholder={`Select ${product}`}
                          isInvalid={validation}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              height: "25px",
                              alignContent: "center",
                              minHeight: "2px",
                            }),
                          }}
                          onChange={(selectedOption) => {
                            validation.setFieldValue(
                              `selectedOption_${index}`,
                              selectedOption
                            );
                          }}
                          onBlur={() => {
                            validation.setFieldTouched(
                              `selectedOption_${index}`,
                              true
                            );
                          }}
                        />
                        {validation.touched[`selectedOption_${index}`] &&
                          validation.errors[`selectedOption_${index}`] && (
                            <FormFeedback>
                              {validation.errors[`selectedOption_${index}`]}
                            </FormFeedback>
                          )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="mb-3"></div>
            <div className="modal-footer p-0">
              <Button
                disabled={!bulkImport.csvFile}
                color="primary"
                type="submit"
                className="m-0 mt-4"
              >
                {bulkImport.loading ? (
                  <>
                    <Spinner size="sm" className="me-0"></Spinner> Importing...
                  </>
                ) : (
                  <>
                    <i className=" ri-add-fill"></i> Import
                  </>
                )}
              </Button>
            </div>
          </Form>
        }
      />
    </>
  );
};

export default BulkImport;
