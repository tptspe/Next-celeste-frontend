import React from "react";
import Layout from "../../components/Layout";

export default function ArtistDashboardPage(props) {
  const pageTitle = "Artist Dashboard"

    return (
        <Layout title={ pageTitle }>
            <div className="profile">
                <div className="container">
                    <h1> { pageTitle }</h1>
                </div>
            </div>
        </Layout>
    );
}