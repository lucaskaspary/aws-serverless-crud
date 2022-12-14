"use strict";
const AWS = require("aws-sdk")

const updateItem = async (event) => {
    const {id} = event.pathParameters;
    const {itemStatus} = JSON.parse(event.body);

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let ret;

    try {
        const results = await dynamodb.update({
            TableName: "ItemTableNew",
            Key: {id},
            UpdateExpression: 'set itemStatus = :itemStatus',
            ExpressionAttributeValues: {
                ':itemStatus': itemStatus
            },
            ReturnValues: 'ALL_NEW'
        }).promise();
        ret = 'Item Updated';
    } catch (e) {
        ret = JSON.stringify(e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(ret)
    };
}

module.exports = {
    handler: updateItem
}
