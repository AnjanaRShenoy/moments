import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCheckUserBlockedQuery } from "../../slices/userApiSlice";
import BlockedModal from "./BlockedModal";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, refetch } = useCheckUserBlockedQuery({ _id: userInfo?._id });

  return (
    // userInfo ? <Outlet /> : <Navigate to="/login" replace />;
    data && data.Blocked ? (
      <BlockedModal />
    ) : userInfo ? (
      <Outlet />
    ) : (
      <Navigate to="/login" replace />
    )
  );
};

export default PrivateRoute;
