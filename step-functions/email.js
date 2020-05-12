"use-strict";

export const congratulations = (event, context, callback) => {
  callback(
    null,
    `Dear ${event.employeeDetails.employeeName}, Congrats! 
		We'd like to offer you the promotion to the role of ${event.employeeDetails.proposedRole}!"`
  );
};

export const commiserations = (event, context, callback) => {
  callback(
    null,
    `Dear ${event.employeeDetails.employeeName}, 
		We're sorry but your promotion to the role of ${event.employeeDetails.proposedRole} was unsuccessful this time."`
  );
};
