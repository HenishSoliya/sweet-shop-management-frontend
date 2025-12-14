import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import { jwtDecode } from "jwt-decode";

const DashboardRouter = () => {

  const role = jwtDecode(sessionStorage.getItem('authToken')).role;

  switch (role) {
    case "ADMIN":
      return <AdminDashboard />;

    case "USER":
      return <Dashboard />;

    default:
      return <div className="flex justify-center items-center h-screen text-xl">
        Unauthorized
      </div>;
  }
};

export default DashboardRouter;
