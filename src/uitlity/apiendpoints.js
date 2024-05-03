import axios from "axios";
export const fetchStack= async()=>{
  const URL = "https://jsonplaceholder.typicode.com/photos";
   try{    
    const response =await axios.get(URL);
    //console.log(response)
    if(response.status === 200){
        const data= await response.data;
       //console.log(data)
      return data;
    }
   }
   catch(error){
    console.log(error)
   }
}