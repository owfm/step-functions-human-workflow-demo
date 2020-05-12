# Run this project
This repo accompanies [this](https://medium.com/p/46c0a3412fe4) article. Please head there for an explanation. 

You'll need Serverless Framework set up on your machine to run this app. 

Once you've cloned this project, go into the step-function folder and run:

    yarn
    sls deploy

You'll need to take note of the API ID for API Gateway that is created from the output from Serverless Framework. 

Go into the client directory and run:

    yarn
    touch .env
    
In your .env file add:
`REACT_APP_API_URL=https://<YOUR_API_ID>.execute-api.eu-west-1.amazonaws.com/dev`

Then start the client:
`yarn start`

Head into the Step Functions service of the AWS Console and find your state machine. Click 'New Execution' and pass in an empty JSON string. 
Head back to the client in the browser and after a few moments click 'refresh'. You should see a card with a random "promotion proposal". Accept or reject it. 
Head back to the AWS Console and find the execution. You should see it has resolved into the appropriate state. Have a look around the various states on the right hand side to see how the data changes as it flows through the State Machine. 
 