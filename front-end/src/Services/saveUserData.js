import axios from 'axios'

const postUserAction = async (data) => {

   if(data.value){
   const response = await axios
      .post('http://localhost:3001/postUserAction', data)
      .catch(err => {
         console.log("userdata FAIL");
      })
      
   }
}
export default postUserAction;