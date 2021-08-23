import React from "react";
import Layout from "../../../components/Layout";
import EditWorkPhotos from "../../../components/artist/EditWorkPhotos";

export default function EditWorkPhotoPage(props) {
  const pageTitle = "Edit Work Photos"

  return (
    <Layout title={ pageTitle }>
      <EditWorkPhotos token={props.token} mode="edit"></EditWorkPhotos>
    </Layout>
  );

}