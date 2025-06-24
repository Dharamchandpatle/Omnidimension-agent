// Simulated Calendar API service for adding and monitoring events
const CalendarAPI = {
  addEvent: async (eventDetails) => {
    // Replace this with real API call logic
    return new Promise((resolve) =>
      setTimeout(() => resolve({ status: "added", ...eventDetails }), 1000)
    );
  },
  monitorSlots: async (provider) => {
    // Replace with real monitoring logic
    return new Promise((resolve) =>
      setTimeout(() => resolve({ status: "monitoring", provider }), 500)
    );
  }
};

export const addEvent = CalendarAPI.addEvent;
export const monitorSlots = CalendarAPI.monitorSlots;
export default CalendarAPI;