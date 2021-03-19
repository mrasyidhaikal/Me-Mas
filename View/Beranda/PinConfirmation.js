import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput,Alert } from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Icon from 'react-native-vector-icons/Ionicons';
import CallAPIData from './../../Controller/CallAPI';
const { width: WIDTH} = Dimensions.get('window');

class pinConfirmation extends React.Component{
  
    constructor() {
        super()
        this.state = {
            PINCode: "",
        }
    }
   

    render(){
      const { navigation } = this.props;
    
    
      const { PINCode } = this.state;
    return(
        
        <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Buat Pin</Text>
        <Text style={styles.text}>Lengkapi data berikut sebelum melakukan transaksi</Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.inputContainer}>
                <SmoothPinCodeInput
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: '#666872',
                }}
                cellStyleFocused={{
                  borderColor: '#2eaebf',
                  borderBottomWidth: 3,
                }}
                textStyle ={{ color: '#2eaebf', fontSize: 24 }}
                codeLength={6}
                value={PINCode}
                onTextChange={PINCode => this.setState({ PINCode })}
                />
                </View>

               
            <TouchableOpacity onPress={this.onSubmit} style={styles.btnLogin} >
                  <Text style={styles.textButton}>Lanjut</Text>
            </TouchableOpacity>
            


            </View>
        </SafeAreaView>  
      </View>
      
    )
    }
}


export default pinConfirmation


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    logoContainer : {
      height:'40%',
      marginLeft : 40,
      alignContent:'space-around',
      justifyContent:'center',
    
    },
    bottomContainer : {
      height:'30%',
      alignItems:'center',
      justifyContent: 'center'
    },
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 5 ,
    //  fontFamily: 'Roboto-Bold',
      textAlign: 'left'
    },

    btnLogin: {
      width : WIDTH - 55,
      height : 45,
      borderRadius: 10,
      fontSize:16,
      backgroundColor:'#FFC52F',
      justifyContent:'center',
      marginTop: 20,
    },

    text: {
        color: '#666872',
        fontSize : 16,
      },
    inputContainer:{
        marginTop:10,
        
    },
    textButton:{
        color:'#fff',
        fontSize : 16,
        textAlign : 'center',
    },
  });
  