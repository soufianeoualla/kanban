import { useContext, useState } from "react";
import { DarkThemeContext } from "../App";
import icon_board from "./assets/icon-board.svg";
import AddEditBoard from "./modals/AddEditBoard";
import { useSelector } from "react-redux";

const SelectBorad = ({ selected, setSelected }) => {
  const darkTheme = useContext(DarkThemeContext);
  const [addEditBoard, setAddEditBoard] = useState();
  const boardsData = useSelector((state) => state.board);

  return (
    <>
      <div className=" font-bold boards">
        <span className="pl-8 text-Slate-Blue text-xs">
          ALL BOARDS ({boardsData.length})
        </span>
        <div className=" mt-5">
          {boardsData &&
            boardsData.map((item, index) => (
              <div
                onClick={() => setSelected(index)}
                className={` cursor-pointer w-[92%] h-12 pl-8 flex gap-4 justify-start items-center   rounded-r-3xl text-lg
           ${
             selected === index &&
             !darkTheme &&
             " bg-purple text-white selected"
           }    ${
                  selected !== index &&
                  darkTheme &&
                  " hover:text-white hover:bg-purple"
                }  ${
                  selected === index && darkTheme && "text-white bg-purple"
                } text-Slate-Blue hover:bg-purple hover:bg-opacity-10 hover:text-purple`}
                key={item.name}
              >
                <img src={icon_board} alt="" />
                {item.name}
              </div>
            ))}
        </div>
        <button
          onClick={() => setAddEditBoard(true)}
          className="h-12 w-[92%] pl-8 flex gap-4 items-center justify-start text-lg  text-purple  hover:bg-purple hover:bg-opacity-10 rounded-r-3xl "
        >
          <img src={icon_board} alt="" />
          <span>+ Create New Board</span>
        </button>
      </div>
      {addEditBoard && (
        <AddEditBoard type={"create"} setAddEditBoard={setAddEditBoard} />
      )}
    </>
  );
};

export default SelectBorad;
