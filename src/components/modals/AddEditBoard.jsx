import { useContext, useEffect, useState } from "react";
import cross from "../assets/icon-cross.svg";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addBoard, editBoard } from "../../redux/BoardSlice";
import { DarkThemeContext } from "../../App";
const AddEditBoard = ({ type, selectedBoard, setAddEditBoard }) => {
  const darkTheme = useContext(DarkThemeContext);

  const dispatch = useDispatch();
  const [columns, setColumns] = useState([
    {
      name: "Todo",
      tasks: [],
      id: uuidv4(),
    },
    {
      name: "Doing",
      tasks: [],
      id: uuidv4(),
    },
  ]);
  const [name, setName] = useState();
  const [errorName, setErrorName] = useState();
  const [errorColumn, setErrorColumn] = useState();

  useEffect(() => {
    if (type === "edit") {
      setColumns(
        selectedBoard.columns.map((col) => {
          return { ...col, id: uuidv4() };
        })
      );
      setName(selectedBoard.name);
    }
  }, [type, selectedBoard]);

  const handleAddColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        name: "",
        tasks: [],
        id: uuidv4(),
      },
    ]);
  };
  const handleRemoveColumn = (id) => {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  };
  const handleOnChange = (id, newValue) => {
    setColumns((prev) => {
      const newState = [...prev];
      const column = newState.find((column) => column.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const validate = () => {
    let nameError = "";
    let columnError = false;

    if (!name) {
      nameError = "name can't be empty";
      setErrorName(nameError);
      return false;
    } else setErrorColumn("");

    const emptySubtasks = columns.filter((column) => column.name.trim() === "");
    if (emptySubtasks.length > 0) {
      columnError = true;
      setErrorColumn(columnError ? "Column can't be empty" : "");
      return false;
    }

    return true;
  };

  const handleOnSubmit = () => {
    const isValid = validate();

    if (isValid) {
      if (type === "edit") {
        dispatch(editBoard({ selectedBoard, name, columns }));
        setAddEditBoard(false)

      } else {
        dispatch(addBoard({ name, columns }));
        setAddEditBoard(false)
      }
    }
  };

  return (
    <>
   

      <div
        onClick={() => {
          setAddEditBoard(false)

        }}
        className="fixed bg-black bg-opacity-30 inset-0 w-full h-full z-10"
      ></div>
      <div
        className={` p-8 rounded-lg w-[480px] fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 sm:w-[80%]  ${
          darkTheme ? "bg-Dark-Charcoal-Gray" : "bg-white"
        } `}
      >
        <h1
          className={`text-xl mb-5 leading-relaxed ${
            darkTheme ? "text-white" : "text-black"
          }`}
        >
          {type === "edit" ? "Edit" : "Add New"} Board
        </h1>
        <label className="grid text-sm  relative" htmlFor="name">
          <span className="text-red text-xs font-medium absolute right-3 bottom-3  ">
            {errorName && errorName}{" "}
          </span>
          <span className="text-xs text-Slate-Blue">Name</span>
          <input
            className={`bg-transparent px-4 h-10 w-full border  mt-2 rounded-md outline-none focus:border-purple  font-medium ${
              darkTheme ? " text-white" : "text-black"
            } ${
              errorName ? "border-red " : "border-Slate-Blue border-opacity-25 "
            }`}
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Web Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div className="mt-6 ">
          <span className=" text-Slate-Blue text-sm">Columns</span>
          <div className="mt-2">
            {columns.map((column) => (
              <div className="mb-4" key={column.id}>
                <label
                  className="flex justify-between items-center "
                  htmlFor=""
                >
                  <input
                    className={` bg-transparent capitalize px-4 w-[385px] rounded-md text-sm h-10 border border-Slate-Blue border-opacity-25 outline-none focus:border-purple  font-medium ${
                      darkTheme ? " text-white" : "text-black"
                    } `}
                    type="text"
                    name={column.name}
                    value={column.name}
                    onChange={(event) =>
                      handleOnChange(column.id, event.target.value)
                    }
                  />
                  <img
                    onClick={() => handleRemoveColumn(column.id)}
                    className=" cursor-pointer"
                    src={cross}
                    alt=""
                  />
                </label>
              </div>
            ))}
            <p className="text-red text-xs font-medium  text-center mx-auto mb-2 ">
              {errorColumn && errorColumn}{" "}
            </p>
          </div>
        </div>
        <button
          onClick={handleAddColumn}
          className={`h-10 w-full text-sm text-purple  mb-5  rounded-3xl ${
            darkTheme
              ? "bg-white"
              : "bg-purple bg-opacity-10 hover:bg-opacity-50"
          }`}
        >
          + Add New Column
        </button>
        <button
          onClick={handleOnSubmit}
          type="submit"
          className="h-10 mt-5 w-full text-sm bg-purple text-white  rounded-3xl hover:bg-opacity-70"
        >
          {type === "create" ? "Create New Board" : "Save Changes"}
        </button>
      </div>
    </>
  );
};

export default AddEditBoard;
