import { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cross from "../assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../redux/BoardSlice";
import { DarkThemeContext } from "../../App";
const AddEditTask = ({
  type,
  selectedBoard,
  currentTitle,
  currentDescription,
  currentsubtasks,
  taskStatus,
  colIndex,
  taskIndex,
  setAddEditTask,
}) => {
  const darkTheme = useContext(DarkThemeContext);
  const [errorTitle, setErrorTitle] = useState();
  const [errorSubtask, setErrorSubtask] = useState();
  const [title, setTitle] = useState();
  const [status, setStatus] = useState(
    type === "edit" ? taskStatus : selectedBoard.columns[0].name
  );
  const [placeholder,setPlaceholder]=useState(["e.g. Make coffee","e.g. Drink coffee & smile",])
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
  ]);
  const [description, setDescription] = useState();
  useEffect(() => {
    if (type === "edit") {
      setTitle(currentTitle);
      setDescription(currentDescription);
      setSubtasks(
        currentsubtasks.map((task) => {
          return { ...task, id: uuidv4() };
        })
      );
    }
  }, [currentDescription, currentTitle, currentsubtasks, type]);
  const dispatch = useDispatch();
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleAddSubtask = () => {
    setSubtasks((prev) => [
      ...prev,
      {
        title: "",
        isCompleted: false,
        id: uuidv4(),
      },
    ]);
  };
  const handleRemoveSubtask = (id) => {
    setSubtasks((prev) => prev.filter((task) => task.id !== id));
  };
  const handleOnchange = (id, newValue) => {
    setSubtasks((prev) => {
      const newState = [...prev];
      const subtask = newState.find((task) => task.id === id);
      subtask.title = newValue;
      return newState;
    });
  };
  const validate = () => {
    let titleError = "";
    let subtaskError = false;

    if (!title) {
      titleError = "Title can't be empty";
      setErrorTitle(titleError);
      return false;
    } else setErrorTitle("");

    const emptySubtasks = subtasks.filter(
      (subtask) => subtask.title.trim() === ""
    );
    if (emptySubtasks.length > 0) {
      subtaskError = true;
      setErrorSubtask(subtaskError ? "Subtask can't be empty" : "");
      return false;
    }

    return true;
  };

  const handleOnSubmit = () => {
    const isValid = validate();

    if (isValid) {
      if (type === "create") {
        dispatch(
          addTask({ selectedBoard, status, title, description, subtasks })
        );
        setAddEditTask(false);
      } else {
        dispatch(
          editTask({
            selectedBoard,
            colIndex,
            taskIndex,
            status,
            title,
            description,
            subtasks,
          })
        );
        setAddEditTask(false);
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setAddEditTask(false)}
        className="fixed bg-black bg-opacity-30 inset-0 w-full h-full z-10"
      ></div>
      <div
        className={` p-8 rounded-lg w-[480px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 sm:w-[80%]  ${
          darkTheme ? "bg-Dark-Charcoal-Gray" : "bg-white"
        }`}
      >
        <h1
          className={`text-xl mb-5 leading-relaxed ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          {type === "edit" ? "Edit" : "Add New"} Task
        </h1>
        <label className="grid text-sm relative " htmlFor="tilte">
          <span
            className={`  text-sm ${
              darkTheme ? "text-white" : "text-Slate-Blue"
            }`}
          >
            Title
          </span>
          <span className="text-red text-xs font-medium absolute right-3 bottom-3  ">
            {errorTitle && errorTitle}{" "}
          </span>
          <input
            className={`bg-transparent px-4 h-10 w-full border  mt-2 rounded-md outline-none focus:border-purple  font-medium ${
              darkTheme ? " text-white" : "text-black"
            } ${
              errorTitle
                ? "border-red "
                : "border-Slate-Blue border-opacity-25 "
            }`}
            type="text"
            name="tilte"
            id="tilte"
            placeholder="e.g. Take coffee break"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="grid text-sm mt-5 " htmlFor="description">
          <span
            className={`  text-sm ${
              darkTheme ? "text-white" : "text-Slate-Blue"
            }`}
          >
            Description
          </span>
          <textarea
            className={`bg-transparent p-4 h-[105px] w-full border border-Slate-Blue border-opacity-25 mt-2 rounded-md outline-none focus:border-purple  font-medium resize-none placeholder:text-opacity-65 ${
              darkTheme ? " text-white" : "text-black"
            }`}
            name="tilte"
            id="tilte"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="mt-6 ">
          <span
            className={`  text-sm ${
              darkTheme ? "text-white" : "text-Slate-Blue"
            }`}
          >
            Subtasks
          </span>
          <div className="mt-2 ">
            {subtasks.map((task,index) => (
              <div className="mb-4" key={task.id}>
                <label
                  className="flex justify-between items-center  "
                  htmlFor=""
                >
                  <input
                    className={` bg-transparent   px-4 w-[385px] rounded-md text-sm h-10 border border-Slate-Blue border-opacity-25 outline-none focus:border-purple font-medium ${
                      darkTheme ? " text-white" : "text-black"
                    } ${
                      errorSubtask
                        ? "border-red "
                        : "border-Slate-Blue border-opacity-25 "
                    } `}
                    type="text"
                    name={task.title}
                    value={task.title}
                    placeholder={placeholder[index]}
                    onChange={(e) => handleOnchange(task.id, e.target.value)}
                  />
                  <img
                    onClick={() => handleRemoveSubtask(task.id)}
                    className=" cursor-pointer"
                    src={cross}
                    alt=""
                  />
                </label>
              </div>
            ))}
            <p className="text-red text-xs font-medium  text-center mx-auto mb-2 ">
              {errorSubtask && errorSubtask}{" "}
            </p>
          </div>
          <button
            onClick={handleAddSubtask}
            className={`h-10 w-full text-sm text-purple  mb-5  rounded-3xl ${
              darkTheme
                ? "bg-white"
                : "bg-purple bg-opacity-10 hover:bg-opacity-50"
            }`}
          >
            + Add New Subtask
          </button>
          <span
            className={`  text-sm ${
              darkTheme ? "text-white" : "text-Slate-Blue"
            }`}
          >
            Status
          </span>
          <FormControl sx={{ mt: 1, minWidth: 1, borderRadius: 2 }}>
            <Select
              sx={{ color: darkTheme ? "white" : "black" }}
              style={{
                height: "40px",
              }}
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={status}
              onChange={handleStatusChange}
              autoWidth
              defaultChecked={
                type === "edit" ? taskStatus : selectedBoard.columns[0].name
              }
              defaultValue={
                type === "edit" ? taskStatus : selectedBoard.columns[0].name
              }
            >
              {selectedBoard.columns.map((col) => (
                <MenuItem className="w-[416px]" key={col.name} value={col.name}>
                  {col.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <button
          onClick={handleOnSubmit}
          type="submit"
          className="h-10 mt-5 w-full text-sm bg-purple text-white  rounded-3xl hover:bg-opacity-70"
        >
          {type === "create" ? "Create Task" : "Save Changes"}
        </button>
      </div>
    </>
  );
};

export default AddEditTask;
