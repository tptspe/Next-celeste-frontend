import React from "react";
import Layout from "../../../components/Layout";
import ProgressBar from "../../../components/common/progress_bar";
import EditPolicies from "../../../components/artist/EditPolicies";

export default function PoliciesPage(props) {
  const pageTitle = "Create Policies"
  const percent = 10

  return (
    <Layout title={ pageTitle }>
        {/* start progress bar  */}
        <div className="container progress_bar">
        <div className="row">
          <ProgressBar value={percent}></ProgressBar>
        </div>
      </div>
      {/* end progress bar  */}
      <EditPolicies token={props.token} mode="create"></EditPolicies>
    </Layout>
  );
}
