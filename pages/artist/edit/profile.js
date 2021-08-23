import React from "react";
import Layout from "../../../components/Layout";
import EditProfile from "../../../components/artist/EditProfile";

export default function CreateProfile(props) {
  const pageTitle = "Edit Profile"

  return (
    <Layout title={ pageTitle }>
      <EditProfile token={props.token} mode="edit"></EditProfile>
    </Layout>
  );
}