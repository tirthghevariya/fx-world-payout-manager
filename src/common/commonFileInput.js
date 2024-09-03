/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FormFeedback } from "reactstrap";
import axios from "axios";
import { updateCategoryStates } from "../slices/category/reducer";
import { useDispatch } from "react-redux";
import { updateHeroSliderStates } from "../slices/heroSlider/reducer";
import { updateBrandStates } from "../slices/brand/reducer";
import ProgressBar from "@ramonak/react-progress-bar";

const FileUploader = ({
  label,
  id,
  name,
  validation,
  multi,
  uploadUrl,
  uploadType,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileToServer = async (event) => {
    setIsLoading(true);
    try {
      const selectedFiles = event.target.files;

      if (!selectedFiles || selectedFiles.length === 0) {
        setIsLoading(false);
        return;
      }

      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response) {
        validation.setFieldValue(uploadType, response.finalImagePaths);
        dispatch(
          updateCategoryStates({
            imageUploadResponse: response.finalImagePaths,
          })
        );
        dispatch(
          updateHeroSliderStates({
            imageUploadResponse: response.finalImagePaths,
          })
        );
        dispatch(
          updateBrandStates({
            imageUploadResponse: response.finalImagePath,
          })
        );
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="col-lg-12">
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={uploadFileToServer}
        onBlur={validation.handleBlur}
        className="form-control"
        multiple={multi}
      />
      {isLoading && <ProgressBar className="mt-2" completed={100} />}
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

export default FileUploader;
