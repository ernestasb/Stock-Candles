const finnhub = require('finnhub');
const express = require('express');
var axios = require("axios").default;
const cors = require('cors')
var bodyParser = require('body-parser');
const mongoose = require('mongoose')


const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "cbqkb0iad3ibee6lup2g"
const finnhubClient = new finnhub.DefaultApi()

const mongoPassword = "stocand";

const app = express()

const port = "3001";
//app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(
   cors({
      origin: 'http://localhost:3000',
   })
)

app.get('/getCompanies', (req, res) => {
   console.log("Attempt to get company data...");
   finnhubClient.companyProfile2({ 'symbol': req.query.symbol }, (error, data, response) => {
      res.send(data);
      console.log("Get company data successfull")
   });
})

app.get('/stockCompany', (req, res) => {

   console.log("Attempt to get stock data...");
   finnhubClient.stockCandles(

      req.query.symbol,
      "D",
      req.query.from,
      req.query.to

      , (error, data, response) => {
         res.send(data);
         console.log("Get stock data successfull.");

      });
})

//posts userAction to mongodb
app.post('/postUserAction', (req, res) => {
   console.log("Attempt to post user data...");
   mongoose.connect(`mongodb+srv://stocand:${mongoPassword}@cluster0.y3jqpss.mongodb.net/stocand_db`, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => {


         mongoose.connection.collection('user_data').insertOne(req.body)
            .then(() => {

               console.log("User data posted: ");
               console.log(req.body);
               res.send("200")
               mongoose.connection.close();
            }
            );
         
      }).catch((erroras) => console.log(erroras));


})

app.listen(port, () => {
   console.log(`Server started at ${port}`);
})