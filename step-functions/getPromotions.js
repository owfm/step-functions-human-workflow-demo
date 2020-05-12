import handler from "./libs/handler-lib";
import ddb from "./libs/dynamodb-lib";

export const call = handler(async (event, context) => {
  const params = {
    TableName: process.env.promotionsTable,
    IndexName: "decisionStatusGsi",
    KeyConditionExpression: "decisionStatus = :decisionStatus",
    ExpressionAttributeValues: {
      ":decisionStatus": "decisionPending",
    },
  };
  const result = await ddb.query(params);
  return result.Items;
});
