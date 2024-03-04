import Column from "./Column";
import AddEditBoard from "./modals/AddEditBoard";
import { DarkThemeContext } from "../App";
import { useContext, useState } from "react";

const Content = ({ hideSidebar, selectedBoard }) => {
  const [addEditBoard,setAddEditBoard]=useState()
  const darkTheme = useContext(DarkThemeContext);
  return (
    <div
      className={` h-[calc(100vh-96px)] p-6   ${
        hideSidebar ? "w-screen" : " w-[calc(100vw-300px)]"
      } overflow-scroll ${
        darkTheme ? "bg-Charcoal" : "bg-Light-Blue-Gray"
      }  sm:w-screen `}
    >
      <div className="flex gap-6 justify-start items-start h-full mb-5  ">
        {selectedBoard && (
          <>
            <Column
              columns={selectedBoard.columns}
              selectedBoard={selectedBoard}
            />
            {selectedBoard.columns.length > 0 ? (
              <div
                onClick={() => setAddEditBoard(true)}
                className={` w-[280px]   h-full flex justify-center items-center text-Slate-Blue rounded-md mt-12 cursor-pointer hover:bg-purple hover:text-white ${
                  darkTheme
                    ? " bg-Slate-Blue bg-opacity-15 hover:bg-opacity-15"
                    : "bg-[#E9EFFA]"
                } `}
              >
                <h1 className=" w-[280px] flex justify-center items-center  text-2xl">+ New Column</h1>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-6 h-full w-full">
                <p className="text-xl text-Slate-Blue">This board is empty. Create a new column to get started.</p>
                <button
                onClick={() => setAddEditBoard(true)}
                className="h-12 w-[164px] text-lg text-white bg-purple rounded-3xl hover:bg-opacity-70 ">
                  + Add new Column
                </button>
              </div>
            )}
            {addEditBoard && (
              <AddEditBoard selectedBoard={selectedBoard} type={"edit"} setAddEditBoard={setAddEditBoard} />
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
