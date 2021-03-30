import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,Alert } from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Icon from 'react-native-vector-icons/Ionicons';
import CallAPIData from './../../Controller/CallAPI';
import CallAsyncData from './../../Controller/CallAsyncData';
const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
class KonfirmasiJual extends React.Component{
  
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
        }
    }
    showPass = () => {      
     
      if (this.state.press == false){
          this.setState({ showPass: false, press:true })
      }else{
          this.setState({ showPass: true, press:false })
      }
  }
    
  
      currencyFormat(num) {
        return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
     }
     onSubmit = async () => {
      const { navigation } = this.props;  
      const namaUser = await CallAsyncData.getData('name')
      const emailUser = await CallAsyncData.getData('email')
     
      const phone = await CallAsyncData.getData('phone')
      const total = this.props.route.params.berat * this.props.route.params.hargaJualToday
  
      const response = await CallAPIData.postAPIToken('http://104.248.156.113:8024/api/v1/Dashboard/JualEmas',
        JSON.stringify(
        {
            "userid": this.props.route.params.userid,
            "berat": this.props.route.params.berat,
            "harga": this.props.route.params.hargaJualToday,
            "total": total,
            "nopin": this.state.pin,
            "remarks": "string",
            "nama": namaUser,
            "email": emailUser,
            "phone": phone,
            "bankuserid": this.props.route.params.bankid,
            "op": "string",
            "pc": "string",
            "xuserid": "string",
            "xsourceid": "string",
            "xremarks": "string",
            "xsourcecode": "string",
            "xempname": "string",
            "ipaddress": "string",
            "connid": "string"
      }),this.props.route.params.token
        )
        console.log(response)
        const {data,statusCode} = response
        if (statusCode == 200) {
          console.log("oke seppppp")
           navigation.navigate('Transaksi')
       
        }else{
          Alert.alert('Login Gagal',data.head,[
            {text: 'Oke',onPress:() => console.log("closed")}
          ])
        }

    }

    render(){

      const { navigation } = this.props;
      const { PINCode } = this.state;
      let total = this.props.route.params.berat * this.props.route.params.hargaJualToday
      let diterima = total - 4500
    return(
        
        <View style={styles.container}>
        <SafeAreaView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Konfirmasi Penjualan</Text>
           
            </View>
         
        </View>

        <View style={styles.detailText}>
            <Text style={styles.textDetail}>Rincian Penjualan</Text>
        </View>
        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                  <Text style={styles.text}>Berat Emas</Text>
                  <Text style={styles.text}>{this.props.route.params.berat} /gr</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Nilai Rupiah</Text>
                  <Text style={styles.text}>{this.currencyFormat(total)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Biaya Admin</Text>
                  <Text style={styles.text}>{this.currencyFormat(4500)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Uang yang Diterima</Text>
                  <Text style={styles.text}>{this.currencyFormat(diterima)}</Text>
                </View>
        </View>
        <View style={styles.detailText}>
            <Text style={styles.textDetail}>Rekening Penerima</Text>
        </View>
        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                  <Text style={styles.text}>Rekening</Text>
                  <Text style={styles.text}>{this.props.route.params.bankname}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>No. Rekening</Text>
                  <Text style={styles.text}>{this.props.route.params.norek}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Atas Nama</Text>
                  <Text style={styles.text}>{this.props.route.params.namapemilik}</Text>
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


export default KonfirmasiJual


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
 
    NavBackContainer : {
      marginLeft:20,
      marginTop:windowHeight / 20,
      paddingBottom:5,
  
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
    marginVertical:5,
   
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
  