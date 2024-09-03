import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TextInput from "../../../common/textInput";
import { Button, Form, Container } from "reactstrap";
import { editPost, createPost } from "../../../slices/post/thunk";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const formRef = React.useRef(null);

  const { updatePost } = useSelector((state) => state.post);
  const postData = updatePost.singlePost;

  const [editorData, setEditorData] = useState(postData && postData.content);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postData && postData.title,
      metaTitle: postData && postData.metaTitle,
      metaDescription: postData && postData.metaDescription,
      metaKeywords: postData && postData.metaKeywords,
      postCategoryId: "1",
      postTypeId: "1",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter title"),
      metaTitle: Yup.string().required("Please Enter metaTitle"),
      metaDescription: Yup.string().required("Please Enter metaDescription"),
      metaKeywords: Yup.string().required("Please Enter metaKeywords"),
    }),

    onSubmit: (values) => {
      const editorContent = editorData;
      const formattedEditorContent = `${editorContent}`;
      const formData = { ...values, content: formattedEditorContent };

      if (postData && postData.postId) {
        values.postId = postData.postId;
        dispatch(editPost(values));
      } else {
        dispatch(createPost(formData));
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
              label="Title"
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              validation={validation}
            />
            <TextInput
              label="Meta Title"
              type="text"
              name="metaTitle"
              id="metaTitle"
              placeholder="Enter meta title"
              validation={validation}
            />
            <TextInput
              label="Meta Description"
              type="text"
              name="metaDescription"
              id="metaDescription"
              placeholder="Enter meta description"
              validation={validation}
            />
            <TextInput
              label="Meta Keywords"
              type="text"
              name="metaKeywords"
              id="metaKeywords"
              placeholder="Enter MetaKey words"
              validation={validation}
            />
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              onChange={(event, editor) => {
                const data = editor.getData();
                setEditorData(data);
              }}
            />
            <Button color="primary" type="submit" className="m-0 mt-4">
              Post
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdatePost;
