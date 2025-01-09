import { Outlet } from "react-router-dom";
import Siedbar from "../components/Siedbar";
import OnlineUsersr from "../components/OnlineUsersr";

function MainLayout() {
  return (
    <div className="flex justify-between">
      <Siedbar />
      <main className="w-full bg-stone-200  text-black">
        <Outlet />
      </main>
      <OnlineUsersr />
    </div>
  );
}

export default MainLayout;
