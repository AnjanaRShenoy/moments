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
import CreateScreen from "./screens/user/CreateScreen.jsx";
import PrivateRoute from "./components/userComponents/PrivateRoute.jsx";
import SavedPostScreen from "./screens/user/SavedPost.jsx";
import FullProfile from "./screens/user/FullProfile.jsx";
import UserProfile from "./screens/user/UserProfile.jsx";

import PrivateRouteAdmin from "./components/adminComponents/PrivateRouteAdmin.jsx";
import LoginAdmin from "./screens/admin/LoginAdmin.jsx";
import HomeAdmin from "./screens/admin/HomeAdmin.jsx";
import AdminCreateUser from "./screens/admin/AdminCreateUser.jsx";
import AdminEditUser from "./screens/admin/AdminCreateUser.jsx";
import AdminUserManagement from "./screens/admin/AdminUserManagement.jsx";
import PostManagement from "./screens/admin/PostManagement.jsx";
import CommentManagement from "./screens/admin/CommentManagement.jsx";
import NotificationScreen from "./screens/user/NotificationScreen.jsx";

import { ToastContainer } from "react-bootstrap";
import Room from "./screens/user/Room.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* user side routes */}

      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/" element={<App admin={false} />}>
        <Route path="" element={<PrivateRoute />}>
          <Route index={true} path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/savedPost" element={<SavedPostScreen />} />
          <Route path="/fullProfile" element={<FullProfile />} />
          <Route path="/userProfile/:profileId" element={<UserProfile />} />
          <Route path="/notification" element={<NotificationScreen />} />
          <Route path="/room/:roomId" element={<Room/>}/>
        </Route>
      </Route>

      {/* Admin side routes */}

      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/" element={<App admin />}>
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
        <Route path="/admin/edit-user/:user" element={<AdminEditUser />} />
        <Route path="" element={<PrivateRouteAdmin />}>
          <Route path="/admin/" element={<HomeAdmin />} />
          <Route
            path="/admin/userManagement"
            element={<AdminUserManagement />}
          />
          <Route path="/admin/postManagement" element={<PostManagement />} />
          <Route
            path="/admin/commentManagement"
            element={<CommentManagement />}
          />
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
