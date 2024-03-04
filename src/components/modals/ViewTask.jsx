import check from "../assets/icon-check.svg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContext, useState } from "react";
import EditDelete from "./EditDelete";
import DeleteModal from "./DeleteModal";
import { FaEllipsisVertical } from "react-icons/fa6";
import AddEditTask from "./AddEditTask";
import { useDispatch } from "react-redux";
import { setTaskStatus, subtaskCompleted } from "../../redux/BoardSlice";
import { DarkThemeContext } from "../../App";
const ViewTask = ({
  title,
  desc,
  subtasks,
  taskIndex,
  colIndex,
  selectedBoard,
  taskStatus,
  setViewTask,
}) => {
  const [status, setStatus] = useState();
  const [addEditTask, setAddEditTask] = useState();
  const [editDelete, setEditDelete] = useState();
  const [deleteModal, setDeleteModal] = useState();
  const darkTheme = useContext(DarkThemeContext);
console.log(selectedBoard)
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  const isCompleted = subtasks.filter((item) => item.isCompleted === true);

  const isChecked = (subtaskTitle) => {
    return isCompleted.some((item) => item.title === subtaskTitle);
  };
  const handleSubtaskStatus = (subtaskIndex) => {
    dispatch(
      subtaskCompleted({ selectedBoard, colIndex, taskIndex, subtaskIndex })
    );
  };
  const handleOnclose = () => {
    setViewTask(false);
    dispatch(setTaskStatus({ selectedBoard, colIndex, taskIndex, status }));
  };

  return (
    <>
      <div
        onClick={handleOnclose}
        className="fixed bg-black bg-opacity-30 inset-0 w-full h-full z-10"
      ></div>
      <div
        className={` p-8 rounded-lg w-[480px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 sm:w-[80%] ${
          darkTheme ? "bg-Dark-Charcoal-Gray" : "bg-white"
        } `}
      >
        <div className="flex justify-between items-center">
          <h1
            className={`text-xl mb-5 w-[95%] leading-relaxed ${
              darkTheme ? "text-white" : "text-black"
            }`}
          >
            {selectedBoard.columns[colIndex].tasks[taskIndex].title}
          </h1>
          <div
            onClick={() => setEditDelete(!editDelete)}
            className={`w-6 h-3 flex justify-center items-center text-Slate-Blue text-2xl ${
              darkTheme ? "hover:text-white" : "hover:text-purple "
            }`}
          >
            <FaEllipsisVertical />
          </div>
        </div>
        <p className=" text-Slate-Blue text-sm mb-4">{desc}</p>
        <span
          className={`  text-xs ${
            darkTheme ? "text-white" : "text-Slate-Blue"
          }`}
        >
          Subtasks ({isCompleted.length} of {subtasks.length})
        </span>

        <div>
          {subtasks.map((task, index) => (
            <div
              onClick={() => handleSubtaskStatus(index)}
              key={task.title}
              className={` mt-2 flex items-center gap-4 p-4  text-xs rounded-md ${
                darkTheme &&
                isChecked(task.title) &&
                "bg-Charcoal text-Slate-Blue line-through "
              } 
              
              ${
                darkTheme &&
                !isChecked(task.title) &&
                "text-white hover:bg-Charcoal"
              } ${
                isChecked(task.title) &&
                !darkTheme &&
                " text-Slate-Blue line-through bg-Light-Blue-Gray "
              } ${
                !isChecked(task.title) &&
                !darkTheme &&
                "text-black hover:bg-Light-Blue-Gray  "
              } `}
            >
              <div
                className={`w-4 h-4 rounded-sm flex justify-center items-center border border-Slate-Blue ${
                  isChecked(task.title) && "bg-purple"
                }`}
              >
                {isChecked(task.title) && <img src={check} alt="" />}
              </div>
              <p>{task.title}</p>
            </div>
          ))}
        </div>

        <span className=" text-Slate-Blue text-xs ">Current Status</span>
        <div className="w-full ">
          <FormControl sx={{ mt: 1, minWidth: 1, borderRadius: 2 }}>
            <Select
              sx={{ color: darkTheme ? "white" : "black" }}
              className={`h-10 border outline-none   text-white ${
                darkTheme ? "border-white" : "border-Light-Blue-Gray"
              } `}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth "
              value={status}
              onChange={handleChange}
              autoWidth
              defaultChecked={taskStatus}
              defaultValue={taskStatus}
            >
              {selectedBoard.columns.map((col) => (
                <MenuItem
                  className={`w-[416px] `}
                  style={{ color: "white !important" }}
                  key={col.name}
                  value={col.name}
                >
                  {col.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {editDelete && (
          <EditDelete
            type={"Task"}
            setEditDelete={setEditDelete}
            setDeleteModal={setDeleteModal}
            setAddEditTask={setAddEditTask}
          />
        )}
      </div>

      {deleteModal && (
        <DeleteModal
          taskIndex={taskIndex}
          colIndex={colIndex}
          type={"Task"}
          selectedTask={title}
          setViewTask={setViewTask}
          selectedBoard={selectedBoard}
          setDeleteModal={setDeleteModal}
        />
      )}

      {addEditTask && (
        <AddEditTask
          currentTitle={title}
          currentDescription={desc}
          currentsubtasks={subtasks}
          type={"edit"}
          selectedBoard={selectedBoard}
          taskStatus={taskStatus}
          colIndex={colIndex}
          taskIndex={taskIndex}
          setViewTask={setViewTask}
          setAddEditTask={setAddEditTask}
        />
      )}
    </>
  );
};

export default ViewTask;
