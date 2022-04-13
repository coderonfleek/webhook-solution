const statsd = new (require('statsd-client'))({
    host : "metrics-collector",
    port : 8125,
    prefix : "webhook-gateway"
})

module.exports = statsd;