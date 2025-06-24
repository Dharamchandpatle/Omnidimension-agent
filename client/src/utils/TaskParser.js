// Extremely simplified parser for demo purposes
export function parseTask(description) {
  // In production, use NLP or LLM for accurate parsing
  // Here, we hardcode steps for demo
  return [
    { type: "search", description: "Find providers" },
    { type: "sort", description: "Sort by preferences" },
    { type: "call", description: "Call for earliest appointment" },
    // { type: "book", description: "Book appointment" },
    { type: "calendar", description: "Add to calendar and monitor slots" },
  ];
}