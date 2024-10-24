import { useState, useEffect } from "react";
import { Dialog, Typography, Select, Option } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToDo } from "../models/Todo";
import "./css/ToDoDialog.css"

type ToDoDialogProps = {
  isEdit?: boolean;
  todo?: ToDo;
  open: boolean;
  onClose: () => void;
  onSave: (todo: ToDo) => void;
};

export const ToDoDialog: React.FC<ToDoDialogProps> = ({
  isEdit = false,
  todo,
  open,
  onClose,
  onSave,
}) => {
  const [text, setText] = useState<string>(todo?.text || "");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(todo?.priority || "Low");
  const [dueDate, setDueDate] = useState<Date | null>(todo?.dueDate ? new Date(todo.dueDate) : null);
  const [error, setError] = useState<string>("");

  const maxLength = 120;

  useEffect(() => {
    if (isEdit && todo) {
      setText(todo.text);
      setPriority(todo.priority);
      setDueDate(todo.dueDate ? new Date(todo.dueDate) : null);
    } else {
      resetForm();
    }
  }, [isEdit, todo]);

  const resetForm = () => {
    setText("");
    setPriority("Low");
    setDueDate(null);
    setError("");
  };

  const handleSave = () => {
    if (text.trim() === "") {
      setError("The To-Do text cannot be empty.");
      return;
    } else if (text.length > maxLength) {
      setError(`The To-Do text cannot exceed ${maxLength} characters.`);
      return;
    }

    const newToDo: ToDo = {
      id: todo?.id || crypto.randomUUID(),
      text,
      priority,
      done: todo?.done || false,
      dueDate: dueDate || undefined,
      creationDate: todo?.creationDate || new Date(),
      doneDate: todo?.doneDate,
    };

    onSave(newToDo);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} size="lg" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <div className="dialog-header">
        <Typography variant="h5" color="blue-gray" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          {isEdit ? "Edit To-Do" : "Add New To-Do"}
        </Typography>
      </div>

      <div className="dialog-content">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {/* To-Do Text Field */}
          <div className="form-group">
            <Typography variant="small" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              To-Do Text
            </Typography>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setError("");
              }}
              placeholder="Describe your task"
              className="todo-textarea"
              maxLength={maxLength}
            />
            {error && (
              <Typography variant="small" color="red" className="error-text" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {error}
              </Typography>
            )}
            <Typography variant="small" className="character-count" placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              {text.length}/{maxLength} characters
            </Typography>
          </div>

          {/* Priority Field */}
          <div className="form-group">
            <Typography variant="small" color="gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Priority
            </Typography>
            <Select
              value={priority}
              onChange={(e) => setPriority(e as "Low" | "Medium" | "High")}
              className="todo-select" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </div>

          {/* Due Date Field */}
          <div className="form-group">
            <Typography variant="small" color="gray"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Due Date
            </Typography>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              className="todo-datepicker"
              placeholderText="Select a due date (optional)"
              dateFormat="MMM d, yyyy"
              isClearable
            />
          </div>

          {/* Save/Cancel Buttons */}
          <div className="dialog-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">
              {isEdit ? "Update To-Do" : "Add To-Do"}
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
