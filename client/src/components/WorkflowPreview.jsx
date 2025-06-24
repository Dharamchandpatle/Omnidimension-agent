import React from "react";
import AgentStep from "./AgentStep";

function WorkflowPreview({ workflow }) {
  if (!workflow) return null;
  return (
    <div className="workflow-preview">
      <h2>Planned Workflow</h2>
      <ul>
        {workflow.steps.map((step, idx) => (
          <AgentStep key={idx} step={step} />
        ))}
      </ul>
      <div className="workflow-result">
        <strong>Result:</strong> {JSON.stringify(workflow.result)}
      </div>
    </div>
  );
}

export default WorkflowPreview;