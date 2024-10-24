import { useState } from "react";
import { Button } from "react-bootstrap";
import { ToDoDialog } from "./dialogToDo.tsx"; 
import { ToDo } from "../models/Todo";

export function NewTodoBtn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  const openDialog = () => setIsDialogOpen(true);

  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      {}
      <Button onClick={openDialog} className={"w-2/12"}>
        + New To Do
      </Button>

      {}
      {isDialogOpen && (
        <ToDoDialog isEdit={false} onClose={closeDialog} open={false} onSave={function (todo: ToDo): void {
          throw new Error("Function not implemented.");
        } } />
      )}
    </>
  );
}
