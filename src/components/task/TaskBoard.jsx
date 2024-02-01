import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learning React",
    description: "React is most popular library fro frontend development",
    tags: ["React", "JavaScript", "web"],
    priority: "High",
    isFavourite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [update, setUpdate] = useState(null);
  function handleSaveEdit(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (newTask.id === task.id) {
            return newTask;
          } else {
            return task;
          }
        })
      );
    }
    setShowAddModal(false);
    setUpdate(null);
  }
  function handleEdit(task) {
    setUpdate(task);
    setShowAddModal(true);
  }
  function handleClose() {
    setShowAddModal(false);
    setUpdate(null);
  }
  function handleDelete(taskId) {
    let filteredData = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredData);
  }
  function handleDeleteAll() {
    tasks.length = 0;
    setTasks([...tasks]);
  }
  return (
    <>
      <section className="mb-20" id="tasks">
        {showAddModal && (
          <AddTaskModal
            onSave={handleSaveEdit}
            update={update}
            onClose={handleClose}
          />
        )}
        <div className="container">
          <SearchTask />
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskActions
              onAddClick={() => setShowAddModal(true)}
              onDeleteAll={handleDeleteAll}
            />
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TaskBoard;
