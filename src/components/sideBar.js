import { HiOutlineMenuAlt4 } from 'react-icons/hi';

const Sidebar = () => (
  <>
    <button
      type="button"
      className="fixed top-5 left-5 text-base z-30"
    >
      <HiOutlineMenuAlt4 className="text-2xl" />
    </button>
    <div className="sideBar flex h-screen flex-col absolute justify-between border-r bg-white" />
  </>
);
export default Sidebar;
