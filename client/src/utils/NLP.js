// Simple mock NLP parser. Replace with actual NLP/LLM integration as needed.
export function extractEntities(description) {
  // Very naive entity extraction for demo purposes
  const providers = description.match(/provider[s]? for ([^,]+)/i);
  const preferences = description.match(/sort by ([^,]+)/i);
  const appointment = description.match(/call for (the )?([^,]+)/i);
  const calendar = /calendar/i.test(description);

  return {
    providers: providers ? providers[1].trim() : undefined,
    preferences: preferences ? preferences[1].trim() : undefined,
    appointment: appointment ? appointment[2].trim() : undefined,
    calendar,
  };
}

// Example usage: const entities = extractEntities("Find providers for X, sort by my preferences, call for the earliest appointment...");