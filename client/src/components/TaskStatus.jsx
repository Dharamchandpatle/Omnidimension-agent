import React from "react";
import Loader from "./Loader";

function TaskStatus({ status, loading }) {
  return (
    <div className="task-status">
      {loading && <Loader />}
      <ul>
        {status.map((s, idx) => (
          <li key={idx}>
            <strong>{s.step}:</strong> {s.log}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskStatus;