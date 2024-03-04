import { useDispatch } from "react-redux";
import { deleteBoard, deleteTask } from "../../redux/BoardSlice";
import { useContext } from "react";
import { DarkThemeContext } from "../../App";

const DeleteModal = ({
  selectedBoard,
  type,
  selectedTask,
  taskIndex,
  colIndex,
  setViewTask,
  setDeleteModal,
}) => {
  const dispatch = useDispatch();
  const darkTheme = useContext(DarkThemeContext);

  const handleDelete = () => {
    if (type === "Task") {
      dispatch(deleteTask({ selectedBoard, colIndex, taskIndex }));
      setDeleteModal(false);
      setViewTask(false);
    } else dispatch(deleteBoard(selectedBoard));
    setDeleteModal(false);
  };
  const name = type === "Task" ? selectedTask : selectedBoard.name;
  const selectedType = type === "Task" ? "task" : "board";

  return (
    <>
      <div
        onClick={() => setDeleteModal(false)}
        className="fixed bg-black bg-opacity-30 inset-0 w-full h-full z-10"
      ></div>
      <div
        className={`h-[229px] w-[480px] p-8 fixed top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] rounded-md z-20 flex flex-col justify-between ${
          darkTheme ? "bg-black" : "bg-white"
        } sm:w-[80%] sm:h-[284px]  `}
      >
        <h1 className="text-red text-xl ">Delete this {type}?</h1>
        <p className="text-sm text-Slate-Blue font-medium">
          Are you sure you want to delete the ‘{name}’ {selectedType}? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex justify-center items-center gap-4 w-full sm:flex-col">
          <button
            onClick={handleDelete}
            className="w-full h-[40px] rounded-3xl bg-red text-white text-sm  hover:bg-opacity-70"
          >
            Delete
          </button>

          <button
            onClick={() => setDeleteModal(false)}
            className={`w-full h-[40px] rounded-3xl text-purple  text-sm ${
              darkTheme
                ? "bg-white"
                : "bg-purple bg-opacity-10 hover:bg-opacity-50"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
