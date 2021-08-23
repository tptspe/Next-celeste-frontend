import React from "react";
import Layout from "../../../components/Layout";
import EditPolicies from "../../../components/artist/EditPolicies";

export default function PoliciesPage(props) {
    const pageTitle = "Edit Policies"

    return (
        <Layout title={ pageTitle }>
        <EditPolicies token={props.token} mode="edit"></EditPolicies>
        </Layout>
    );
}
