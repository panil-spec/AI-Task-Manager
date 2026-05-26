import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  // DASHBOARD COUNTS

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(task => task.status === "DONE").length;

  const pendingTasks =
    tasks.filter(task => task.status === "TODO").length;

  const inProgressTasks =
    tasks.filter(task => task.status === "IN_PROGRESS").length;

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTasks(response.data);

    } catch (error) {

      console.log(error);

      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  // LOAD TASKS

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    fetchTasks();

  }, []);

  // CREATE TASK

  const createTask = async () => {

    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks",
        {
          title,
          description,
          priority,
          status: "TODO",
          dueDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Task Created Successfully ✅");

      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Task creation failed");
    }
  };

  // DELETE TASK

  const deleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE STATUS

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/${id}`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // GENERATE AI

  const generateAI = async () => {

    if (!title) {
      alert("Enter task title first");
      return;
    }

    try {

      setLoadingAI(true);

      const response = await API.post(
        "/ai/generate",
        {
          title
        }
      );

      setDescription(response.data.aiResponse);

    } catch (error) {

      console.log(error);

      alert("AI generation failed");

    } finally {

      setLoadingAI(false);
    }
  };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // FILTER TASKS

  const filteredTasks = tasks.filter(task => {

    const matchesSearch =
      (task.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "ALL"
        ? true
        : task.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-blue-600">
          AI Task Manager 🚀
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD STATS */}

      <div className="grid md:grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl mt-2">{totalTasks}</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-3xl mt-2">{completedTasks}</p>
        </div>

        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Pending</h2>
          <p className="text-3xl mt-2">{pendingTasks}</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">In Progress</h2>
          <p className="text-3xl mt-2">{inProgressTasks}</p>
        </div>

      </div>

      {/* CREATE TASK */}

      <div className="bg-white p-6 rounded shadow mb-8">

        <h2 className="text-2xl font-semibold mb-4">
          Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          className="w-full border p-3 rounded mb-4 h-40"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="grid md:grid-cols-2 gap-4 mb-4">

          <select
            className="border p-3 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          <input
            type="date"
            className="border p-3 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

        </div>

        <div className="flex gap-4">

          <button
            onClick={createTask}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Add Task
          </button>

          <button
            onClick={generateAI}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            {
              loadingAI
                ? "Generating..."
                : "Generate AI Description"
            }
          </button>

        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search Tasks..."
          className="border p-3 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="ALL">ALL</option>
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>

      </div>

      {/* TASK LIST */}

      <div className="grid gap-4">

        {
          filteredTasks.length === 0 ? (

            <div className="bg-white p-6 rounded shadow text-center text-gray-500">
              No Tasks Available
            </div>

          ) : (

            filteredTasks.map((task) => (

              <div
                key={task.id}
                className={`p-5 rounded shadow bg-white
                  ${
                    new Date(task.dueDate) < new Date()
                    && task.status !== "DONE"
                      ? "border-2 border-red-500"
                      : ""
                  }
                `}
              >

                <div className="flex justify-between items-center">

                  <h2 className="text-2xl font-bold">
                    {task.title}
                  </h2>

                  <span
                    className={`px-3 py-1 rounded text-white font-semibold
                      ${
                        task.priority === "HIGH"
                          ? "bg-red-500"
                          : task.priority === "MEDIUM"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                    `}
                  >
                    {task.priority}
                  </span>

                </div>

                <p className="text-gray-600 mt-3 whitespace-pre-line">
                  {task.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">

                  <button
                    onClick={() => updateStatus(task.id, "TODO")}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    TODO
                  </button>

                  <button
                    onClick={() => updateStatus(task.id, "IN_PROGRESS")}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    IN_PROGRESS
                  </button>

                  <button
                    onClick={() => updateStatus(task.id, "DONE")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    DONE
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

                <div className="mt-4 text-sm text-gray-500">

                  Due Date: {task.dueDate}

                  {
                    new Date(task.dueDate) < new Date()
                    && task.status !== "DONE"
                    && (
                      <span className="ml-3 text-red-600 font-bold">
                        Overdue
                      </span>
                    )
                  }

                </div>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

export default Dashboard;