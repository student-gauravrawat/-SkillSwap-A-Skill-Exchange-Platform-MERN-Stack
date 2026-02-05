import React from "react";
import {Navbar, Footer, ScrollToTop} from "../all_components/index"
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
       <main className="grow">
          <Outlet />
       </main>
      <Footer/>
    </div>
  );
}

export default MainLayout;
