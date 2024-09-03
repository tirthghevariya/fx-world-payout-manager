import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import CommonDataTable from "../../../common/DataTable";
import { PostColumns } from "../../../Components/Common/columnsConfig";
import { updatePostStates } from "../../../slices/post/reducer";
import {
  getPostList,
  deletePost,
  deleteBulkPost,
} from "../../../slices/post/thunk";

const Post = () => {
  const dispatch = useDispatch();
  const [fetchingData, setFetchingData] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const { filterParams, postList } = useSelector((state) => state.post);

  useEffect(() => {
    fetchData(filterParams);
  }, [filterParams]);

  const fetchData = (filterParams) => {
    setFetchingData(true);
    dispatch(getPostList(filterParams));
  };

  const onDeleteClick = (event, postId) => {
    event.preventDefault();
    dispatch(deletePost(postId));
  };

  const columns = PostColumns({
    dispatch,
    updatePostStates,
    onDeleteClick,
  });

  const handleBulkDelete = () => {
    const postIds = selectedRows.map((row) => row.postId);
    if (postIds.length > 0) {
      const payload = {
        postIds: postIds,
      };
      dispatch(deleteBulkPost(payload));
      setSelectedRows([]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title={"Update Employee Permission"}
            pageTitle="Permission"
          />
        </Container>
      </div>

      <div className="table-container">
        <CommonDataTable
          columns={columns}
          fetchData={fetchData}
          from="permission"
          searchEnable={true}
          filterParams={filterParams}
          data={postList.data && postList.data.rows}
          totalRows={(postList.data && postList.data.count) || 0}
          loading={fetchingData && postList.length === 0}
          showAddButton={true}
          addOnClickMethod={() => {
            window.location.href = "/create/post";
          }}
          showExportButton={true}
          exportFileName="PermissionData"
          checkboxEnabled={true}
          bulkSelected={(selectedRows) => setSelectedRows(selectedRows)}
          bulkDelete={handleBulkDelete}
          selectedRows={selectedRows}
        />
      </div>
    </React.Fragment>
  );
};

export default Post;
