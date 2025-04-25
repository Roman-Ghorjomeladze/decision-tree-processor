import { Action } from "./Action";

export class SendSMSAction implements Action {
	constructor(private phoneNumber: string) {}

	async execute(): Promise<void> {
		console.log(`[SendSMS] To: ${this.phoneNumber}`);
	}
}
