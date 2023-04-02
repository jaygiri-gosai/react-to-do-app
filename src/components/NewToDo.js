import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const NewToDo = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  let { taskId } = useParams();

  useEffect(() => {
    if (taskId != undefined) {
      let editTask = [];
      let data = localStorage.getItem("taskList");
      let taskList = JSON.parse(data);
      editTask = taskList.filter((item) => item.id === taskId);
      if (editTask.length > 0) setTask(editTask[0].name);
    }
    return () => {};
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task === null || task === "" || task === undefined) {
      setError("Enter the task name");
    } else if (taskId != undefined) {
      let data = localStorage.getItem("taskList");
      taskList = JSON.parse(data);
      taskList.map((item) => {
        if (item.id === taskId) {
          item.name = task;
        }
      });
      localStorage.setItem("taskList", JSON.stringify(taskList));
    } else {
      setError("");
      setTask("");
      let taskArr = [];
      let taskString = localStorage.getItem("taskList");
      let taskParsed = JSON.parse(taskString);
      let taskObj = {
        id: "id" + Math.random().toString(16).slice(2),
        name: task,
      };

      if (taskParsed != null) {
        taskParsed.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(taskParsed));
      } else {
        taskArr.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(taskArr));
      }
    }
  };
  return (
    <div className="container">
      <h1>
        <span style={{ fontSize: "small" }}>
          <Link to="/">{"<"} Back</Link>
        </span>{" "}
        Add/edit Task
      </h1>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Task: </strong>
        </label>
        <input
          type="text"
          id="task"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input type="submit" value="Submit" />
        <div>{error && <span>{error}</span>}</div>
      </form>
    </div>
  );
};

export default NewToDo;
