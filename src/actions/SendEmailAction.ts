import { Action } from "./Action";

export class SendEmailAction implements Action {
	constructor(private from: string, private to: string) {}

	async execute(): Promise<void> {
		console.log(`[SendEmail] From: ${this.from} To: ${this.to}`);
	}
}
