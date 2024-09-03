import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  getAllSettingList,
  updateBulkSetting,
  getSettingKeyValueList,
  getCurrencyList,
} from "../../slices/thunks";
import { Button, Form, Container, Input, Card, CardBody } from "reactstrap";

const Setting = () => {
  const dispatch = useDispatch();
  const [, setFetchingData] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const { settingList, settingKeyValue } = useSelector(
    (state) => state.setting
  );

  const { currencyList } = useSelector((state) => state.currency);

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getAllSettingList());
    dispatch(getSettingKeyValueList());
    dispatch(getCurrencyList());
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const updatedFormErrors = { ...formErrors };
    delete updatedFormErrors[name];
    setFormErrors(updatedFormErrors);
    console.log("updatedFormErrors", event.target);

    setFormData({ ...formData, [name]: value });

    if (name === "default_currency") {
      const updatedSettings = [
        {
          settingId: 39,
          value: value,
        },
      ];
      dispatch(updateBulkSetting(updatedSettings));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      const updatedSettings = Object.keys(formData).map((key) => {
        const settingId = key.split("_")[1];
        return {
          settingId: parseInt(settingId),
          key: formData[key],
        };
      });
      dispatch(updateBulkSetting(updatedSettings));
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};
    settingList.data &&
      settingList.data.rows.forEach((data) => {
        const fieldName = `key_${data.settingId}`;
        const value = formData[fieldName];
        if (!value || !value.trim()) {
          errors[fieldName] = `${data.label} is required`;
        }
      });
    return errors;
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={"Update Employee setting"} pageTitle="setting" />\
          <div className="mt-5">
            <Form onSubmit={handleSubmit}>
              <Card>
                <CardBody>
                  <div className="mt-4">
                    <div className="row mb-3">
                      {settingList.data &&
                        settingList.data.rows.map((data) => (
                          <div className="col-md-6 mb-3" key={data.settingId}>
                            <label htmlFor={`key_${data.settingId}`}>
                              {data.label}
                            </label>
                            {data.fieldType === "input" ? (
                              <Input
                                type="text"
                                name={`key_${data.settingId}`}
                                id={`key_${data.settingId}`}
                                placeholder="Enter Full key"
                                value={formData[`key_${data.settingId}`] || ""}
                                onChange={handleInputChange}
                                style={{ width: "100%" }}
                                invalid={formErrors[`key_${data.settingId}`]}
                              />
                            ) : data.fieldType === "select" ? (
                              <Input
                                type="select"
                                name={`key_${data.settingId}`}
                                id={`key_${data.settingId}`}
                                onChange={handleInputChange}
                                style={{ width: "100%" }}
                                invalid={formErrors[`key_${data.settingId}`]}
                              >
                                <option value="">Select an option</option>
                                {data.fieldOptions &&
                                  data.fieldOptions
                                    .split(",")
                                    .map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                              </Input>
                            ) : null}
                            {formErrors[`key_${data.settingId}`] && (
                              <div className="text-danger mt-1">
                                {formErrors[`key_${data.settingId}`]}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                    <label>Currency</label>
                    <Input
                      value={
                        (settingKeyValue &&
                          settingKeyValue.data &&
                          settingKeyValue.data.default_currency) ||
                        ""
                      }
                      type="select"
                      name="default_currency"
                      id="default_currency"
                      onChange={handleInputChange}
                      style={{ width: "49%" }}
                      invalid={formErrors["default_currency"]}
                    >
                      <option value="">Select an option</option>
                      {currencyList.data &&
                        currencyList.data.rows.map((option, index) => (
                          <option key={index} value={option.currencyCode}>
                            {`${option.currencyName} ${option.symbol}`}
                          </option>
                        ))}
                    </Input>
                    <div className="row justify-content-end">
                      <div className="col-md-6">
                        <div className="d-flex justify-content-end">
                          <Button
                            color="primary"
                            type="submit"
                            className="btn btn-primary"
                          >
                            Update Setting
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Form>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Setting;
