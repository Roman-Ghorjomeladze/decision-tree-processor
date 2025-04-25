export enum ActionType {
	SEND_SMS = "SendSMS",
	SEND_EMAIL = "SendEmail",
	CONDITION = "Condition",
	LOOP = "Loop",
}

interface SendSMSActionJson {
	type: ActionType.SEND_SMS;
	phoneNumber: string;
}

interface SendEmailActionJson {
	type: ActionType.SEND_EMAIL;
	from: string;
	to: string;
}

interface ConditionActionJson {
	type: ActionType.CONDITION;
	expression: string;
	context?: Record<string, any>;
	trueAction?: ActionJson;
	falseAction?: ActionJson;
}

interface LoopActionJson {
	type: ActionType.LOOP;
	count: number;
	action: ActionJson;
}

export type ActionJson = SendSMSActionJson | SendEmailActionJson | ConditionActionJson | LoopActionJson;
