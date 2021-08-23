import React from "react";
import Layout from "../../../components/Layout";
import EditServices from "../../../components/artist/EditServices";

export default function ServicesPage(props){
    return (
        <Layout title={"Services"}>
          <EditServices token={props.token} mode="create"></EditServices>
        </Layout>
    );
}

