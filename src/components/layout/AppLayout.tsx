import { Outlet } from "react-router";
import Header from "./Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
