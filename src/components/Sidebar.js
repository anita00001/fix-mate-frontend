import { useState } from 'react';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import '../styles/sideBar.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../redux/apiConfig';

const Sidebar = () => {
  const [navClose, setNavClosed] = useState(false);

  const displayHideNavbar = () => setNavClosed(!navClose);

  const navLinks = [
    { path: '/', name: 'Experts' },
    { path: '/', name: 'My Reservations' },
    { path: '/', name: 'Reserve an Expert' },
    { path: '/', name: 'Create an Expert' },
    { path: '/', name: 'Delete an Expert' },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.delete(`${baseURL}logout`, {
        headers: {
          Authorization: localStorage.getItem('userPassport'),
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('userPassport');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="closeSidebar sidebarBtn"
        onClick={displayHideNavbar}
      >
        <HiOutlineMenuAlt4 className="text-2xl" />
      </button>
      <div
        className={`sideBar shadow-sm flex h-screen flex-col absolute justify-between border-r
         ${navClose ? 'bg-white' : 'sideBarHidden'}`}
      >
        <button
          type="button"
          className="closeSidebar sidebarBtn"
          onClick={displayHideNavbar}
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <div className="px-4 py-6 mt-6">
          <span className="grid h-20 w-20  place-content-center text-center rounded-lg text-slate-900 text-3xl pl-16">
            FixMate
          </span>

          <nav aria-label="Main Sidebar" className="mt-6 flex flex-col space-y-1">
            {
              navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-2 rounded-lg hover:bg-primary hover:text-white cursor-pointer transition px-4 py-2 text-gray-500"
                >
                  <span className="font-semibold">{link.name}</span>
                </NavLink>
              ))
            }
          </nav>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 flex flex-col items-center gap-2 rounded-lg px-4 py-2 text-gray-500">
          <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2" onClick={handleLogout}>
            <span className="flex flex-row gap-2">
              <CiLogout />
              Logout
            </span>
          </button>
          <a href="https://github.com/anita00001/fix-mate-frontend" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">&copy; FixMate</a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
