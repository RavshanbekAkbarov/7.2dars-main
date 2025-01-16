import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { MdAddCircle } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { Button } from "./Button";
// import { useThemeToggle } from "../hooks/useThemeToggle";

function Siedbar() {
  const { logout } = useLogout();
  // const { ChangeTheme, theme } = useThemeToggle();
  const { user, isPending } = useSelector((store) => store.user);
  return (
    <div className="bg-violet-400 w-[400px] min-h-screen    text-white flex flex-col">
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
      <label className="flex cursor-pointer gap-2 mb-5 justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <input
          // onChange={ChangeTheme}
          // defaultChecked={theme == "dracula"}
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <div className="mb-10 flex justify-center">
        <Button
          type="primary"
          onClick={logout}
          loading={isPending}
          className="bg-indigo-600 font-bold py-3 px-16 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Siedbar;
