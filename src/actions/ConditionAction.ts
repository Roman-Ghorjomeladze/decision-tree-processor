import { Action } from "../actions/Action";
import { ExpressionEvaluator } from "../utils/ExpressionEvaluator";

export class ConditionAction implements Action {
	private evaluator: ExpressionEvaluator;

	constructor(
		private expression: string,
		private context: Record<string, unknown> = {},
		private trueAction?: Action,
		private falseAction?: Action
	) {
		this.evaluator = new ExpressionEvaluator();
	}

	async execute(): Promise<void> {
		let result: boolean;
		try {
			result = await this.evaluator.evaluate(this.expression, this.context);
		} catch (err) {
			console.error("Error evaluating expression:", err);
			throw err;
		}

		if (result) {
			await this.trueAction?.execute();
		} else {
			await this.falseAction?.execute();
		}
	}
}
