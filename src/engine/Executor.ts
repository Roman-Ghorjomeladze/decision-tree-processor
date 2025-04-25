import { Action } from "../actions/Action";

/**
 * For now we can remove executor at all and call the action without 
 * passing it to executor, but it might become helpful if 
 * we'll need retries or global logging and monitoring for every action.
 */
export class Executor {
	constructor(private rootAction: Action) {}

	async run(): Promise<void> {
		await this.rootAction.execute();
	}
}
