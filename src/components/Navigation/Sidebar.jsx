import { useState } from 'react';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import '../../styles/sideBar.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../redux/apiConfig';
import navLinks from './index';

const Sidebar = () => {
  const userObject = localStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);
  const [navClose, setNavClosed] = useState(false);

  const displayHideNavbar = () => setNavClosed(!navClose);
  const [error, setError] = useState('');
  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${baseURL}logout`, {
        headers: {
          Authorization: jsonObject.token,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('userPassport');
        window.location.href = '/login';
      }
    } catch (error) {
      setError('Logout failed');
    }
  };

  return (
    <>
      {error}
      <button
        type="button"
        className="closeSidebar sidebarBtn"
        onClick={displayHideNavbar}
        aria-label={navClose ? 'Open Sidebar' : 'Close Sidebar'}
      >
        <HiOutlineMenuAlt4 className="text-2xl" />
      </button>
      <div
        className={`sideBar absolute flex h-screen flex-col justify-between border-r shadow-sm
         ${navClose ? 'bg-white' : 'sideBarHidden'}`}
      >
        <button
          type="button"
          className="closeSidebar sidebarBtn"
          onClick={displayHideNavbar}
          aria-label={navClose ? 'Close Sidebar' : 'Open Sidebar'}
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <div className="mt-3 px-2 py-2">
          <div className="font-bold text-primary">
            <span className="text-black">Welcome back </span>
            {jsonObject.name}
          </div>
          <span className="grid h-20 w-20  place-content-center rounded-lg pl-16 text-center text-3xl text-slate-900">
            FixMate
          </span>

          <nav
            aria-label="Main Sidebar"
            className="mt-6 flex flex-col space-y-1"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-gray-500 transition hover:bg-primary hover:text-white"
              >
                <span className="font-semibold">{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="sticky inset-x-0 bottom-0 flex flex-col items-center gap-2 rounded-lg border-t border-gray-100 px-4 py-2 text-gray-500">
          <button
            type="button"
            className="mb-2 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 px-5 py-2.5 text-center text-sm font-medium text-gray-900 shadow-lg shadow-lime-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800"
            onClick={handleLogout}
          >
            <span className="flex flex-row gap-2">
              <CiLogout />
              Logout
            </span>
          </button>
          <a
            href="https://github.com/anita00001/fix-mate-frontend"
            className="mb-2 rounded-lg bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-cyan-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:shadow-lg dark:shadow-cyan-800/80 dark:focus:ring-cyan-800"
          >
            &copy; FixMate
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
