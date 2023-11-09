import { useState } from 'react';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import '../../styles/sideBar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutDetails } from '../../redux/logout/logoutSlice';
import navLinks from './index';

const Sidebar = () => {
  const [navClose, setNavClosed] = useState(false);
  const navigate = useNavigate();
  const displayHideNavbar = () => setNavClosed(!navClose);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const userObject = sessionStorage.getItem('userPassport');
  const jsonObject = JSON.parse(userObject);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatch(logoutDetails());
      sessionStorage.removeItem('userPassport');
      navigate('/authenticate');
      window.location.reload();
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
          className="sidebarBtn close"
          onClick={displayHideNavbar}
          aria-label={navClose ? 'Close Sidebar' : 'Open Sidebar'}
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        <div className="mt-3 px-2 py-2">
          <div className="text-center font-bold text-primary">
            <span className="mr-1 text-black">Welcome back </span>
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
            className="shadow-lghover:bg-gradient-to-br mb-2 w-[60%] rounded-lg bg-primary bg-gradient-to-r py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-lime-300 dark:shadow-lg dark:shadow-lime-800/80 dark:focus:ring-lime-800"
            onClick={handleLogout}
          >
            <span className="flex flex-row items-center justify-center gap-2">
              <CiLogout />
              Logout
            </span>
          </button>
          <a
            href="https://github.com/anita00001/fix-mate-frontend"
            className="mb-2 "
          >
            &copy; FixMate
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
