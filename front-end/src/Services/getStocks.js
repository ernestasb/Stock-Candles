import axios from 'axios'

const getStocks = async (name, start, end) => {

   const response = await axios
      .get('http://localhost:3001/stockCompany', {
         params: {
            symbol: name,
            from: start,
            to: end
         }
      })
      .catch(err => {
         console.log("stock FAIL");
      })
   return response.data;
}
export default getStocks;