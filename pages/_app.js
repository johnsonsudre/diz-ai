import React from "react";
import Layout from "../components/Layout";
import "../css/styles.css";

const AppDiz = (props) => {
  return (
    <Layout>
      <props.Component {...props.pageProps} />
    </Layout>
  );
};

export default AppDiz;
