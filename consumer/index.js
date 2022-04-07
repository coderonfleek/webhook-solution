let amqp = require("amqplib/callback_api");

init();

async function init() {

    await sleep(10000);

    amqp.connect('amqp://message-queue:5672', function (connectError, connection) {

        if(connectError) throw connectError;

        connection.createChannel(function (channelCreateError, channel) {
            if (channelCreateError) throw channelCreateError;

            const queue = "webhooks-queue";

            channel.assertQueue(queue, {
                durable : false
            });

            console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function (msg) {
                console.log("[*] Recieved %s", msg.content.toString());
            }, {
                noAck: true
            })
        })

        
        
    })
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

