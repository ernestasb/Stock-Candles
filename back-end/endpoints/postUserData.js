require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const mongoPassword = process.env.MONGO_PW


//posts userAction to mongodb
router.post('/', (req, res) => {
   mongoose.connect(`mongodb+srv://stocand:${process.env.MONGO_PW}@cluster0.y3jqpss.mongodb.net/stocand_db`, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => {
         mongoose.connection.collection('user_data').insertOne(req.body)
            .then(() => {
               res.sendStatus(200);
            });
      }).catch((erroras) => {
         res.sendStatus(200);
         console.log(erroras)
      }
      );

})

module.exports = router;