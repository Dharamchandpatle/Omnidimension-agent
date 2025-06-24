export default class SortAgent {
  async perform(step, context) {
    // Simulate sorting
    return { ...context, providers: context.providers.sort((a, b) => a.name.localeCompare(b.name)) };
  }
}