import React, { useState, useEffect } from "react";
import { Button, Input, Label, Spinner, Form, FormFeedback } from "reactstrap";
import CommonModal from "../../Components/Common/CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { updateState } from "../../slices/users/reducer";

const AddForm = () => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);

  const { insersUser } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (!fetchingData && insersUser.formOpen) {
      setFetchingData(true);
    }
  }, [dispatch,  insersUser]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      agents: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Topic Name"),
      description: Yup.string().required("Please Enter Topic description"),
    }),
    onSubmit: (values) => {

    },
  });

  return (
    <>
     
      <CommonModal
        isPopupOpen={insersUser.formOpen}
        // lg ,sm,xl
        modalSize={"md"}
        closeModal={() => dispatch(updateState({ formOpen: false }))}
        closeTitle=""
        modelTitle="Add New Topic"
        modalBody={
          <Form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-3">
              <Label htmlFor="name" className="col-lg-12">
                Topic Name
              </Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                invalid={validation.touched.name && !!validation.errors.name}
                value={validation.values.name}
                onBlur={validation.handleBlur}
                id="name"
                className="mb-1"
                placeholder="Enter Topic Name"
              />
              {validation.touched.name && validation.errors.name ? (
                <FormFeedback type="invalid">
                  {validation.errors.name}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3">
              <Label htmlFor="name" className="col-lg-12">
                Description
              </Label>
              <Input
                type="text"
                onChange={validation.handleChange}
                invalid={
                  validation.touched.description &&
                  !!validation.errors.description
                }
                value={validation.values.description}
                onBlur={validation.handleBlur}
                id="description"
                className="mb-1"
                placeholder="Enter Topic Description"
              />
              {validation.touched.description &&
              validation.errors.description ? (
                <FormFeedback type="invalid">
                  {validation.errors.description}
                </FormFeedback>
              ) : null}
            </div>
            <div className="modal-footer p-0">
              <Button
                disabled={
                  insersUser.loading ||
                  !validation.isValid ||
                  !validation.dirty ||
                  selectedOptions.length === 0
                }
                color="primary"
                type="submit"
                className="m-0 mt-4"
              >
                {insersUser.loading ? (
                  <>
                    <Spinner size="sm" className="me-0"></Spinner> Adding...
                  </>
                ) : (
                  <>
                    <i className=" ri-add-fill"></i> Add
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

export default AddForm;
