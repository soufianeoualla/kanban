import { useDispatch } from "react-redux";
import Task from "./Task";
import { dragTask } from "../redux/BoardSlice";

const Column = ({ columns,selectedBoard }) => {
  const colors = [
    "#49C4E5",
    "#9370DB",
    "#FFD700",
    "#32CD32",
    "#FF6347",
    "#7FFFD4",
    "#BA55D3",
    "#FF8C00",
    "#20B2AA",
    "#87CEFA"
  ];
  const dispatch = useDispatch()
  
  const handleOnDragOver = (e)=>{
    e.preventDefault()
  }
  const handleOnDrop = (e,colIndex)=>{
    const {prevColIndex,taskIndex} = JSON.parse(
      e.dataTransfer.getData("text")
      
    )
      dispatch(dragTask({selectedBoard, colIndex, prevColIndex, taskIndex}))
    
  }

  return (
    <>
      {columns.map((column, colindex) => (
        <div
        onDragOver={handleOnDragOver}
        onDrop={(e)=>handleOnDrop(e,colindex)}
         key={column.name} className="w-[280px] h-full ">
          <div className="text-Slate-Blue flex justify-start items-center gap-4 mb-6 uppercase tracking-wider text-xs">
            <div
              className={`w-[15px] h-[15px] rounded-full  `}
              style={{background: colors[colindex % colors.length]}}
            ></div>
            {column.name} ({column.tasks && column.tasks.length})
          </div>
          <div>
            {column.tasks && column.tasks.map((task,Taskindex)=>(

            <Task key={task.title} task={task} taskIndex={Taskindex} colIndex={colindex} selectedBoard={selectedBoard}/>
            ))}
          </div>
          <div className="w-[280px] h-10"></div>
        </div>
      ))}
    </>
  );
};

export default Column;
