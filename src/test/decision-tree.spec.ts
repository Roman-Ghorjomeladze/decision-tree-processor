import request from "supertest";
import app from "../server/app";
/**
 * On real project I'd add more tests (both Unit and E2E) but for test one
 * I think those E2E tests are enough.
 */
describe("Decision Tree API (TS)", () => {
	it("should return success on valid tree", async () => {
		const tree = {
			type: "Condition",
			expression: "Math.random() > score",
			context: {
				score: 0.2,
			},
			trueAction: {
				type: "SendSMS",
				phoneNumber: "+995555123456",
			},
			falseAction: {
				type: "SendEmail",
				from: "noreply@example.com",
				to: "underage@example.com",
			},
		};

		const res = await request(app).post("/api/execute").send(tree).expect(200);

		expect(res.body).toEqual({ status: "Execution completed" });
	});

	it("should return error on invalid expression", async () => {
		const tree = {
			type: "Condition",
			expression: "some invalid expression",
			context: {
				score: 0.2,
			},
			trueAction: {
				type: "SendSMS",
				phoneNumber: "+995555123456",
			},
			falseAction: {
				type: "SendEmail",
				from: "noreply@example.com",
				to: "underage@example.com",
			},
		};

		const res = await request(app).post("/api/execute").send(tree).expect(400);

		expect(res.body).toEqual({ error: "Failed to evaluate the expression." });
	});
});
