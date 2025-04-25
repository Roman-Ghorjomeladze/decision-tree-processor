import { z } from "zod";

/**
 * We need basic validation to make sure that only accepted
 * action configuration will be handled by the app.
 */
export const actionSchema: z.ZodType<any> = z.lazy(() =>
	z.union([
		z.object({
			type: z.literal("SendSMS"),
			phoneNumber: z.string().min(1),
		}),
		z.object({
			type: z.literal("SendEmail"),
			from: z.string().email(),
			to: z.string().email(),
		}),
		z.object({
			type: z.literal("Condition"),
			expression: z.string().min(1),
			trueAction: actionSchema.optional(),
			falseAction: actionSchema.optional(),
		}),
		z.object({
			type: z.literal("Loop"),
			count: z.number().int().min(1),
			action: actionSchema,
		}),
	])
);
