import { AverageTimeBox } from "./components/AverageTimeBox.tsx";
import { NewTodoBtn } from "./components/NewTodoButton.tsx";
import { PaginationGroup } from "./components/pagination.tsx";
import { SearchFilter } from "./components/SearchSection.tsx";
import { useState } from "react";
import { ToDoTable } from "./components/ToDoList.tsx";
import { ToDo } from "./models/Todo";
import { ToDoDialog } from "./components/dialogToDo.tsx";

function App() {
  //for the search tool
  const handleSearch = (name: string, priority: string, status: string) => {
    console.log("Search criteria:", { name, priority, status });
    // Add your search logic here (e.g., fetch filtered to-dos from backend)
  };

  //dialog
  const [isDialogOpen, setDialogOpen] = useState(false);

  const addTodo = (newToDo: ToDo) => {
    setTodos((prevTodos) => [...prevTodos, newToDo]);
  };
  //averagetime box N TABLE
  const [todos, setTodos] = useState<ToDo[]>([
    {
      id: "1",
      text: "Example Task 1",
      priority: "Medium",
      done: true,
      creationDate: new Date("2023-10-01"),
      doneDate: new Date("2023-10-05"),
    },
    {
      id: "2",
      text: "Example Task 2",
      priority: "High",
      done: true,
      creationDate: new Date("2023-10-01"),
      doneDate: new Date("2023-10-07"),
    },
  ]);

  const updateTodo = (updatedTodo: ToDo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div className="my-6 w-3/4 mx-auto flex flex-col gap-4">
        <div>
          <SearchFilter onSearch={handleSearch} />
        </div>
        <NewTodoBtn />
        <div>
          <div>
            <button onClick={() => setDialogOpen(true)}>Add To-Do</button>

            <ToDoDialog
              open={isDialogOpen}
              onClose={() => setDialogOpen(false)}
              onSave={addTodo}
            />
          </div>
          <ToDoTable />
        </div>
        {/* <PaginationGroup /> */}
        <div>
          <AverageTimeBox todos={todos} />
        </div>
      </div>
    </div>
  );
}

export default App;
