// // BookingAgent.js - Agent for booking appointments via external API
// import { bookAppointment as bookAppointmentService } from "../services/BookingAPI";

// export default class BookingAgent {
//   async perform(step, context) {
//     // Simulate booking using the BookingAPI service
//     // In a real app, extract provider, slot, and userDetails from context or step
//     const provider = context.providers ? context.providers[0] : { name: "Provider A" };
//     const slot = "10:00 AM";
//     const userDetails = { name: "Test User", email: "test@example.com" };
//     const booking = await bookAppointmentService(provider, slot, userDetails);
//     return { ...context, booking };
//   }
// }