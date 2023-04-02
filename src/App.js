import React from "react";
import ReactDOM from "react-dom/client";
import ToDoList from "./components/ToDoList";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NewToDo from "./components/NewToDo";

const root = ReactDOM.createRoot(document.getElementById("root"));
const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <ToDoList />,
  },
  {
    path: "/add",
    element: <NewToDo />,
    children: [
      {
        path: "/add/:taskId",
        element: <NewToDo />,
      },
    ],
  },
]);

root.render(<RouterProvider router={AppRouter} />);
