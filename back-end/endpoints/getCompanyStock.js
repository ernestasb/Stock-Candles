require('dotenv').config()
const express = require('express')
const router = express.Router()
const finnhub = require('finnhub');
const finnhubClient = new finnhub.DefaultApi()
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.API_KEY


router.get('/', (req, res) => {

   finnhubClient.stockCandles(
      req.query.symbol,
      "D",
      req.query.from,
      req.query.to
      , (error, data, response) => {
         res.send(data);

      });
})

module.exports = router;