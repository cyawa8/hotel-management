import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useUser } from "../features/authentication/useUser";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  const { isAuthenticated } = useUser();

  // Jika user tidak terautentikasi, redirect ke login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />
    </Row>
    <DashboardLayout />
    </>
  );
}

export default Dashboard;
