import AWS from "aws-sdk";

var client = AWS.DynamoDb.DocumentClient();

export const call = async (event, context) => {
  const messageBody = JSON.parse(event.Records[0].body);

  const params = {
    TableName: process.env.promotionsTable,
    Item: {
      decisionStatus: "decisionPending",
      taskToken: messageBody.TaskToken,
      details: messageBody.Message,
    },
  };

  return await client.put(params).promise();
};
