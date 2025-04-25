import { ActionJson, ActionType } from "../types/ActionTypes";
import { SendEmailAction } from "../actions/SendEmailAction";
import { ConditionAction } from "../actions/ConditionAction";
import { SendSMSAction } from "../actions/SendSMSAction";
import { LoopAction } from "../actions/LoopAction";
import { Action } from "../actions/Action";

/**
 * ActionFactory is following to the factory design pattern
 * and it produces different type of actions according to the
 * action type in provided json or throws an error if type is unrecognized.
 */
export class ActionFactory {
	static fromJson(json: ActionJson): Action {
		switch (json.type) {
			case ActionType.SEND_SMS:
				return new SendSMSAction(json.phoneNumber);
			case ActionType.SEND_EMAIL:
				return new SendEmailAction(json.from, json.to);
			case ActionType.CONDITION:
				return new ConditionAction(
					json.expression,
					json.context || {},
					json.trueAction ? this.fromJson(json.trueAction) : undefined,
					json.falseAction ? this.fromJson(json.falseAction) : undefined
				);
			case ActionType.LOOP:
				return new LoopAction(json.count, this.fromJson(json.action));
			default:
				throw new Error(`Unknown action: ${JSON.stringify(json, null, 2)}`);
		}
	}
}
