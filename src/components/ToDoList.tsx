import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { ToDo } from "../models/Todo";
import { ToDoDialog } from "./dialogToDo";
import "./css/ToDoTable.css";

type ToDoTableProps = {};

export const ToDoTable: React.FC<ToDoTableProps> = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<ToDo | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch todos from backend
  useEffect(() => {
    axiosInstance.get("/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return sortOrder === "asc"
      ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  // 
  const handleAddTodo = (todo: ToDo) => {
    axiosInstance.post("/api/todos", todo)
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error("Error adding todo:", error));
  };

  const handleEdit = (todo: ToDo) => {
    setCurrentTodo(todo);
    setEditModalOpen(true);
  };

  const handleUpdateTodo = (updatedTodo: ToDo) => {
    axiosInstance.put(`/api/todos/${updatedTodo.id}`, updatedTodo)
      .then(() => {
        setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating todo:", error));
  };

  const handleDeleteTodo = (id: string) => {
    axiosInstance.delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleToggleDone = (todo: ToDo) => {
    const updatedTodo = { ...todo, done: !todo.done };
    handleUpdateTodo(updatedTodo);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const renderDueDateBackgroundColor = (dueDate: Date | undefined) => {
    if (!dueDate) return "";
    const today = new Date();
    const diffInDays = (new Date(dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 7) return "bg-red-500";
    if (diffInDays < 14) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>
              Due Date{" "}
              <button onClick={handleSort}>
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo) => (
            <tr
              key={todo.id}
              className={`${renderDueDateBackgroundColor(todo.dueDate)} ${todo.done ? "line-through" : ""}`}
            >
              <td>{todo.text}</td>
              <td>{todo.priority}</td>
              <td>{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : "No due date"}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggleDone(todo)}
                />
              </td>
              <td>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentTodos.length < todosPerPage}
        >
          Next
        </button>
      </div>

      {isEditModalOpen && currentTodo && (
        <ToDoDialog
          isEdit={true}
          todo={currentTodo}
          onClose={() => setEditModalOpen(false)}
          onSave={handleUpdateTodo} open={false}        />
      )}
    </div>
  );
};
