import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;


class ChangePassword extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false
        }
    }
    showPass = () => {
        if (this.state.press == false){
            this.setState({ showPass: false, press:true })
        }else{
            this.setState({ showPass: true, press:false })
        }
    }
  
 
   
    render(){
      const { navigation } = this.props;
    return(
        
        <View style={styles.container}>
           
        <SafeAreaView>
        <ScrollView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Ubah Password</Text>

            </View>
         
        </View>

        <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Password Lama'}
                    secureTextEntry = {true}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
           
        </View>
        <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Password Baru'}
                    secureTextEntry = {true}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
          
        </View>
        <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'Konfirmasi Password Baru'}
                    secureTextEntry = {true}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
          
        </View>
       

     
       

         
        
          <TouchableOpacity>
          <View style={styles.keamanan}>

            <View style={{flex:1,alignItems:'center'}}>    
               
                <Text style={styles.text}>Ubah Password</Text>
            </View>  

          </View>
          </TouchableOpacity>
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default ChangePassword


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
       
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },


    keamanan:{
      flex:1,
      margin : 20,
      paddingVertical:15,
      paddingLeft:15,
      backgroundColor: '#FFC52F',
      borderRadius: 10,
      flexDirection:'row',
      
    },
   
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 5 ,
    //  fontFamily: 'Roboto-Bold',
    },
    textBerat: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 16,
      
    //  fontFamily: 'Roboto-Bold',
    },
    text: {
      color: '#1F1D2A',

      fontSize : 16,
    },
    textItem:{
        fontSize:13,
        color:'#666872',
        
    },
  
    

    btnLogin: {
      width : WIDTH - 55,
      height : 45,
      borderRadius: 10,
      fontSize:16,
      backgroundColor:'#252835',
      flexDirection:'row',
      justifyContent:'center',
      marginTop: 20,
    },
    inputContainer:{
        marginTop:10,
    },
    input: {
        width: WIDTH-55,
        height:45,
        borderRadius:10,
        fontSize:16,
        paddingLeft:20,
        backgroundColor:'#252835',
        color:'#fff',
        marginHorizontal:25,
    },
    inputIcon:{
        position: 'absolute',
        borderColor:'#666872',
        top:8,
        left:37,
        paddingRight:5,
        borderRightWidth : 1, 
    },
    btnEye:{
        position:'absolute',
        top:8,
        right:37,
    }
  });
  