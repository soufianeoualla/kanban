
import { DarkThemeContext } from "../../App";
import { useContext } from "react";

const EditDelete = ({
  type,
  setDeleteModal,
  setEditDelete,
  setAddEditTask,
  setAddEditBoard
}) => {
  const darkTheme = useContext(DarkThemeContext);


  const handleEditButton = () => {
    if (type === "Task") {
      setAddEditTask(true)
      setEditDelete(false)
    } else {
      setAddEditBoard(true)
      setEditDelete(false)

    }
  };

  
  const handleDeleteButton = () => {
    setDeleteModal(true)
    setEditDelete(false)

  };
  return (
    <div
      className={` text-sm flex flex-col items-start w-[192px] h-[94px] p-4  gap-4  absolute  rounded-lg ${
        type === "Task" ? "top-[75px] right-[-70px] sm:right-[-50px]" : "top-20 sm:right-4"
      } ${darkTheme ? ' bg-Charcoal':' bg-white'} `}
    >
      <button onClick={handleEditButton} className=" text-Slate-Blue">
        Edit {type}
      </button>
      <button
        onClick={handleDeleteButton}
        className="text-red"
      >
        Delete {type}
      </button>
    </div>
  );
};

export default EditDelete;
