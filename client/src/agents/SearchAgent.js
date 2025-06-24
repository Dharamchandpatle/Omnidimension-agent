export default class SearchAgent {
  async perform(step, context) {
    // Simulate provider search
    return { ...context, providers: [{ name: "Provider A" }, { name: "Provider B" }] };
  }
}