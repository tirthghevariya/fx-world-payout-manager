/* eslint-disable react/prop-types */
import React from "react";
import { Input, FormFeedback } from "reactstrap";

const TextInput = ({
  label,
  maxLength,
  name,
  id,
  placeholder,
  validation,
  textarea, // define this when if it's a textarea
}) => {
  const inputComponent = textarea ? "textarea" : "input"; // Use textarea if specified

  return (
    <div className="mb-3">
      <label htmlFor={id} className="col-lg-12">
        {label}
      </label>
      <Input
        type={inputComponent} // Use textarea if specified
        maxLength={maxLength}
        className="form-control"
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={validation.handleChange}
        invalid={
          validation.touched[name] && validation.errors[name] ? true : false
        }
        value={validation.values[name] || ""}
        onBlur={validation.handleBlur}
      />
      {validation.touched[name] && validation.errors[name] ? (
        <FormFeedback type="invalid">{validation.errors[name]}</FormFeedback>
      ) : null}
    </div>
  );
};

export default TextInput;
