import React, { Component,useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View,Image,Button, Dimensions,TouchableOpacity,TextInput, StatusBar,ScrollView,FlatList } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import Icon from 'react-native-vector-icons/Ionicons'

const { width: WIDTH} = Dimensions.get('window');
const windowHeight = Dimensions.get('window').height;
  export const dataChart = ["May","June","July","Aug","Sept","Oct","Oct","Oct","Oct","Oct",]
  export const {width: SIZE} = Dimensions.get('window')
  const Charts = ({ navigation }) =>{
  
    
    let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0,waktu : ""})
   
 
      
      
    return(
        
        <View style={styles.container}>
        <SafeAreaView>
            <View style={styles.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={'ios-chevron-back-sharp'} size={25} color={'#fff'}/>
            </TouchableOpacity>

            <Text style={styles.logoText}>Grafik Harga Emas</Text>
            </View>

            <View>
                <View style={styles.boxHorizontal}>
                  <TouchableOpacity style={{borderBottomWidth:2,borderBottomColor:"#FFC52F"}}>
                      <Text style={styles.text}>Harga Beli</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft:20}}>
                      <Text style={styles.text}>Harga Jual</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.detailHarga}>

                      <View>
                      <Text style={styles.text}>Harga beli Hari Ini</Text>
                      </View>

                      <View style={{marginLeft:70}}>
                      <Text style={styles.text}>Rp. 840.000/gr</Text>
                        <View style={styles.iconPersen}>
                          <Icon name={'ios-caret-down'} size={11} color={'#E14C4C'} />
                          <Text style={{fontSize:9,color:'#E14C4C'}}>0.25%</Text>
                    </View>
                      </View>
                </View>

                <View style={styles.detailTanggal}>
                        <Text style={{color:'#666872',fontSize:14}}>Dari</Text>
                        <View style={styles.tanggal}><Text style={styles.textTanggal}>01-01-2021</Text></View>
                        <Text style={{color:'#666872',fontSize:14}}> Ke</Text>
                        <View style={styles.tanggal}><Text style={styles.textTanggal}>07-01-2021</Text></View>
                </View>

             <View>
               <LineChart
                data={{
                    labels: ["Jan","Feb","July","Aug","Sept","Oct","Oct","Oct","Oct","Oct","Oct","Oct",],
                    datasets: [
                        {
                            data:[
                                  876.000,
                                  826.000,
                                  810.000,
                                  866.000,
                                  878.000,
                                  821.000,
                                  776.000,
                                  806.000,
                                  616.100,
                                  816.000,
                                  616.100,
                                  816.000,
                             ]
                        }
                    ]
                }}
                width = {Dimensions.get("window").width}
                height = {250}
                
                yAxisLabel="Rp."
                chartConfig={{
                    backgroundGradientFrom: '#1F1D2A',
                    backgroundGradientTo : '#1F1D2A',
                  
                    fillShadowGradient : '#6C62CC',
                    fillShadowGradientOpacity : 0.2,
                    
                    color: (opacity = 1) =>`rgba(81,150,244,${opacity})`,
                    labelColor:()=> '#666872',
                    strokeWidth:3,
                    
                }}
                bezier
                withVerticalLabels = {false}
                withVerticalLines={false}
                withHorizontalLines={false}
                decorator={() => {
                  if (tooltipPos.y <= 50 ) {
                    return tooltipPos.visible ? 
                  
                    <View>
                        <Svg>
                            <Rect 
                                x={tooltipPos.x - 20} 
                                y={tooltipPos.y + 20} 
                                width="60" 
                                height="60"
                                fill="#2EAEBF"
                                rx = "10"
                                ry = "10"
                                 />
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y + 40}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.value}
                                </TextSVG>
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y + 60}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.waktu}
                                </TextSVG>
                        </Svg>
                    </View> : null
                  }else{
                    return tooltipPos.visible ? 
                  
                    <View>
                        <Svg>
                            <Rect 
                                x={tooltipPos.x - 15} 
                                y={tooltipPos.y - 50} 
                                width="60" 
                                height="60"
                                fill="#2EAEBF"
                                rx = "10"
                                ry = "10"
                                 />
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y - 30}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.value}
                                </TextSVG>
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y - 10}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.waktu}
                                </TextSVG>
                        </Svg>
                    </View> : null
                  }
                
              }}
              onDataPointClick={(data) => {
          
                let isSamePoint = (tooltipPos.x === data.x 
                                    && tooltipPos.y === data.y)

                isSamePoint ? setTooltipPos((previousState) => {
                    return { 
                              ...previousState,
                              value: data.value,
                              waktu:dataChart[data.index],
                              visible: !previousState.visible
                           }
                })
                    : 
                setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true,waktu:dataChart[data.index] });

            }}
                  
               />
          </View>

        <View style={{flexDirection:'row',marginLeft:20}}>
            <TouchableOpacity style={styles.formatHari}>
              <Text style={{fontSize:14,color:'#666872'}}>7 Hari</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.formatHari}>
              <Text style={{fontSize:14,color:'#666872'}}>1 Bulan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.formatHari}>
              <Text style={{fontSize:14,color:'#666872'}}>3 Bulan</Text>
            </TouchableOpacity>
        </View>

        <View style={{margin:20,marginTop:30}}>
           <Text style={{fontSize:14,color:'#666872'}}>Detail Harga Emas</Text>
        </View>
      
        <View style={styles.detailHarga}>
            <View style={{flexDirection:'row'}}>
                  <Text>Berat</Text>
                  <Text>Harga Beli</Text>
                  <Text>Harga Jual</Text>              
            </View>
        </View>
      </View>
            <StatusBar barStyle="light-content"/>

        </SafeAreaView>  
        
       
      </View>
      
    )
    
}


export default Charts


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
 
    logoText: {
      color : '#fff',
      fontWeight:'bold',
      fontSize : 25,
      marginTop: 15 ,
    //  fontFamily: 'Roboto-Bold',
      textAlign: 'left'
    },
    subLogo: {
      color : '#666872',
      fontSize : 15,
      
  
    },
    detailHarga:{
      margin : 20,
      paddingVertical:10,
      paddingLeft:20,
      flexDirection: 'row',
      backgroundColor: '#252835',
      borderRadius: 10,
    },
    iconPersen:{
      flexDirection:'row',
      backgroundColor:'#fff',
      borderRadius:10,
      paddingHorizontal:5,
      marginLeft:5,
      alignSelf:'flex-end'
    },
    boxHorizontal:{
    flexDirection:"row",
    alignSelf:"center",
    padding:10,
    marginTop:30
  },
    text: {
      color: '#fff',
      textAlign : 'center',
      fontSize : 16,
    },
    detailTanggal:{
      flexDirection:'row',
      alignSelf:'flex-end',
      marginRight:25
    },
    tanggal:{
      backgroundColor:'#252835',
      borderRadius:5,
      marginLeft:5,
      paddingHorizontal:5
    },
    textTanggal:{
      fontSize:14,
      color:'#fff'
    },
    formatHari:{
    backgroundColor:"#252835",
    borderRadius:10,
    padding:6,
    paddingHorizontal:16,
    marginRight:10
  },
  
  });
  