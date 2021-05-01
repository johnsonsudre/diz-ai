import React from "react";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <div className="static mt-40 mb-20">
      <Header />
      <div className="mx-auto start container grid grid-cols-1 gap-2 place-content-between">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
