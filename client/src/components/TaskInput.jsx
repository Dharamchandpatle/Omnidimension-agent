import React, { useState } from "react";

function TaskInput({ onSubmit }) {
  const [description, setDescription] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (description.trim()) onSubmit(description);
      }}
      className="task-input-form"
    >
      <input
        type="text"
        placeholder="Describe your task..."
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="submit-btn">Run</button>
    </form>
  );
}

export default TaskInput;