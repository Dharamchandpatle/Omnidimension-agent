export default class CallAgent {
  async perform(step, context) {
    // Simulate call
    return { ...context, callStatus: "Called Provider A" };
  }
}