




  
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';

class Logout extends React.Component{

    onLogout = async () => {
        
        try{
          await AsyncStorage.clear()
        
        }catch(err){
          console.log(err)
        }
    }
    
}
const CallLogout = new Logout()

export default CallLogout