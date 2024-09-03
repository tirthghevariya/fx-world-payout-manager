/* eslint-disable react/prop-types */
import React from "react";
import Select from "react-select";
import { FormFeedback } from "reactstrap";

const MultiSelectDropdown = ({ label, options, name, id, validation }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="col-lg-12">
        {label}
      </label>
      <Select
        options={options}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        name={name}
        id={id}
        onChange={(selectedOptions) =>
          validation.setFieldValue(name, selectedOptions)
        }
        onBlur={validation.handleBlur}
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

export default MultiSelectDropdown;
