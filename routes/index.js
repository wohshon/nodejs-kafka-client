var express = require('express');
var router = express.Router();
const kafka = require('kafka-node');
const config = require('../config');
//const client = new kafka.KafkaClient({kafkaHost: '192.168.0.110:9092'});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(config.kafka_topic);


  Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  client = new kafka.KafkaClient({kafkaHost: '192.168.0.110:9092'}),
  producer = new Producer(client),
  //km = new KeyedMessage('key', 'message'),
  payloads = [
      { topic: 'topic1', messages: 'hi', partition: 0 },
      //{ topic: 'topic2', messages: ['hello', 'world', km] }
      { topic: 'topic1', messages: ['hello', 'world1'] }
  ];
  producer.on('ready', function () {
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
  });

  producer.on('error', function (err) {});

  Consumer = kafka.Consumer,
  //client = new kafka.KafkaClient(),
  consumer = new Consumer(
      client,
      [
          //{ topic: 't', partition: 0 }, { topic: 't1', partition: 1 }
          { topic: 'topic1', partition: 0 }, { topic: 'topic1', partition: 1 }, { topic: 'topic1', partition: 2 }
      ],
      {
          autoCommit: false
      }
  );  
  consumer.on('message', function (message) {
    console.log(message);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
