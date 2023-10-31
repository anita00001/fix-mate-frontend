import { useState } from 'react';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import '../styles/sideBar.css';
import { NavLink } from 'react-router-dom';

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

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 flex items-center  gap-2 rounded-lg  px-4 py-2 text-gray-500 ">
          <a href="https://github.com/anita00001/fix-mate-frontend" className="text-gray-500 font-semibold px-4">&copy; FixMate</a>
        </div>

      </div>
    </>
  );
};
export default Sidebar;
