import { useState, useEffect } from 'react';
import "./css/AverageTimeBox.css";

type ToDo = {
  id: string;
  text: string;
  priority: string;
  done: boolean;
  creationDate: Date;
  doneDate?: Date;
};

type AverageTimeBoxProps = {
  todos: ToDo[];
};

export const AverageTimeBox: React.FC<AverageTimeBoxProps> = ({ todos }) => {
  const [averageTime, setAverageTime] = useState<number | null>(null);

  useEffect(() => {
    const calculateAverageTime = () => {
      const completedTodos = todos.filter(todo => todo.done && todo.doneDate);

      if (completedTodos.length === 0) {
        setAverageTime(null);
        return;
      }

      const totalCompletionTime = completedTodos.reduce((total, todo) => {
        const creationTime = new Date(todo.creationDate).getTime();
        const doneTime = new Date(todo.doneDate!).getTime();
        return total + (doneTime - creationTime);
      }, 0);

      const average = totalCompletionTime / completedTodos.length;
      setAverageTime(average / (1000 * 60 * 60 * 24)); // convert from milliseconds to days
    };

    calculateAverageTime();
  }, [todos]);

  return (
    <div className="average-time-box">
      <h3>Average Completion Time</h3>
      <div className="average-time-value">
        {averageTime !== null ? (
          <span>{averageTime.toFixed(2)} days</span>
        ) : (
          <span>No tasks completed yet</span>
        )}
      </div>
    </div>
  );
};

