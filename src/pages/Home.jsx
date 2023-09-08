import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState("low");
  const [details, setDetails] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortByDate, setSortByDate] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  useEffect(() => {
    const usersData = localStorage.getItem("registeredUsers");
    if (usersData) {
      const parsedUsers = JSON.parse(usersData);
      setRegisteredUsers(parsedUsers);
    }
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTaskList(JSON.parse(savedTasks));
    }
  }, []);
  const toggleTaskCompletion = (index) => {
    if (user) {
      const updatedTasks = [...taskList];
      const taskStatus = updatedTasks[index].completed;
      if (taskStatus === "Pending") {
        updatedTasks[index].completed = "In Progress";
      } else if (taskStatus === "In Progress") {
        updatedTasks[index].completed = "Completed";
      }
      setTaskList(updatedTasks);
      toast.success(
        `Task "${updatedTasks[index].task}" is now ${updatedTasks[index].completed}!`
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      toast.error("you need to login first");
      navigate("/login");
    }
  };

  const handleDelete = (index) => {
    if (user) {
      const updatedTasks = taskList.filter((_, i) => i !== index);
      setTaskList(updatedTasks);
      toast.success("Task Removed Successfully");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      toast.error("you need to login first");
      navigate("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      const newTask = {
        task,
        date,
        priority,
        details,
        assignedTo,
        completed: "Pending", // Set the default status to "Pending"
      };
      setTaskList([...taskList, newTask]);
      localStorage.setItem("tasks", JSON.stringify([...taskList, newTask]));
      setTask("");
      setDate("");
      setPriority("low");
      setDetails("");
      setAssignedTo("");
    } else {
      toast.error("You need to login first");
      navigate("/login");
    }
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
          required
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
        <select
          value={assignedTo} // Set the value to the state
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          className="select select-bordered w-full mt-2"
        >
          <option disabled selected value="Assigned To">
            Assigned to
          </option>
          {registeredUsers.map((user, index) => (
            <option key={index} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <textarea
          required
          className="textarea textarea-lg w-full mt-2 textarea-bordered"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
        <button className="mt-2 btn btn-primary btn-block">Create Task</button>
      </form>
      <div>
        <h2 className="text-center font-bold text-3xl my-4">Task list</h2>
        <div className="w-3/4 my-4 mx-auto grid grid-cols-3 gap-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected value="All">
              Filter by status
            </option>
            <option>All</option>
            <option>Completed</option>
            <option>In Progress</option>
            <option>Pending</option>
          </select>
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="Default">Sort by Date</option>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected value="All">
              Filter by priority
            </option>
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <table className="table  w-3/4 text-center mx-auto">
          <thead>
            <tr className="text-medium text-[20px]">
              <th>Task</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Details</th>
              <th>Assigned to</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList
              .filter((task) => {
                const isStatusMatch =
                  filterStatus === "All" || task.completed === filterStatus;
                const isPriorityMatch =
                  filterPriority === "All" || task.priority === filterPriority;
                return isStatusMatch && isPriorityMatch;
              })
              .sort((taskA, taskB) => {
                if (sortByDate === "Ascending") {
                  return new Date(taskA.date) - new Date(taskB.date);
                } else if (sortByDate === "Descending") {
                  return new Date(taskB.date) - new Date(taskA.date);
                }
                return 0; // No sorting
              })
              .map((task, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      task.completed === "Completed"
                        ? "bg-green-500 text-white"
                        : task.completed === "In Progress"
                        ? "bg-yellow-500 text-black"
                        : ""
                    }`}
                  >
                    <td>{task.task}</td>
                    <td>{task.date}</td>
                    <td>{task.priority}</td>
                    <td>{task.details}</td>
                    <td>{task.assignedTo}</td>
                    <td>
                      <button
                        onClick={() => toggleTaskCompletion(index)}
                        className={`${
                          task.completed === "Completed"
                            ? "btn-success text-white"
                            : task.completed === "In Progress"
                            ? "btn-warning"
                            : "btn-primary"
                        } btn btn-sm`}
                      >
                        {task.completed}
                      </button>
                    </td>
                    <td
                      onClick={() => handleDelete(index)}
                      className="text-red-500 font-bold text-[23px] cursor-pointer"
                    >
                      X
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
