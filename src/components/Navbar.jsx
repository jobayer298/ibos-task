import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
   const { user, logout } = useContext(AuthContext);
   const handleLogout = () => {
     logout()
       .then()
       .catch((error) => {
         console.log(error);
       });
   };
    const menu = (
      <>
        <li><Link to="/">Create Task</Link></li>
        <li><Link to="/createTeam">Create Team</Link></li>
      </>
    );
    return (
      <div className="navbar bg-slate-100 sticky top-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu font-medium menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl font-semibold">Task Management</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-medium menu-horizontal px-1">{menu}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div>
              {user && (
                <div className="flex items-center gap-4">
                  {/* <p>{user?.displayName}</p> */}
                  <div
                    className="tooltip tooltip-left"
                    data-tip={user?.displayName}
                  >
                    <img
                      className="  w-[50px] h-[50px] rounded-full "
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary btn-outline"
                  >
                    LogOut
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn btn-sm btn-secondary ">
                <Link to="/login">Login</Link>
              </button>
              <button className="btn ml-2 btn-sm btn-secondary btn-outline">
                <Link to="/register">Register</Link>
              </button>
            </>
          )}
        </div>
      </div>
    );
};

export default Navbar;