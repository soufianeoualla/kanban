import logo_dark from "./assets/logo-dark.svg";
import logo_light from "./assets/logo-light.svg";
import { FaEllipsisVertical } from "react-icons/fa6";
import AddEditBoard from "./modals/AddEditBoard";
import DeleteModal from "./modals/DeleteModal";
import EditDelete from "./modals/EditDelete";
import AddEditTask from "./modals/AddEditTask";
import { FaPlus } from "react-icons/fa6";
import { DarkThemeContext } from "../App";
import { useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
const Header = ({ hideSidebar, selectedBoard, setMobileMenu, mobileMenu }) => {
  const [addEditBoard,setAddEditBoard]=useState()
  const [deleteModal, setDeleteModal] = useState();
  const [editDelete, setEditDelete] = useState();
  const [addEditTask, setAddEditTask] = useState();
  const darkTheme = useContext(DarkThemeContext);

  return (
    <header
      className={` h-24 flex justify-between items-center border-b z-20   relative ${
        darkTheme
          ? "bg-Dark-Charcoal-Gray border-Charcoal-Blue"
          : "bg-white border-Powder-Blue"
      }`}
    >
      <div className="flex items-center gap-6 px-6 h-full">
        {hideSidebar && (
          <div
            className={`logo pr-6 h-full flex justify-start items-center border-r  ${
              darkTheme ? "border-r-Charcoal-Blue" : "border-Powder-Blue"
            }`}
          >
            <img src={darkTheme ? logo_light : logo_dark} alt="" />
          </div>
        )}
        <h1
          onClick={() => setMobileMenu(!mobileMenu)}
          className={` flex items-center gap-4 text-2xl ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          {selectedBoard && selectedBoard.name}
          <FaChevronDown
            className={`text-xl hidden sm:block ${mobileMenu && "rotate-180"}`}
          />
        </h1>
      </div>
      <div className="flex justify-between items-center px-6 gap-4">
        <button
          disabled={selectedBoard && selectedBoard.columns.length === 0}
          onClick={() => setAddEditTask(true)}
          className="h-12 w-[164px] text-lg text-white bg-purple rounded-3xl hover:bg-opacity-70 disabled:bg-opacity-20 disabled:cursor-not-allowed sm:hidden "
        >
          {" "}
          + Add New Task{" "}
        </button>
        <button
          disabled={selectedBoard && selectedBoard.columns.length === 0}
          onClick={() => setAddEditTask(true)}
          className="h-8 w-12 justify-center items-center text-lg text-white bg-purple rounded-3xl hover:bg-opacity-70 disabled:bg-opacity-20 disabled:cursor-not-allowed hidden sm:flex  "
        >
          <FaPlus />
        </button>
        <button
          onClick={() => setEditDelete(!editDelete)}
          className={`w-6 h-3 flex justify-center items-center text-Slate-Blue text-2xl ${
            darkTheme ? "hover:text-white" : "hover:text-purple "
          }`}
        >
          <FaEllipsisVertical />
        </button>
        {editDelete && (
          <EditDelete
            type={"Board"}
            setDeleteModal={setDeleteModal}
            setEditDelete={setEditDelete}
            setAddEditBoard={setAddEditBoard}
          />
        )}
      </div>
      {addEditBoard && (
        <AddEditBoard selectedBoard={selectedBoard} type={"edit"} setAddEditBoard={setAddEditBoard} />
      )}
      {deleteModal && (
        <DeleteModal
          selectedBoard={selectedBoard}
          type={"Board"}
          setDeleteModal={setDeleteModal}
        />
      )}
      {addEditTask && (
        <AddEditTask
          type={"create"}
          selectedBoard={selectedBoard}
          setAddEditTask={setAddEditTask}
        />
      )}
    </header>
  );
};

export default Header;
