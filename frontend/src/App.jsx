import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import AdminSidebar from "./components/adminComponents/AdminSidebar";
import UserSidebar from "./components/userComponents/UserSidebar";

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({ admin }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inset: "0",
          zIndex: "-10",
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.4)), url("")',
          backgroundSize: "100vw",
          backgroundRepeat: "repeat",
          width: "100%",
        }}
      ></div>
      <ToastContainer />
      <div style={{ width: "100%", margin: "0px" }}>
        <Box display={{ md: "flex" }}>
          {admin ? <AdminSidebar /> : <UserSidebar />}

          <div
            style={{
              margin: "0px auto",
              paddingTop: "20px",
              marginTop: "10px",
            }}
          >
            <Outlet />
          </div>
        </Box>
      </div>
    </div>
  );
}

export default App;
