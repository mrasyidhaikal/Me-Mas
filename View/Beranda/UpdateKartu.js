import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView,Alert,ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Picker} from '@react-native-community/picker';
import CallAPIData from './../../Controller/CallAPI';
import CallAsyncData from './../../Controller/CallAsyncData';
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;


class UpdateKartu extends React.Component{
  
    constructor() {
        super()
        this.state = {
            showPass:true,
            press:false,
            norek:'',
            namarek:'',
            kodeBank : '',
            bankuseridUpdate:'',
            newBank:[],
          
        }
    }
    showPass = () => {
        if (this.state.press == false){
            this.setState({ showPass: false, press:true })
        }else{
            this.setState({ showPass: true, press:false })
        }
    }
    checkUpdate = async() =>{
        const { navigation,route } = this.props;  
        const { bankuserid} = route.params;
        const token = await CallAsyncData.getData('token')
        const response = await CallAPIData.getEmas(token,`http://104.248.156.113:8024/api/v1/Dashboard/GetBankUser/${bankuserid}`)
        const {data,statusCode} = response
      
        this.setState({bankuseridUpdate:data.bankuserid,norek:data.norekning,namarek:data.namapemilik,kodeBank:data.bankname})
    }

    showToast = (val) => {
        ToastAndroid.show(val, ToastAndroid.SHORT);
    };


    onDelete = async()=>{
        const { navigation } = this.props;  
        const token = await CallAsyncData.getData('token')
        const userid = await CallAsyncData.getData('userid')
        const response = await CallAPIData.postAPIToken('http://104.248.156.113:8024/api/v1/Dashboard/DeleteBankUser',JSON.stringify(
            {
                "primarykeyid": this.state.bankuseridUpdate,
                "userid": userid,
                "desc": "string",
                "op": "string",
                "pc": "string",
                "xuserid": "string",
                "xsourceid": "string",
                "xremarks": "string",
                "xsourcecode": "string",
                "xempname": "string",
                "ipaddress": "string",
                "connid": "string"
              }
        ),token)
        const {data,statusCode} = response
        
        if (statusCode == 200) {
            this.showToast("Delete Rekening Sukses !")
            navigation.navigate('DataRekening') 
        }else{
            Alert.alert('Gagal',data.head,[
               {text: 'Oke',onPress:() => console.log("closed")}
              ])
        }
    }
    onSubmit = async() =>{
        const { navigation,route } = this.props;  
        const { bankuserid} = route.params;

        const token = await CallAsyncData.getData('token')
        const userid = await CallAsyncData.getData('userid')
        const response = await CallAPIData.postAPIToken('http://104.248.156.113:8024/api/v1/Dashboard/AddBankUser',JSON.stringify({
            "bankuserid": bankuserid,
            "userid": userid,
            "bankname": this.state.kodeBank,
            "norekning": this.state.norek,
            "namapemilik": this.state.namarek,
            "status": "string",
            "op": "string",
            "pc": "string",
            "xuserid": "string",
            "xsourceid": "string",
            "xremarks": "string",
            "xsourcecode": "string",
            "xempname": "string",
            "ipaddress": "string",
            "connid": "string"
        }),token)
      
        const {data,statusCode} = response

        if (statusCode == 200) {
            this.showToast("Update Rekening Sukses !")
            navigation.navigate('DataRekening') 
        }else{
            Alert.alert('Gagal',data.head,[
               {text: 'Oke',onPress:() => console.log("closed")}
              ])
        }
    }
  
 
    componentDidMount(){
        this.checkUpdate()
    }
    render(){
        const { navigation } = this.props;  
      
    return(

        <View style={styles.container}>
           
        <SafeAreaView>
        <ScrollView>
        <View style={styles.NavBackContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={() => Alert.alert('Delete Kartu','Apakah Anda yakin ingin menghapus kartu ini?',[
                  {text: 'Hapus Kartu',onPress:() => this.onDelete()},{text: 'Batalkan',onPress:() => console.log("closed")}
                ])}>
                    <Text style={styles.textDelete}>Delete</Text>
            </TouchableOpacity>   
        </View>
            <Text style={styles.logoText}>Update Kartu</Text>
           
          
         
        </View>

        <View >
        <Picker
            mode= 'dropdown'
            selectedValue={this.state.kodeBank}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({kodeBank: itemValue})
            }>
         
            <Picker.Item label="Bank Mandiri" value="Bank Mandiri" />
            <Picker.Item label="Bank BNI" value="Bank BNI" />
            <Picker.Item label="Bank Artha Graha Internasional" value="Bank Artha Graha Internasional" />
            <Picker.Item label="Bank CIMB Niaga" value="Bank CIMB Niaga" />
            <Picker.Item label="Bank BCA" value="Bank BCA" />
            </Picker>
        </View>

       
        <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={val => this.setState({norek:val})}
                    placeholder={'Nomor Rekening'}
                    keyboardType = {'number-pad'}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                    value={this.state.norek}
                />
          
        </View>
        <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                 
                    onChangeText={val => this.setState({namarek:val})}
                    placeholderTextColor={'#666872'}
                    
                    value={this.state.namarek}
                />
          
        </View>
          <TouchableOpacity onPress={this.onSubmit}>
          <View style={styles.keamanan}>

            <View style={{flex:1,alignItems:'center'}}>    
               
                <Text style={styles.text}>Submit</Text>
            </View>  

          </View>
          </TouchableOpacity>
        
        </ScrollView>
        </SafeAreaView>  
    
      </View>
      
    )
    }
}


export default UpdateKartu


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1F1D2A',
   
    },
    NavBackContainer : {
       
        marginLeft:20,
        marginTop:windowHeight / 20
    
    },
    buttonDelete:{
        marginRight:30,
        borderWidth:2,
        borderRadius:10,
        backgroundColor:'#E14C4C',
        padding:4,
        paddingHorizontal:10
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
    textDelete:{
        fontSize:16,
        color:'#fff'
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
  