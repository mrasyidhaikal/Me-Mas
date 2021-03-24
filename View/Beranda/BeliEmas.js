import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image, Dimensions,TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons'
import { render } from 'react-dom';

const { width: WIDTH} = Dimensions.get('window');
const harga = [{id:'1',key:'100rb',value:100000},{id:'2',key:'250rb',value:250000},{id:'3',key:'500rb',value:500000},{id:'4',key:'750rb',value:750000},{id:'5',key:'1jt',value:1000000},{id:'6',key:'Lainnya',value:0}]
const numColumn = 3

class BeliEmas extends React.Component{
  
    constructor() {
         
        super()
   
        this.state = {
            selectedId : '',
            gramEmasButton: 0,
            hargaBeliEmasToday : 0,
            hargaTextBox :'',

        }
    }

    currencyFormat(num) {
      return 'Rp.' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
   }
    
    _CobaAtas = () =>{
      const { navigation,route } = this.props;  

      const { hargaBeliToday,token,userid } = route.params;
     
      
 
      var day = Date()
      var dayy = '' + day
      const today = moment(dayy).format("YYYY-MM-DD")
      return(
      <View>
         <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>

            <Text style={styles.logoText}>Beli Emas</Text>
           
        </View>

        <View style={styles.detailHarga}>
                <View style={{flexDirection:'row',justifyContent:'space-around',}}>
                  <Text style={styles.text}>Harga Beli</Text>
                <Icon name={'ios-chevron-forward-sharp'} size={28} color={'#fff'}/>
                  <Text style={styles.text}>{this.currencyFormat(hargaBeliToday)}/gr</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-start',marginLeft:20}}>
                  <Text style={styles.subText}>Per {today}</Text>
                </View>
        </View>

        <View style={styles.boxHorizontal}>
                  <TouchableOpacity style={{borderBottomWidth:2,borderBottomColor:"#FFC52F"}}>
                      <Text style={styles.text}>Rupiah</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:20}}>
                      <Text style={styles.text}>Gram</Text>
                  </TouchableOpacity>
        </View>

        <View style={styles.beratEmas}>
            <Text style={styles.text}>Setara dengan barat emas</Text>
            <Text style={styles.textBerat}>{Number((this.state.gramEmasButton).toFixed(4))} gr</Text>
        </View>

      </View>
      )
    }
    MetodePemabayran = () =>{
      const { navigation,route } = this.props;  
      const { hargaBeliToday,token,userid } = route.params;
    
      if (this.state.gramEmasButton == 0) {
        console.log("gagal")
      }else{
        navigation.navigate('metodePembayaran',{berat:this.state.gramEmasButton,token:token,userid:userid,hargaBeliToday:hargaBeliToday})
      }

    
    }

    _CobaBawah =() =>{
      const { navigation,route } = this.props;  
      const { hargaBeliToday,token,userid } = route.params;
    if (this.state.selectedId == '6') {
      return(
        <View>
              <View style={{marginVertical:20}}>
            <TextInput
                    style={styles.input}
                  
                    keyboardType='numeric'
                    placeholder={'Rp.'}
                    onChangeText={val => this.handleTextChange(val)}
                    placeholderTextColor={'#666872'}
                    underlineColorAndroid='transparent'
                />
        </View>
        
      <View style={{alignSelf:'center'}}>
      <TouchableOpacity onPress={this.MetodePemabayran} style={styles.btnLogin} >
                  <Text style={styles.text}>Beli Emas</Text>
      </TouchableOpacity>
      </View>
        </View>
      )
    }else{
      return(
        <View style={{alignSelf:'center'}}>
        <TouchableOpacity onPress={this.MetodePemabayran} style={styles.btnLogin} >
                    <Text style={styles.text}>Beli Emas</Text>
        </TouchableOpacity>
        </View>
      )
    }
      
    }
    handleTextChange = (value) =>{
      const { navigation,route } = this.props;  

      const { hargaBeliToday } = route.params;
      var countEmas = value / hargaBeliToday
      this.setState({gramEmasButton:countEmas})
    }

    handleSelection = (id,value) => {
      const { navigation,route } = this.props;  

      const { hargaBeliToday } = route.params;
    
      var selectedId = this.state.selectedId
   
      var countEmas = value / hargaBeliToday
      if(selectedId == id){
        
        this.setState({selectedId: '0'})
        
      }
     
      else {
        
        this.setState({selectedId: id,gramEmasButton:countEmas})
       
      }
       
   }
    _renderItem =({item,index}) =>{
      
        return(
          <TouchableOpacity 

          // for single item
          onPress={() => this.handleSelection(item.id,item.value)}
          style={item.id === this.state.selectedId ? styles.selected : styles.item} 
          >
         
               
            <Text style={styles.textBerat}>{item.key}</Text>
            

          </TouchableOpacity>
        
        )
    }
  
    render(){
  
    return(
        
        <View style={styles.container}>
        
        <ScrollView>
            <View>
              <FlatList
              data={harga}
              extraData={
                this.state.selectedId     // for single item
              }
              renderItem = {this._renderItem}
              keyExtractor={(item, index)=> index.toString()}
              numColumns = {numColumn}
              ListHeaderComponent={this._CobaAtas}
              ListFooterComponent={this._CobaBawah} 
              />
            
            </View>
              </ScrollView>
      
        
       
       
    
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
    
    },
    selected:{
  
      borderWidth:2,
      alignItems:'center',
      borderRadius:10,
      justifyContent:'center',
      height : 70,
      margin:10,
      flex:1,
      backgroundColor:'#6c62cc',
    },
    detailHarga:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#6c62cc',
      borderRadius: 10,
    },
    beratEmas:{
      width : WIDTH - 55,
      margin : 20,
      paddingVertical:10,
      backgroundColor: '#252835',
      borderRadius: 10,
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
      borderRadius:10,
      fontSize:16,
      paddingLeft:15,
      backgroundColor:'#252835',
      color:'#fff',
      marginHorizontal:100,
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
  