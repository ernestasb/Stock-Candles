import axios from 'axios'

const postUserAction = async (data) => {
   if (data.value) {
      const response = axios.post('http://localhost:3001/postUserAction', data)
         .catch(err => {
            console.log("userdata FAIL");
         })
      return response.data;
   }
}
export default postUserAction;