import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import AdminSidebar from "./components/adminComponents/AdminSidebar";
import UserSidebar from "./components/userComponents/UserSidebar";

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({ admin }) {
  return (
    <Flex flexDirection={{ md: "column", base: "column" }}>
      {admin ? <AdminSidebar /> : <UserSidebar />}
      <ToastContainer />
      <Flex py={10} className="hel" justifyContent={{ base: "space-around" , md:"space-around"}} style={{backgroundColor:"black", minHeight:"100vh"}}>
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default App;
