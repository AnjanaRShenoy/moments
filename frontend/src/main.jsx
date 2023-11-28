import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { ChakraProvider } from "@chakra-ui/react";

import LoginScreen from "./screens/user/LoginScreen.jsx";
import RegisterScreen from "./screens/user/RegisterScreen.jsx";
import HomeScreen from "./screens/user/HomeScreen.jsx";
import ProfileScreen from "./screens/user/ProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PrivateRouteAdmin from "./components/PrivateRouteAdmin.jsx";
import LoginAdmin from "./screens/admin/LoginAdmin.jsx";
import HomeAdmin from "./screens/admin/HomeAdmin.jsx";
import AdminCreateUser from "./screens/admin/AdminCreateUser.jsx";
import AdminEditUser from "./screens/admin/AdminCreateUser.jsx";
import Hero from "./components/Hero.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    
    {/* user side routes */}

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/" element={<App admin={false} />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
      </Route>

    {/* Admin side routes */}

      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/" element={<App admin />}>
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
        <Route path="/admin/edit-user/:user" element={<AdminEditUser />} />
        <Route path="" element={<PrivateRouteAdmin />}>
          <Route path="/admin/" element={<HomeAdmin />} >
            <Route path="/admin/test" element={<Hero/>}>

            </Route>
          </Route>
        </Route>
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
);
