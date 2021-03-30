import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,ScrollView,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const harga = [{key:'100rb'},{key:'250rb'},{key:'500rb'},{key:'750rb'},{key:'1jt'},{key:'Lainnya'}]
const numColumn = 3
class BeliEmas extends React.Component{
  
    constructor() {
        super()
        this.state = {
            berat:0,
            // beratEmas:0,
            showPass:true,
            press:false
        }
    }
 
    _renderItem =({item,index}) =>{
      
        return(
          <View style={styles.item}>
            <TouchableOpacity>
            <Text style={styles.textBerat}>{item.key}</Text>
            </TouchableOpacity>
          </View>
        )
    }

    checkBerat=()=>{
      const { navigation,route } = this.props;
      if(this.state.berat  > this.props.route.params.userSaldo ){
        Alert.alert('Jual Emas Gagal',"Jumlah Emas Melebihi Jumlah Emas yang dimiliki !",[
          {text: 'Oke',onPress:() => console.log("closed")}
        ])
        // console.log(this.props.route.params.userid)
      }else{


        const {hargaJualToday,token,userid,saldoUang,userSaldo} =  route.params
   
        
        navigation.navigate('ListKartu',{berat:this.state.berat,hargaJualToday:hargaJualToday,token:token,userid:userid,saldoUang:saldoUang,userSaldo:userSaldo})

      }
    }

    currencyFormat(num) {
      return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
   }

    
    componentDidMount(){
      
    }

    render(){
      const { navigation } = this.props;
    
      return(
        
        <View style={styles.container}>
           
        <SafeAreaView style={{flex: 1}}>
        <ScrollView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>

            <Text style={styles.logoText}>Jual Emas</Text>
           
        </View>

        <View style={styles.detailHarga}>
                <View style={{flexDirection:'row',justifyContent:'space-around',}}>
                  <Text style={styles.text}>Harga Jual</Text>
                <Icon name={'ios-chevron-forward-sharp'} size={28} color={'#fff'}/>
                  <Text style={styles.text}>{this.currencyFormat(this.props.route.params.hargaJualToday)}/gr</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:20}}>
                  <Text style={styles.subText}>Per/01/01/2021</Text>
                </View>
        </View>
        
        <View style={styles.detailSaldo}>
              <Text style={styles.text}>Saldo Emas</Text>
              <Text style={styles.logoText}>{this.currencyFormat(this.props.route.params.saldoUang)}</Text>
              <Text style={styles.text}>{this.props.route.params.userSaldo} Gram</Text>
        </View>
     
        <View style={styles.beratEmas}>
            <Text style={styles.text}>Input berat emas (gram)</Text>
            <TextInput
                    style={styles.input}
                    keyboardType = 'number-pad'
                    onChangeText={val => this.setState({berat:val})}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
        </View>

         
        
      <View style={{alignSelf:'center'}}>
      <TouchableOpacity onPress={this.checkBerat} style={styles.btnLogin} >
                  <Text style={styles.text}>Jual Emas</Text>
      </TouchableOpacity>
      </View>
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default BeliEmas


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
      marginTop:50,
      marginLeft : 30,
      alignContent:'space-around',
      justifyContent:'center',
      marginTop:windowHeight / 20,
    
    },
    detailHarga:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#252835',
      borderRadius: 10,
    },
    detailSaldo:{
        width : WIDTH - 55,
        margin : 20,
        paddingVertical:10,
        backgroundColor: '#6c62cc',
        borderRadius: 10,
        alignItems:'flex-start',
        padding:20,
      },
    beratEmas:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#252835',
      borderRadius: 10,
      flexDirection:'column',
      alignItems : 'center',
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
      fontSize : 18,
      textAlign:'center',
    //  fontFamily: 'Roboto-Bold',
    },
    text: {
      color: '#fff',
      textAlign : 'center',
      fontSize : 16,
    },
    subText: {
      fontSize:12,
      color:'#fff'
    },
    boxHorizontal:{
      flexDirection:"row",
      marginTop:10,
      justifyContent:'center'
     
    },
    item :{
      backgroundColor : '#1F1D2A',
      borderColor: '#252835',
      borderWidth:2,
      alignItems:'center',
      borderRadius:10,
      justifyContent:'center',
      height : 70,
      margin:10,
      flex:1,
    },
    input: {
      width: WIDTH-200,
      height:45,
      fontSize:16,
     
      borderBottomColor: '#666872',
      borderBottomWidth:2,
      color:'#FFC52F',
      fontWeight:'bold',
      textAlign:'center',
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
  });
  