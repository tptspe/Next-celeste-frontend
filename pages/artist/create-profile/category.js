import React from "react";
import Layout from "../../../components/Layout";
import EditCategory from "../../../components/artist/EditCategory";
import ProgressBar from "../../../components/common/progress_bar";

export default function SelectCategoryPage(props) {
  const pageTitle = "Select Categories"
  const percent = 67

  return (
    <Layout title={ pageTitle }>

      {/* start progress bar  */}
      <div className="container progress_bar">
        <div className="row">
          <ProgressBar value={percent}></ProgressBar>
        </div>
      </div>
      {/* end progress bar  */}

      <EditCategory token={props.token} mode="create"></EditCategory>
    </Layout>
  );
}