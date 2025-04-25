import { compileExpression } from "filtrex";
import { Parser } from "expr-eval";

export class ExpressionEvaluator {
	// Try evaluation with filtrex first, fallback to expr-eval
	async evaluate(expression: string, context: Record<string, unknown>): Promise<boolean> {
		try {
			const compiledExpr = compileExpression(expression);
			return compiledExpr(context);
		} catch (e) {
			console.error("filtrex failed, trying expr-eval...", e);

			try {
				const parser = new Parser();
				const expr = parser.parse(expression);
				return expr.evaluate(context as {});
			} catch (e) {
				console.error("expr-eval also failed", e);
				throw new Error("Failed to evaluate the expression.");
			}
		}
	}
}
