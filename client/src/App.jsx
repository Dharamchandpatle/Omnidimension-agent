import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import WorkflowPreview from "./components/WorkflowPreview";
import TaskStatus from "./components/TaskStatus";
import Orchestrator from "./agents/Orchestrator";
import "./styles.css";

function App() {
  const [workflow, setWorkflow] = useState(null);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTaskSubmit = async (description) => {
    setLoading(true);
    setStatus([]);
    setWorkflow(null);
    try {
      const orchestrator = new Orchestrator();
      const { steps, result, logs } = await orchestrator.execute(description, (step, log) => {
        setStatus((prev) => [...prev, { step, log }]);
      });
      setWorkflow({ steps, result });
    } catch (err) {
      setStatus([{ step: "error", log: err.message }]);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Omnidimension Task Orchestrator</h1>
      <TaskInput onSubmit={handleTaskSubmit} />
      <WorkflowPreview workflow={workflow} />
      <TaskStatus status={status} loading={loading} />
    </div>
  );
}

export default App;