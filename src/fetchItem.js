"use strict";
const AWS = require("aws-sdk")

const fetchItem = async (event) => {

    const {id} = event.pathParameters;

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let item = "Item not found";

    try {
        const results = await dynamodb.get({
            TableName: "ItemTableNew",
            Key: {id}
        }).promise();

        item = results.Item;
    } catch (e) {
        item = JSON.stringify(e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item)
    };
}

module.exports = {
    handler: fetchItem
}
