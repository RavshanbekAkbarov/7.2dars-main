import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { MdAddCircle } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";

function Siedbar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="bg-violet-400 h-screen w-[400px]  text-white flex flex-col">
      <Avatar user={user} />
      <ul className="flex flex-col pl-10 mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl ${
                isActive ? "bg-white text-black" : ""
              }`
            }
          >
            <span className="flex items-center gap-2">
              <GoProjectRoadmap className="text-2xl" />
              Projects
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl ${
                isActive ? "bg-white text-black" : ""
              }`
            }
          >
            <span className="flex items-center gap-2">
              <MdAddCircle className="text-2xl" />
              Create
            </span>
          </NavLink>
        </li>
      </ul>
      <div className="mb-10 flex justify-center">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Siedbar;
