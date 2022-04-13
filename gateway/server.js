const express = require("express");
const routes = require("./routes");

const SDC = require("statsd-client");

const statsd = require("./statsd-object");

const app = express();

const port = process.env.PORT || "1337";
app.set("port", port);

//track inbound requests
app.use(statsd.helpers.getExpressMiddleware(
    'inbound',
    {
        timeByUrl : true 
    }
));

app.use("/", routes);

app.listen(port, () => console.log("API Gateway Listening"));