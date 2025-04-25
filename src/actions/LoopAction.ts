import { Action } from "./Action";

/**
 * In the real project I'd add abort controller to abort action that might run for too long.
 * For now (for the practice project) I think it's enough just to mention it
 */
export class LoopAction implements Action {
	constructor(private count: number, private action: Action) {}

	async execute(): Promise<void> {
		for (let i = 0; i < this.count; i++) {
			console.log(`[Loop] Iteration: ${i + 1}`);
			await this.action.execute();
		}
	}
}
