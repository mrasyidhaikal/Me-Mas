import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput,Alert,FlatList,ToastAndroid } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import CallAPIData from '../../Controller/CallAPI';
import CallAsyncData from '../../Controller/CallAsyncData';
import Clipboard from 'expo-clipboard';
import moment from 'moment';
const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
const numColumn = 1
class detailJualTransaction extends React.Component{
  
    constructor() {
        super()

        this.state = {
          showPass:true,
          press:false,
           
            berat:0,
            copiedText:"",
            token:"",
            userid:"",
            hargaBeliToday:0,
            bankid:"",
            total:0,
            urlicon:"",
            pin:"",
            data:[],
            total:0,
            dataBank:{},
            hargaJual:0,
            bankuserid:"",
            userBankName:"",

            dateTransaksi:Date(),

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
        this.setState({data:data,total:data.total,transaksidate:data.transaksidate,hargaJual:data.harga})
        this.getBank()
        var dateTransaksii = new Date(this.state.data.transaksidate)
        this.setState({dateTransaksi:moment(dateTransaksii).add(3, "hours").format("YYYY-MM-DD HH:mm")})
        

      }
      currencyFormat(num) {
        return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
     }

     showToast = () => {
      ToastAndroid.show("Text Copied !", ToastAndroid.SHORT);
    };

      copyToClipboard = () => {
         Clipboard.setString(this.state.data.nova)
         this.showToast()
    }
      
    getBank = async() =>{
      const token = await CallAsyncData.getData('token')
    
      const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBank`
      const response = await CallAPIData.getEmas(token,url)
      const {data,statusCode} = response
    
      this.setState({dataBank:data})

    }
    // getBankUser = async() =>{
    //   const token = await CallAsyncData.getData('token')
    //   const { navigation,route } = this.props;
    //   const { bankUserID } = route.params;
    
    //   const url = `http://104.248.156.113:8024/api/v1/Dashboard/GetBankUser/${bankUserID}`
    //   const response = await CallAPIData.getEmas(token,url)
    //   const {data,statusCode} = response
    
    //   this.setState({userBankName:data.bankname})

    // }

    _renderItem =({item,index}) =>{
        if (this.state.data.bankid == item.bankid) {
          return(
  
            <View>
                <Image style={styles.imageBank}   
                    source={{
                    uri: item.urlicon,
                    }}/> 
            </View>
           
           )
        }
  }
  _renderItem2 =({item,index}) =>{
    if (this.state.data.bankid == item.bankid) {
      return(

        <View>
            <Text style={styles.text}>{item.bankname} {item.kategori}</Text>
        </View>
       
       )
    }
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
            <Text style={styles.logoText}>Bukti Transaksi</Text>
           
            </View>
         
        </View>
      

        <View style={styles.detailHarga}>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>No Transaksi</Text>
                    <Text style={styles.text}>{this.state.data.transaksicode}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Total Penjualan</Text>
                    <Text style={styles.text}>{this.currencyFormat(this.state.total)}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Berat Emas</Text>
                    <Text style={styles.text}>{this.state.data.berat} gr</Text>
                  </View>
                  <View style={styles.rowdivider}>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Deskripsi</Text>
                    <Text style={styles.text}>{'Penjualan Emas'}</Text>
                  </View>
                  <View style={styles.rowdivider}>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Tanggal Transaksi</Text>
                    <Text style={styles.text}>{moment(this.state.data.datetransaksi).format("DD MMM YYYY")}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Harga Jual Emas</Text>
                    <Text style={styles.text}>{this.currencyFormat(this.state.hargaJual)+"/gr"}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.texthead}>Bank</Text>
                    <Text style={styles.text}>{this.state.userBankName}</Text>
                  </View>
        </View>
        <View style={styles.btnBackground}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnJual} >
                      <Text style={styles.textButton}>Go Back</Text>
                  </TouchableOpacity>
        </View>
        {/* <View style={styles.detailHarga}>
                  <View style={styles.row}> */}
                  {/* <Image style={styles.imageBank}   
                    source={{
                    uri: ,
                    }}/>  */}
                 
                 {/* <View style={{marginTop:8}}> 
       
                  <FlatList
                    data={this.state.dataBank}
                    renderItem = {this._renderItem2}
                    keyExtractor={(item, index)=> index.toString()}
                  
                    numColumns = {numColumn}
                />
                  
                </View>
                </View>

                <View style={styles.row}>
                  <View>

                <FlatList
                    data={this.state.dataBank}
                    renderItem = {this._renderItem}
                    keyExtractor={(item, index)=> index.toString()}
                  
                    numColumns = {numColumn}
                />

                  </View>
                <TouchableOpacity style={styles.inputContainer} onPress={this.copyToClipboard}>
                <TextInput
                    style={styles.input}
                    value = {this.state.data.nova}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                    keyboardType = {'number-pad'}
                    editable = {false}
                />
                <View style={styles.btnEye}>
                    <Icon name={'ios-copy-outline'} size={25} color={'#6c62cc'}/>
                </View>
                </TouchableOpacity>
                  </View>
               
        </View> */}

        {/* <View style={styles.detailText}>

        <Text style={styles.deadlineText}>Selesaikan Pembayaranmu sebelum {this.state.dateTransaksi} WIB</Text>

            <View style={styles.rowText}>
              <Text style={styles.textDetail}>-</Text>
              <Text style={styles.textDetail}>Kamu memiliki Waktu 3 Jam sejak melakukan pembelian Emas ,segera lakukan Pembayaran</Text>
            </View>
            <View style={styles.rowText}>
            <Text style={styles.textDetail}>-</Text>
            <Text style={styles.textDetail}>Pembayaran ini membutuhkan konfirmasi setelah bayar . Jumlah emas mu akan otomatis bertambah ketika pembayaran mu berhasil</Text>
            </View>
            <View style={styles.rowText}>
            <Text style={styles.textDetail}>-</Text>
            <Text style={styles.textDetail}>Detail Transaksi ini dapat kamu lihat di menu "Transaksi"</Text>
            </View>
        </View> */}
          
        
      

          
            


           
        </SafeAreaView>  
      </View>
      
    )
    }
}


export default detailJualTransaction


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
    width:WIDTH / 2,
    height:40,
    borderRadius:10,
    fontSize:16,
    paddingLeft:10,
    backgroundColor:'#fff',
    borderColor:'#6c62cc',
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
  rowdivider :{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth:1,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    paddingVertical:10,
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
  btnBackground:{
    width : WIDTH - 55,
    marginHorizontal:25,
    marginVertical:10,
    paddingVertical:10,
    // backgroundColor: '#fff',
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
    deadlineText: {
      color : '#FD7557',
      fontWeight:'bold',
      fontSize : 20,
     
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

    texthead: {
        color: '#666872',
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
    btnJual: {
      width : WIDTH - 55,
      height : 45,
      borderRadius: 10,
      fontSize:16,
      backgroundColor:'#FFC52F',
      justifyContent:'center',
      marginTop: 20,
    },
  });
  