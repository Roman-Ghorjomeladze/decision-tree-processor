# Decision Tree Evaluation Backend

This project implements a backend service to evaluate decision trees and execute corresponding actions.

## Installation

### Prerequisites

Make sure you have the following installed:

-   **Node.js** (v16 or higher)
-   **npm** (or yarn)

### Steps to Install

1. Clone the repository:

    ```bash
    git clone https://github.com/Roman-Ghorjomeladze/decision-tree-processor.git
    cd decision-tree-processor
    ```

2. Install dependencies:

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

## Usage

The main part of this project is the **`ExpressionEvaluator`** class, which evaluates expressions in decision trees using either **`filtrex`** or **`expr-eval`**. The service accepts an expression and context and returns the evaluation result.

### Example JSON Input for Decision Tree

The decision tree's expression, context, and actions are defined in the following way:

```json
{
	"type": "Condition",
	"expression": "Math.random() > score",
	"context": {
		"score": 25
	},
	"trueAction": {
		"type": "SendSMS",
		"phoneNumber": "+995555123456"
	},
	"falseAction": {
		"type": "SendEmail",
		"from": "noreply@example.com",
		"to": "underage@example.com"
	}
}
```

-   **Condition**: Evaluates the expression.
-   **trueAction / falseAction**: Defines what actions to take based on the evaluation result (e.g., sending an SMS or email).

### Custom Functions

Custom functions, like `Math`, are supported and passed into the evaluation context. You can define more custom functions if needed for more complex expressions.

### Evaluation Flow

1. The expression is compiled using **`filtrex`**.
2. If **`filtrex`** evaluation fails, **`expr-eval`** is used as a fallback.
3. The context is dynamically injected to evaluate the expression, and the result is returned.

## Testing

To test the functionality, you can send POST requests to the **`/execute`** endpoint with a JSON body containing the `expression` and `context`. Also context is optional, user can place actual values dyrectly in expession or put placeholders in expression and place values in context.

### Example Requests:

```json
POST http://localhost:3000/api/execute

{
	"type": "Condition",
	"expression": "Math.random() > score",
	"context": {
		"score": 0.2
	},
	"trueAction": {
		"type": "SendSMS",
		"phoneNumber": "+995555123456"
	},
	"falseAction": {
		"type": "SendEmail",
		"from": "noreply@example.com",
		"to": "underage@example.com"
	}
}
```

```json
POST http://localhost:3000/api/execute

{
  "type": "Loop",
  "count": 3,
  "action": {
    "type": "Condition",
    "expression": "Math.random() > 0.5",
    "trueAction": {
      "type": "SendSMS",
      "phoneNumber": "+123456789"
    },
    "falseAction": null
  }
}
```

```json
POST http://localhost:3000/api/execute

{
  "type": "SendSMS",
  "phoneNumber": "+995555123456"
}
```

### Example Responses:

Expression is invalid

```json
{
	"error": "Failed to evaluate the expression."
}
```

Successful execution

```json
{
	"status": "Execution completed"
}
```
