import React from "react";
import Layout from "../../../components/Layout";
import EditServices from "../../../components/artist/EditServices";

export default function ServicesPage(props){
    const pageTitle = "Edit Services"

    return (
        <Layout title={ pageTitle }>
            <EditServices token={props.token} mode="edit"></EditServices>
        </Layout>
    );

}

