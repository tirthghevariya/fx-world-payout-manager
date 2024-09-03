import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextInput from "../../common/textInput";
import { Button, Form, Container } from "reactstrap";
import { editEmail, createEmail, getVariableList } from "../../slices/thunks";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const EmailTemplates = () => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const navigate = useNavigate();
  const [fetchingData, setFetchingData] = useState(false);

  const { filterParams, variableList, updateEmail } = useSelector(
    (state) => state.email
  );

  const emailData = updateEmail.singleEmail;
  const payload = { ...filterParams, type: emailData.type };

  const [editorData, setEditorData] = useState("");

  const fetchData = (payload) => {
    setFetchingData(true);
    dispatch(getVariableList(payload));
  };

  useEffect(() => {
    if (!fetchingData) {
      fetchData(payload);
    }
    if (emailData && emailData.bodyHtml) {
      setEditorData(emailData.bodyHtml);
    }
  }, [emailData]);

  const typeOptions = [
    { value: "forgotpassword", label: "Forgot password" },
    { value: "registration", label: "Registration" },
    { value: "order", label: "Order" },
  ];

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      templateName: emailData && emailData.templateName,
      subject: emailData && emailData.subject,
      description: emailData && emailData.description,
      bodyText: emailData && emailData.bodyText,
      id: emailData && emailData.id,
    },

    validationSchema: Yup.object({
      templateName: Yup.string().required("Please Enter templateName"),
      subject: Yup.string().required("Please Enter subject"),
      description: Yup.string().required("Please Enter description"),
      bodyText: Yup.string().required("Please Enter bodyText"),
    }),

    onSubmit: (values) => {
      const editorContent = editorData;

      const formData = { ...values, bodyHtml: editorContent };

      if (emailData && emailData.id) {
        values.id = emailData.id;
        dispatch(editEmail(formData));
        navigate("/email", { replace: true });
      } else {
        dispatch(createEmail(formData));
        navigate("/email", { replace: true });
      }
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
              label="Template Name"
              type="text"
              name="templateName"
              id="templateName"
              placeholder="Enter templateName"
              validation={validation}
            />
            <TextInput
              label="Subject"
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              validation={validation}
            />
            <TextInput
              label="Description"
              type="text"
              name="description"
              id="description"
              placeholder="Enter meta description"
              validation={validation}
            />
            <TextInput
              label="Body Text"
              textarea
              type="textarea"
              name="bodyText"
              id="bodyText"
              placeholder="Enter MetaKey words"
              validation={validation}
            />
            {Object.keys(emailData).length === 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <Select
                  id="type"
                  name="type"
                  options={typeOptions}
                  onChange={(selectedOption) => {
                    validation.setFieldValue("type", selectedOption.value);
                    fetchData({ ...filterParams, type: selectedOption.value });
                  }}
                />
                {validation.touched.type && validation.errors.type && (
                  <div className="text-danger">{validation.errors.type}</div>
                )}
              </div>
            )}

            <div style={{ display: "flex" }}>
              <div style={{ flex: "70%" }}>
                <CKEditor
                  editor={ClassicEditor}
                  data={editorData}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                  }}
                />
              </div>
              <div style={{ flex: "30%", marginLeft: 20 }}>
                <h5>Variables:</h5>
                {variableList.data && variableList.data.rows && (
                  <ul>
                    {variableList.data.rows[0].variables.map(
                      (variable, index) => (
                        <li key={index}>
                          <span
                            style={{
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                          >{`{${variable}}`}</span>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button color="primary" type="submit" className="m-0 mt-4">
                {emailData.id && emailData
                  ? " Update Email Templates"
                  : " Create Email Templates"}
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EmailTemplates;
