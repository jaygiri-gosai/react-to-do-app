import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Search from "./Search";

const ToDoList = () => {
  // State variables to handle task list
  const [taskList, setTaskList] = useState(null);
  const [filteredTask, setFilteredTask] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  // Function to get call by useEffect to load data from local Storage
  const loadData = () => {
    let data = localStorage.getItem("taskList");
    setTaskList(JSON.parse(data));
    setFilteredTask(JSON.parse(data));
  };

  const selectAll = (event) => {
    //setIsChecked(event.target.checked);
  };

  // Function to clear local storage
  const clearTodo = () => {
    let ans = confirm("Are you sure you want to clear the list?");
    if (ans) localStorage.clear();
    loadData();
  };

  // To get called only once after inital render
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>To Do List</h1>
      {taskList !== null && (
        <Search
          data={taskList}
          loadData={loadData}
          setFilteredTask={setFilteredTask}
        />
      )}
      <div className="btn-container">
        <Link to="/add">
          <button className="add-new">+ Add new</button>
        </Link>
        <button className="clear-list" onClick={clearTodo}>
          Clear List
        </button>
      </div>

      <div className="list-container">
        <table border="1" align="center">
          <thead>
            <tr>
              <td>Title</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {(filteredTask === null || filteredTask.length <= 0) && (
              <tr>
                <td colSpan="3"> No Data Found!</td>
              </tr>
            )}
            {taskList !== null &&
              filteredTask.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <Link to={"add/" + item.id}>Edit</Link> &nbsp;
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ToDoList;
