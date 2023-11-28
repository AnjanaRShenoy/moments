import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types, no-unused-vars
function App({admin}) {
  return (
    <>      
      {admin ? <Header admin /> : <Header admin={false} />}
        <ToastContainer />
        <Container className="my-2">
          <Outlet />
        </Container>
      
    </>
  );
}

export default App;
