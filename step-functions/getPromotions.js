import handler from "./libs/handler-lib";
import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export const call = handler(async (event, context) => {
  const params = {
    TableName: process.env.promotionsTable,
    IndexName: "decisionStatus",
    KeyConditionExpression: "decisionStatus = :decisionStatus",
    ExpressionAttributeValues: {
      ":decisionStatus": "decisionPending",
    },
  };
  const result = await client.query(params).promise();
  return result.Items;
});
