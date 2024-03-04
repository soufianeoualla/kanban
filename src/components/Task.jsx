import { useContext, useState } from "react";
import ViewTask from "./modals/ViewTask";
import { DarkThemeContext } from "../App";
const Task = ({ task, taskIndex, colIndex, selectedBoard }) => {
  const [viewTask, setViewTask] = useState(false);
  const darkTheme = useContext(DarkThemeContext)

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };

  return (
    <>
      <div
        
        className="grid gap-6 mb-6 cursor-pointer"
      >
        <div
         onClick={() => setViewTask(true)}
        onDragStart={(e)=>handleOnDrag(e)}
        draggable
         className={`w-[280px] px-4 py-5 text-lg shadow-md flex-col flex justify-center items-start rounded-lg ${darkTheme ? 'bg-Dark-Charcoal-Gray':'bg-white'} hover:scale-105 ` }>
          <h1
           
            className={` mb-2 text-lg leading-relaxed hover:text-purple ${darkTheme ? ' text-white':'text-black'}`}
          >
            {task.title}
          </h1>
          <p className="text-Slate-Blue text-xs">
            {task.subtasks.filter((item) => item.isCompleted === true).length}{" "}
            of {task.subtasks.length} subtasks
          </p>
        </div>
        {viewTask && (
          <ViewTask
            title={task.title}
            desc={task.description}
            subtasks={task.subtasks}
            taskStatus={task.status}
            taskIndex={taskIndex}
            setViewTask={setViewTask}
            colIndex={colIndex}
            selectedBoard={selectedBoard}
          />
        )}
      </div>
    </>
  );
};

export default Task;
