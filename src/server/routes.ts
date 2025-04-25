import express from "express";

import { ActionFactory } from "../engine/ActionFactory";
import { Executor } from "../engine/Executor";
import { actionSchema } from "../engine/Schema";

const router = express.Router();

router.post("/execute", async (req, res) => {
	try {
		const parsed = actionSchema.parse(req.body);
		const action = ActionFactory.fromJson(parsed);
		const executor = new Executor(action);
		await executor.run();
		res.status(200).send({
			status: "Execution completed",
		});
	} catch (err: unknown) {
		console.error(err);
		res.status(400).send({
			error: (err as { errors: string })?.errors || (err as { message: string }).message,
		});
	}
});

export default router;
