'use strict'

const autocannon = require('autocannon');

autocannon({
    url : "http://localhost:1337",
    amount: 3000,
    connections: 10, //default
    pipelining: 1, // default
    duration: 300,
    requests: [
      {
        method: 'POST', // POST for creating a product
        path: '/ingest',
        body: JSON.stringify({ name: Date.now().toString(36) }),
        onResponse: (status, body, context) => {
          if (status === 200) {
            //context.product = JSON.parse(body)
          } // on error, you may abort the benchmark
        }
      }
    ]
  }, console.log)
  

  /*autocannon({
    url : "https://8qecudppu0.execute-api.us-east-2.amazonaws.com/live",
    amount: 3000,
    connections: 10, //default
    pipelining: 1, // default
    duration: 300,
    requests: [
      {
        method: 'POST', // POST for creating a product
        path: '/webhooksolutionapi',
        body: JSON.stringify({ name: Date.now().toString(36) }),
        onResponse: (status, body, context) => {
          if (status === 200) {
            //context.product = JSON.parse(body)
          } // on error, you may abort the benchmark
        }
      }
    ]
  }, console.log)
  */