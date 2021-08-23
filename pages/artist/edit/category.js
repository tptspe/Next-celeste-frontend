import React from "react";
import Layout from "../../../components/Layout";
import EditCategory from "../../../components/artist/EditCategory";

export default function EditCategoryPage(props) {
  const pageTitle = "Edit Categories"

    return (
      <Layout title={ pageTitle }>
        <EditCategory token={props.token} mode="edit"></EditCategory>
      </Layout>
    );
}
