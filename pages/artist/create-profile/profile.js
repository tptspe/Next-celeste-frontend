import React from "react";
import Layout from "../../../components/Layout";
import ProgressBar from "../../../components/common/progress_bar";
import EditProfile from "../../../components/artist/EditProfile";

export default function CreateProfile(props) {
  const percent = 33

  return (
    <Layout title={"Profile"}>
        {/* start progress bar  */}
        <div className="container progress_bar">
        <div className="row">
          <ProgressBar value={percent}></ProgressBar>
        </div>
      </div>
      {/* end progress bar  */}
      <EditProfile token={props.token} mode="create"></EditProfile>
    </Layout>
  );
}