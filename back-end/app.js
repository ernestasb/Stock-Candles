const finnhub = require('finnhub');
const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser');
require('dotenv').config()


const app = express()
const port = process.env.PORT;
const frontEnd = process.env.FRONTEND;

const companies = require('./endpoints/getCompanyList')
const stocks = require('./endpoints/getCompanyStock')
const userData = require('./endpoints/postUserData')

app.use(bodyParser.json());
app.use(
   cors({
      origin: frontEnd,
   })
)

app.use('/getCompanies', companies)
app.use('/stockCompany', stocks)
app.use('/postUserAction', userData)





app.listen(port, () => {
   console.log(`Server started at ${port}`);
})