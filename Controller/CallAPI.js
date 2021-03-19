
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';


const processResponse = async(response)=> {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then(res => ({
      statusCode: res[0],
      data: res[1]
    }));
  }
class CallAPI extends React.Component{
   
    getAPI = async(url,isiBody) => {
     
      let API = await fetch(url, {
          
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: isiBody
            })
            let res = await processResponse(API)
        
            return res   
    }
    getEmas = async(clientToken,url) => {
      
      let API = await fetch(url, {
          
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + clientToken,
            }
            })
            let res = await processResponse(API)
        
            return res   
    }
    
}
const callAPI = new CallAPI()

export default callAPI