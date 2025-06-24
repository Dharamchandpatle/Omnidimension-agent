import React from "react";
function AgentStep({ step }) {
  return <li>{step.type}: {step.description}</li>;
}
export default AgentStep;