import * as cdk from '@aws-cdk/core';
import {CognitoConstruct} from "./Cognito/CognitoConstruct";
import UsersDynamoDbTable from "./dynamodb/UsersDynamoDbTable";
import {LambdaConstruct} from "./lambdas/LambdaConstruct";
import {ApiGatewayConstruct} from "./apiGateway/ApiGatewayConstruct";

export class UserManagerServerlessStack extends cdk.Stack {
    private static readonly API_ID = 'UserManagerApi';

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const cognitoConstruct = new CognitoConstruct(this)
        const usersDynamoDbTable = new UsersDynamoDbTable(this);
        const lambdaConstruct = new LambdaConstruct(this, usersDynamoDbTable);
        new ApiGatewayConstruct(this, cognitoConstruct.userPoolArn, lambdaConstruct);
    }
}
