import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPermissionsList } from "../../slices/permission/thunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label, Container, Card, CardBody, Form, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { useParams } from "react-router-dom";
import TextInput from "../../common/textInput";
import { updateRoles } from "../../slices/thunks";

const Permission = () => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [errorMessage] = useState("");

  const { permissionList } = useSelector((state) => state.permission);

  const { updateRole } = useSelector((state) => state.role);
  const params = useParams();

  const roleId = params.id;

  useEffect(() => {
    if (!fetchingData) {
      setFetchingData(true);
      fetchData(params.id);
    }
  }, [dispatch, params.id]);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getPermissionsList());
  };

  const changePermissionCheckbox = (event) => {
    const { value, checked } = event.target;
    const updatedPermission = checked
      ? [...validation.values.permission, value]
      : validation.values.permission.filter((lang) => lang !== value);
    validation.setFieldValue("permission", updatedPermission);
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: updateRole.singleRole,
      permission: [],
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please enter Role name"),
      permission: Yup.array().test(
        "at-least-one-permission",
        "Please select at least one permission",
        function (value) {
          return value && value.length > 0;
        }
      ),
    }),

    onSubmit: async (values) => {
      const payload = {
        roleId: roleId,
        name: values.name,
        permission: values.permission,
      };
      dispatch(updateRoles(payload));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content mt-5">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
          <Form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <TextInput
              label="Roll Name"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Role Name"
              validation={validation}
            />
            <Label for="ForminputState" className="form-label">
              Permissions
            </Label>
            <div className="permission-container">
              {permissionList.data &&
                permissionList.data.rows.map((permission) => (
                  <Card key={permission.parent.permissionId}>
                    <CardBody>
                      <div>
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input primary"
                            id={permission.parent.permissionId}
                            name="permission"
                            value={permission.parent.permissionId}
                            // checked={validation.values.permission
                            //   .includes
                            //   // permission.parent.permissionId
                            //   ()}
                            onChange={changePermissionCheckbox}
                          />
                          <Label
                            className="form-label mb-0"
                            htmlFor={permission.parent.permissionId}
                          >
                            <strong>{permission.parent.name}</strong>
                          </Label>
                        </div>
                        <div>
                          <hr className="custom-divider" />{" "}
                        </div>
                        {permission.parent.children &&
                          permission.parent.children.length > 0 && (
                            <div className="sub-options-container subbox-margin">
                              {permission.parent.children &&
                                permission.parent.children.map((child) => (
                                  <div
                                    key={child.permissionId}
                                    className="mr-2"
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id={child.permissionId}
                                      name="permissions"
                                      value={child.permissionId}
                                      // checked={validation.values.permission.includes(
                                      //   child.permissionId
                                      // )}
                                      onChange={changePermissionCheckbox}
                                    />
                                    <Label
                                      className="italic-label"
                                      htmlFor={child.permissionId}
                                    >
                                      {child.name}
                                    </Label>
                                  </div>
                                ))}
                            </div>
                          )}
                      </div>
                    </CardBody>
                  </Card>
                ))}
            </div>
            {validation.errors.permission && (
              <div className="text-danger mt-2">
                {validation.errors.permission}
              </div>
            )}
            <div className="text-center mt-4 mb-4">
              <Button className="btn btn-primary" color="primary" type="submit">
                <i className="ri-arrow-left-up-line"></i>Update Permission
              </Button>
            </div>
            {errorMessage && (
              <div className="text-danger mt-2">{errorMessage}</div>
            )}
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Permission;
