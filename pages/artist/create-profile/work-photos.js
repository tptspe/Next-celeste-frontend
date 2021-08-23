import React from "react";
import Layout from "../../../components/Layout";
import EditWorkPhotos from "../../../components/artist/EditWorkPhotos";
import ProgressBar from "../../../components/common/progress_bar";

export default function WorkPhotoPage(props) {
  const percent = 67

  return (
    <Layout title={"Work Photos"}>
      {/* start progress bar  */}
      <div className="container progress_bar">
        <div className="row">
          <ProgressBar value={percent}></ProgressBar>
        </div>
      </div>
      {/* end progress bar  */}
      <EditWorkPhotos token={props.token} mode="create"></EditWorkPhotos>
    </Layout>
  );

}