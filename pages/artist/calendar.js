import React from "react";
import Layout from "../../components/Layout";

export default function CalendarPage(props) {
  const pageTitle = "Calendar"

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