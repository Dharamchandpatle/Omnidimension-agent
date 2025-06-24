export default class CalendarAgent {
  async perform(step, context) {
    // Simulate calendar entry
    return { ...context, calendar: { event: "Appointment with Provider A", time: "10:00 AM" } };
  }
}