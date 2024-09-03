import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getBackupList } from "../../slices/thunks";

const BackupSetting = () => {
  const dispatch = useDispatch();
  const [, setFetchingData] = useState(false);

  const { backup } = useSelector((state) => state.category);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setFetchingData(true);
    dispatch(getBackupList());
  };

  const openBackupUrlInNewTab = () => {
    const backupUrl = backup.backupUrls.backupUrl;
    if (backupUrl) {
      window.open(backupUrl, "_blank");
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
      {backup.backupUrls && backup.backupUrls.backupUrl && (
        <Button
          className="picker-margin"
          color="primary"
          onClick={openBackupUrlInNewTab}
        >
          Open Backup URL
        </Button>
      )}
    </React.Fragment>
  );
};

export default BackupSetting;
