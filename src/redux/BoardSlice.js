import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";
const BoardSlice = createSlice({
  name: "board",
  initialState: data.boards,
  reducers: {
    addBoard: (state, action) => {
      return [...state, action.payload];
    },
    editBoard: (state, action) => {
      const { selectedBoard, name, columns } = action.payload;
      const newState = state.map((board) => {
        if (board.name === selectedBoard.name) {
          return {
            ...board,
            name,
            columns,
          };
        } else return board;
      });
      return newState;
    },
    deleteBoard: (state, action) => {
      const selectedBoard = action.payload;
      const newState = state.filter(
        (state) => state.name !== selectedBoard.name
      );
      return newState;
    },
    deleteTask: (state, action) => {
      const { selectedBoard, colIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.name === selectedBoard.name);
      const column = board.columns.find((col, index) => index === colIndex);
      const tasks = column.tasks;
      tasks.splice(taskIndex, 1);
    },
    addTask: (state, action) => {
      const { selectedBoard, status, title, description, subtasks } =
        action.payload;
      const board = state.find((board) => board.name === selectedBoard.name);
      const column = board.columns.find((col) => col.name === status);
      const tasks = column.tasks;
      const newTask = { title, description, subtasks, status };
      tasks.push(newTask);
    },

    editTask: (state, action) => {
      const {
        selectedBoard,
        colIndex,
        taskIndex,
        status,
        title,
        description,
        subtasks,
      } = action.payload;

      const updatedTask = { title, description, subtasks, status };
      const board = state.find((board) => board.name === selectedBoard.name);
      const column = board.columns.find((col, index) => index === colIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = updatedTask.title;
      task.description = updatedTask.description;
      task.status = updatedTask.status;
      task.subtasks = updatedTask.subtasks;
      if (column.name === status) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col) => col.name === status);
      newCol.tasks.push(task);
    },

    subtaskCompleted: (state, action) => {

      const { selectedBoard, colIndex, taskIndex, subtaskIndex } =
        action.payload;
      const board = state.find((board) => (board.name === selectedBoard.name));
      const column = board.columns.find((col, index) => index === colIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      const subtask = task.subtasks[subtaskIndex];
      subtask.isCompleted = !subtask.isCompleted;
    },
    setTaskStatus: (state, action) => {
      const { selectedBoard, colIndex, taskIndex, status } = action.payload;
      console.log(selectedBoard)
      const board = state.find((board) => board.name === selectedBoard.name);
      const column = board.columns.find((col, index) => index === colIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      if (column.name === status) {
        return state;
      } else {
        task.status = status;
        column.tasks.splice(taskIndex, 1);
        const newCol = board.columns.find((col) => col.name === status);
        newCol.tasks.push(task);
      }

      return state;
    },
    dragTask: (state, action) => {
      const { selectedBoard, colIndex, prevColIndex, taskIndex } =
        action.payload;
      const board = state.find((board) => board.name === selectedBoard.name);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks[taskIndex];
      const newCol = board.columns.find((col, index) => index === colIndex );
      task.status = newCol.name
      newCol.tasks.push(task);
      column.tasks.splice(taskIndex, 1);
    },
  },
});

export const {
  addBoard,
  editBoard,
  deleteBoard,
  deleteTask,
  addTask,
  editTask,
  subtaskCompleted,
  setTaskStatus,
  dragTask
} = BoardSlice.actions;
export default BoardSlice.reducer;
