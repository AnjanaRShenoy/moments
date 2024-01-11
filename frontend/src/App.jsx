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
<<<<<<< HEAD
    <div style={{ position: "relative",backgroundColor:"#f0f0f0", minHeight:"100vh"}}>
      <div
        style={{
          position: "absolute",
          inset: "0",
          zIndex: "-10",
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.80), rgba(255, 255, 255, 0.4)), url("https://t3.ftcdn.net/jpg/03/29/17/78/360_F_329177878_ij7ooGdwU9EKqBFtyJQvWsDmYSfI1evZ.jpg")',
          backgroundSize: "100vw",
          backgroundRepeat: "repeat",
          
          width: "100%",
        }}
      ></div>
      <ToastContainer />
      <div style={{ width: "100%", margin: "0px" }}>
        <div style={{ display: "flex" }}>
          {admin ? <AdminSidebar /> : <UserSidebar />}
          {/* <div style={{width:"200px", border:"2px solid black"}}></div> */}

          <div
            style={{
              flexGrow:"1",
              marginLeft:"240px",
              paddingTop: "20px",
              marginTop: "10px",
              
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
=======
    <Flex flexDirection={{ md: "column", base: "column" }}>
      {admin ? <AdminSidebar /> : <UserSidebar />}
      <ToastContainer />
      <Flex py={10} className="hel" justifyContent={{ base: "space-around" , md:"space-around"}} style={{backgroundColor:"black", minHeight:"100vh"}}>
        <Outlet />
      </Flex>
    </Flex>
>>>>>>> 2d77eba291877a20fe0877d73a93a06c2f0fc125
  );
}

export default App;
