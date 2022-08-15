import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep';

const getCompanies = async (name) => {

   const response = await axios
      .get('http://localhost:3001/getCompanies', {
         params: { symbol: name }
      })
      .catch(err => {
         console.log("company FAIL");
      })

   let list = []
   //duplicate in list since API only returns one
   if (Object.keys(response.data).length) {
      list.push(cloneDeep(response.data));
      list[0].name = list[0].name + " (copy)";
      list.push(response.data);

   }

   return list;
}
export default getCompanies;