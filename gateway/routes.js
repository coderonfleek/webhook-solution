const express = require("express");
let amqp = require("amqplib/callback_api");
const Utility = require("./utility");

const router = express.Router();

router.post("/ingest", function (req, res) {

    amqp.connect("amqp://message-queue:5672", function (connectError, connection) {
        if(connectError){
            throw connectError;
        }

        connection.createChannel(function (channelCreateError, channel) {
            if(channelCreateError) throw channelCreateError;

            const queue = "webhooks-queue";

            channel.assertQueue(queue, {
                durable : false
            })

            req.headers['gateway-trace-id'] = Utility.uuidGenerator();
            
            let webhook_data = {
                headers : req.headers,
                body : req.body

            };

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(webhook_data)));

            res.send("Ingestion Successful");
        })
    })
    
})

module.exports = router;