import AWS from "aws-sdk";

const client = new AWS.DynamoDB.DocumentClient();

export const call = async (event, context) => {
  const params = {
    TableName: process.env.promotionsTable,
    Item: {
      decisionStatus: "decisionPending",
      taskToken: event.taskToken,
      details: event.employeeDetails,
    },
  };

  return await client.put(params).promise();
};
