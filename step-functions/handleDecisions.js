import handler from "./libs/handler-lib";
import AWS from "aws-sdk";

const stepfunctions = new AWS.StepFunctions();
const client = new AWS.DynamoDB.DocumentClient();

export const call = handler(async (event, context) => {
  const body = JSON.parse(event.body);

  var sf_params = {
    output: JSON.stringify(body.decision),
    taskToken: body.taskToken,
  };

  var db_params = {
    TableName: process.env.promotionsTable,
    Key: { taskToken: body.taskToken },
    UpdateExpression: "SET decisionStatus = :decisionStatus",
    ExpressionAttributeValues: {
      ":decisionStatus": body.decision,
    },
    ReturnValues: "ALL_NEW",
  };

  return await Promise.all([
    stepfunctions.sendTaskSuccess(sf_params).promise(),
    client.update(db_params).promise(),
  ]);
});
