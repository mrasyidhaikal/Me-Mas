import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,Alert } from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Icon from 'react-native-vector-icons/Ionicons';
import CallAPIData from './../../Controller/CallAPI';
import CallAsyncData from './../../Controller/CallAsyncData';
const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
class pinConfirmation extends React.Component{
  
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
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
     }
     onSubmit = async () => {
      const { navigation } = this.props;  
      const namaUser = await CallAsyncData.getData('name')
      const emailUser = await CallAsyncData.getData('email')
     
      const phone = await CallAsyncData.getData('phone')
      const response = await CallAPIData.postAPIToken('http://104.248.156.113:8024/api/v1/Dashboard/BeliEmas',
        JSON.stringify(
        {
          "userid": this.props.route.params.userid,
          "berat": this.props.route.params.berat,
          "harga": this.props.route.params.total,
          "total": this.props.route.params.total,
          "nopin": this.state.pin,
          "remarks": "string",
          "nama": namaUser,
          "email": emailUser,
          "phone": phone,
          "bankid": this.props.route.params.bankid,
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
        const {data,statusCode} = response
        // console.log(data)
        if (statusCode == 200) {
          if (response.data.success == false){
              Alert.alert("Transaksi Gagal!",data.head,[
                {text: 'Oke',onPress:() => console.log("closed")}
              ])
          }else{
             navigation.navigate('detail',{transactionID:data.text})
          }
       
        }else{
          
        }

    }

    render(){

      const { navigation } = this.props;
      const { PINCode } = this.state;
  
    return(
        
        <View style={styles.container}>
        <SafeAreaView>
        <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={styles.logoText}>Konfirmasi Pembelian</Text>
           
            </View>
         
        </View>
        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                  <Text style={styles.text}>Berat Emas</Text>
                  <Text style={styles.text}>{Number((this.props.route.params.berat).toFixed(4))}/gr</Text>
                </View>
        </View>

        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                    <Text style={styles.text}>Total Pembelian</Text>
                    <Text style={styles.text}>{this.currencyFormat(this.props.route.params.total)}</Text>
                  </View>
                  <View style={styles.row}>
                    <View style={styles.row}>
                    <Text style={styles.text}>Biaya VA</Text>
                    </View>
                    <View>
                    <Text style={styles.text}>{this.currencyFormat(4500)}</Text>
                    </View>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.text}>Total Pembayaran</Text>
                    <Text style={styles.text}>{this.currencyFormat(this.props.route.params.total + 4500)}</Text>
                  </View>
        </View>
        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                  <Image style={styles.imageBank}   
                    source={{
                    uri: this.props.route.params.urlicon,
                    }}/> 
                 
                 <View style={{marginTop:8}}> 
                  <Text style={styles.text}>{this.props.route.params.kategori}</Text>
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


export default pinConfirmation


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
  