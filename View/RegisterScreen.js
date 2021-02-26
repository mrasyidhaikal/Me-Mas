import { StatusBar } from 'expo-status-bar';
import React, { Component,useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');

class Register extends React.Component{
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false,
            visibility:false,
            DateDisplay:"",
            TextInputDisableStatus: true,
            displayFormat: 'DD/MM/YYYY',
            
     
        }
    }

    handleConfirm=(date)=>{
        this.setState({DateDisplay:date})
      
    }
    onPressCancel=()=>{
        this.setState({visibility:false})
        this.setState({TextInputDisableStatus:true})
    }
    onPressButton=()=>{
        this.setState({visibility:true})
        this.setState({TextInputDisableStatus:false})
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
        const { date } = this.state;
        const { onClose, onChange } = this.props;
        const showMode = (currentMode) => {
            setShow(true);
         
          };
         
    return(
      
        <View style={styles.container}>
             
        <SafeAreaView>
         
            <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Lengkapi Data Dirimu</Text>
        <Text style={styles.text}>Lengkapi data berikut sebelum melakukan transaksi</Text>
            </View>
           
            <View style={styles.bottomContainer}>
            <ScrollView
                style={styles.contentContainer}
                showsVerticalScrollIndicator={true}
              >
                <View style={styles.inputContainer}>
                <Text style={styles.LabelInput}>Nomor KTP</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Email'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
               
                </View>

                <View style={styles.inputContainer}>
                <Text style={styles.LabelInput}>Nama Lengkap Sesuai KTP</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Nama Lengkap'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
                </View>

                <View style={styles.inputContainer}>
                <Text style={styles.LabelInput}>Tempat Lahir</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Tempat Lahir Kamu'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.LabelInput}>Tanggal Lahir</Text>
                   
                        <TextInput
                            style={styles.input}
                            placeholder={'Tempat Lahir Kamu'}
                            placeholderTextColor={'#666872'}
                            underlineColorAndroid='transparent'
                            // pointerEvents="none"
                            editable={this.state.TextInputDisableStatus}  
                            pointerEvents="none"
                            selectTextOnFocus={false}
                            onTouchStart={this.onPressButton}
                            value={this.state.DateDisplay ? moment(this.state.DateDisplay).format(this.state.displayFormat) : ''}
                        />
                 {/* {this.state.DateDisplay} */}
                  
                  
               
                    <DateTimePickerModal mode="date" isVisible={this.state.visibility} onConfirm={this.handleConfirm} onCancel={this.onPressCancel}/>
                </View>

                <View style={styles.inputContainer}>
                <Text style={styles.LabelInput}>Tanggal Lahir</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Tempat Lahir Kamu'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
         
                />
        
         
                </View>
                <View style={styles.inputContainer}>
                <Text style={styles.LabelInput}>Tanggal Lahir</Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Tempat Lahir Kamu'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
                </View>

               
            <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('pin') }>
                  <Text style={styles.textButton}>Masuk</Text>
            </TouchableOpacity>
            </ScrollView>
            </View>
       
        </SafeAreaView>  
       
      </View>
   
    )
    }
}


export default Register


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    logoContainer : {
      height:'20%',
      marginLeft : 40,
      alignContent:'space-around',
      justifyContent:'center',
    
    },
    bottomContainer : {
      height:'80%',
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
    subLogo: {
      color : '#666872',
      fontSize : 15,
    },
    btnLogin: {
      width : WIDTH - 55,
      height : 45,
      borderRadius: 10,
      fontSize:16,
      backgroundColor:'#FFC52F',
      justifyContent:'center',
      marginTop: 20,
      marginBottom:40,
      marginLeft:20,
      
    },
    text: {
      color: '#666872',
      fontSize : 16,
    },
    textButton:{
        color:'#fff',
        fontSize : 16,
        textAlign : 'center',
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
    LabelInput:{
        width: WIDTH-55,
        color:'#fff',
        fontSize:16,
        paddingLeft:35,
        paddingBottom:15
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
  