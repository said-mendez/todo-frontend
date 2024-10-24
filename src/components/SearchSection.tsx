import { useState } from 'react';
import { Button, Textarea, Select } from "@material-tailwind/react";
import "./css/ToDoSearch.css";

type SearchFilterProps = {
  onSearch: (name: string, priority: string, status: string) => void;
};

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');

  const handleSearch = () => {
    onSearch(name, priority, status);
  };

  return (
    <div className="search-filter">
      <h3>Search - Filter To-Do's</h3>
      
      <div className="filter-group">
        <label htmlFor="name">Name (or part of it):</label>
        <Textarea
          id="name"
          rows={1}
          className="filter-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter task name" onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        />
      </div>

      <div className="filter-group">
        <label htmlFor="priority">Priority:</label>
        <Select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e as string)}
          className="filter-input" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </Select>
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <Select
          id="status"
          value={status}
          onChange={(e) => setStatus(e as string)}
          className="filter-input"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <option value="All">All</option>
          <option value="Done">Done</option>
          <option value="Undone">Undone</option>
        </Select>
      </div>

      <Button className="filter-button" onClick={handleSearch}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        Search
      </Button>
    </div>
  );
};
