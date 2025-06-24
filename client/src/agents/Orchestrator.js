import SearchAgent from "./SearchAgent";
import SortAgent from "./SortAgent";
import CallAgent from "./CallAgent";
import BookingAgent from "./BookingAgent";
import CalendarAgent from "./CalendarAgent";
import { parseTask } from "../utils/TaskParser";

export default class Orchestrator {
  constructor() {
    this.agents = {
      search: new SearchAgent(),
      sort: new SortAgent(),
      call: new CallAgent(),
      book: new BookingAgent(),
      calendar: new CalendarAgent(),
    };
  }

  async execute(description, onStep) {
    const steps = parseTask(description);
    let context = {};
    let logs = [];
    for (const step of steps) {
      const agent = this.agents[step.type];
      if (!agent) throw new Error(`No agent for step: ${step.type}`);
      onStep?.(step, `Starting ${step.type}...`);
      context = await agent.perform(step, context);
      logs.push(`${step.type} done.`);
      onStep?.(step, `${step.type} done.`);
    }
    return { steps, result: context, logs };
  }
}