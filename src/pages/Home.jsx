import React, { useState, useEffect } from "react";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [details, setDetails] = useState("");

  useEffect(() => {
    // Load tasks from localStorage when the component mounts
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, []);
  const toggleTaskCompletion = (index) => {
    // Toggle the completion status of the task at the specified index
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;

    // Update the state and localStorage with the updated tasks
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) =>{
    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = {
      task,
      date,
      priority,
      details,
    };

    // Update the task list
    setTaskList([...taskList, newTask]);

    // Store the updated task list in localStorage
    localStorage.setItem("tasks", JSON.stringify([...taskList, newTask]));

    // Clear form fields
    setTask("");
    setDate("");
    setPriority("low");
    setDetails("");
  };

  return (
    <div className=" pb-48">
      <h1 className="text-center font-bold text-3xl my-4">Create Task</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow-xl w-2/6 mx-auto rounded-lg p-5"
      >
        <input
          required
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          required
          type="date"
          className="input input-bordered w-full mt-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="select select-bordered w-full mt-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option disabled value="low">
            Priority level
          </option>
          <option value="low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <textarea
          className="textarea textarea-lg w-full mt-2 textarea-bordered"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <button className="mt-2 btn btn-primary btn-block">Create Task</button>
      </form>
      <div>
        <h2 className="text-center font-bold text-3xl my-4">Task list</h2>
        <table className="table  w-3/4 text-center mx-auto">
          <thead>
            <tr className="text-medium text-[20px]">
              <th>Task</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => (
              <tr
                key={index}
                className={`${task.completed ? "bg-green-500 text-white" : ""}`}
              >
                <td>{task.task}</td>
                <td>{task.date}</td>
                <td>{task.priority}</td>
                <td>{task.details}</td>

                <td>
                  <button
                    onClick={() => toggleTaskCompletion(index)}
                    className={`${
                      task.completed ? "btn-success text-white" : "btn-warning"
                    } btn btn-sm`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </button>
                </td>
                <td onClick={() => handleDelete(index)} className="text-red-500 font-bold text-[23px] cursor-pointer">X</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
