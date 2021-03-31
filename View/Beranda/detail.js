import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput,Alert } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CallAPIData from './../../Controller/CallAPI';
import CallAsyncData from './../../Controller/CallAsyncData';

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
class detail extends React.Component{
  
    constructor() {
        super()

        this.state = {
          showPass:true,
          press:false,
           
            berat:0,
            token:"",
            userid:"",
            hargaBeliToday:0,
            bankid:"",
            total:0,
            urlicon:"",
            pin:"",
            data:[],
            total:0,
        }
    }
    showPass = () => {      
     
      if (this.state.press == false){
          this.setState({ showPass: false, press:true })
      }else{
          this.setState({ showPass: true, press:false })
      }
  }
  
    checkPin = async() =>{
      const { navigation,route } = this.props;  
      const { transactionID } = route.params;

        const token = await CallAsyncData.getData('token')
        const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetTransaksi/${transactionID}`
        const response = await CallAPIData.getEmas(token,url)
        const {data,statusCode} = response
        this.setState({data:data,total:data.total})
     
      }
      currencyFormat(num) {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
     }
     onSubmit = async () => {
    

    }
    componentDidMount(){
        this.checkPin()
       }
    render(){

      const { navigation } = this.props;

     
    return(
        
        <View style={styles.container}>
        <SafeAreaView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Selesaikan Pembayaran</Text>
           
            </View>
         
        </View>
      

        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                    <Text style={styles.text}>No Transaksi</Text>
                    <Text style={styles.text}>{this.state.data.transaksicode}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.text}>Berat Emas</Text>
                    <Text style={styles.text}>{this.state.data.berat} gr</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.text}>Total Pembayaran</Text>
                    <Text style={styles.text}>{this.currencyFormat(this.state.total)}</Text>
                  </View>
        </View>
        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                  {/* <Image style={styles.imageBank}   
                    source={{
                    uri: ,
                    }}/>  */}
                 
                 <View style={{marginTop:8}}> 
                  <Text style={styles.text}></Text>
                </View>
                </View>

                <View style={styles.row}>
                  <View style={{marginTop:10}}>
                    <Text style={styles.text}>Konfirmasi PIN</Text>
                    </View>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={'PIN'}
                    maxLength={6}
                    onChangeText={val => this.setState({pin:val})}
                    secureTextEntry = {this.state.showPass}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                    keyboardType = {'number-pad'}
                />
      

                <TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ?'ios-eye-outline' : 'ios-eye-off-outline'} size={25} color={'#666872'}/>
                </TouchableOpacity>
                </View>
                  </View>
               
        </View>

        <View style={styles.detailText}>
            <View style={styles.rowText}>
              <Text style={styles.textDetail}>1.</Text>
              <Text style={styles.textDetail}>Pastikan data sudah benar,lalu selesaikan pembayaran</Text>
            </View>
            <View style={styles.rowText}>
            <Text style={styles.textDetail}>2.</Text>
            <Text style={styles.textDetail}>Nomor Virtual account akan Muncul di halaman selanjutnya</Text>
            </View>
             
        </View>
          
        
      

            <View style={{alignSelf:'center'}}>
            <TouchableOpacity onPress={this.onSubmit} style={styles.btnLogin} >
                  <Text style={styles.textButton}>Lanjut</Text>
            </TouchableOpacity>
            </View>
            


           
        </SafeAreaView>  
      </View>
      
    )
    }
}


export default detail


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
 
    NavBackContainer : {
      marginLeft:20,
      marginTop:windowHeight / 20,
      paddingBottom:20,
  
  },
  inputIcon:{
    position: 'absolute',
   
    top:8,
    left:37,
    paddingRight:5,
    
},
  inputContainer:{
    marginTop:0,
  },
  input: {
   width:WIDTH/2.5,
    height:40,
    borderRadius:10,
    fontSize:16,
    paddingLeft:10,
    backgroundColor:'#fff',
    borderColor:'#000',
    borderWidth:1,
    color:'#000',
   
},
  row :{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth:1,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingVertical:5,
  },
  rowText :{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
    
    paddingVertical:5,
  },
  detailHarga:{
    width : WIDTH - 55,
    marginHorizontal:25,
    marginVertical:10,
    paddingVertical:10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  detailText:{
    width : WIDTH - 55,
    marginHorizontal:25,
    marginVertical:10,
    paddingVertical:10,
    borderRadius: 10,
  },
  btnEye:{
    position:'absolute',
    top:8,
    right:10,
    },
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 5 ,
    //  fontFamily: 'Roboto-Bold',
      textAlign: 'left'
    },
    imageBank:{
      width:40,
      height:40,
      
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
        color: '#141414',
        fontSize : 16,
     
      },
   textDetail:{
    color:'#666872',
    fontSize:16,
   },
    textButton:{
        color:'#fff',
        fontSize : 16,
        textAlign : 'center',
    },
  });
  