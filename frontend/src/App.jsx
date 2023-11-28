import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/UserSidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";
import SidebarWithHeader from "./components/AdminSidebar";

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({ admin }) {
  return (
    <>
      <ToastContainer />
      <div style={{ width: "100%", margin: "0px" }}>
        <div style={{ display: "flex" }}>
          {admin ? <SidebarWithHeader /> : <Header />}
          <div style={{margin:"0px auto", paddingTop:"20px",marginTop:'10px'}}>
          
            <Outlet />
          
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
