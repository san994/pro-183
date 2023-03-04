import React from "react";
import {StyleSheet,Text,View,SafeAreaView,Platform,ScrollView,TouchableOpacity,Image} from "react-native";

import { Camera } from "expo-camera"; 
import { StatusBar } from "expo-status-bar";
import * as FaceDetector from "expo-face-detector";
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";

import Filter1 from "./Filter1";
import Filter2 from "./Filter2";
import Filter3 from "./Filter3";
import Filter4 from "./Filter4";
import Filter5 from "./Filter5";
import Filter6 from "./Filter6";

var data = [
    {
        id:"crown-pic1",
        src:require("../assets/crown-pic1.png")
    },
    {
        id:"crown-pic2",
        src:require("../assets/crown-pic2.png")
    },
    {
        id:"crown-pic3",
        src:require("../assets/crown-pic3.png")
    },
    {
        id:"flower-pic1",
        src:require("../assets/flower-pic1.png")
    },
    {
        id:"flower-pic2",
        src:require("../assets/flower-pic2.png")
    },
    {
        id:"flower-pic3",
        src:require("../assets/flower-pic3.png")
    },
]

export default class Main extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            faces:[],
            current_filter:"crown-pic1"
        }
    }

    async componentDidMount(){
        const {status} = await Camera.requestCameraPermissionsAsync();
        this.updateCameraState(status)
    }

    updateCameraState=(status)=>{
        this.setState({hasCameraPermissions:status === "granted"})
    }
     
    onFacesDetected=({faces})=>{
       this.setState({faces:faces})
    }

    render(){
        const {hasCameraPermissions} = this.state;
        if(hasCameraPermissions===null){
            return(
                <View></View>
            )
        }
        if(hasCameraPermissions===false){
            return(
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        // console.log(this.state.faces)
        return(
            <View style={styles.container}>
               <SafeAreaView style={styles.droidSafeArea}/>
               
               {/* heading */}
               <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>LOOK ME...</Text>
               </View>
               
               {/* camera */}
               <View style={styles.cameraStyle}>
                 <Camera
                  style={{flex:1}}
                  type={Camera.Constants.Type.front}
                  faceDetectorSettings={{
                    mode:FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks:FaceDetector.FaceDetectorLandmarks.all,
                    runClassifications:FaceDetector.FaceDetectorClassifications.all,
                  }}
                  onFacesDetected={this.onFacesDetected}
                 />
                 {this.state.faces.map((face,index)=>{
                    if(this.state.current_filter==="crown-pic1"){
                        return <Filter1 key={index} face={face}/>
                    }
                    else if(this.state.current_filter==="crown-pic2"){
                        return(
                            <Filter2 key={index} face={face}/>
                        )
                    }
                    else if(this.state.current_filter==="crown-pic3"){
                        return(
                            <Filter3 key={index} face={face}/>
                        )
                    }
                    else if(this.state.current_filter==="flowe-pic1"){
                        return(
                            <Filter4 key={index} face={face}/>
                        )
                    }
                    else if(this.state.current_filter==="flower-pic2"){
                        return(
                            <Filter5 key={index} face={face}/>
                        )
                    }
                    else if(this.state.current_filter==="flower-pic3"){
                        return(
                            <Filter6 key={index} face={face}/>
                        )
                    }
                   })}
               </View>

               {/* lower container */}
               <View style={styles.framesContainer}>
                  <View style={styles.topLowerContainer}></View>
                  <View style={styles.bottomLowerContainer}>
                      <ScrollView
                        showsVerticalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={styles.filters}
                      >
                        {data.map(filter_data=>{
                            return(
                                <TouchableOpacity
                                  key={`filter-button-${filter_data.id}`}
                                  style={styles.filterImageContainer}
                                  onPress={()=>{
                                    this.setState({current_filter:`${filter_data.id}`})
                                  }}
                                >
                                    <Image
                                      source={filter_data.src}
                                      style={{
                                        height:32,
                                        width:80,
                                     }}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                      </ScrollView>
                  </View>
               </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    droidSafeArea: { 
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
    }, 
    headingContainer: { 
        flex: 0.1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#6278e4"
    }, 
    titleText1: { 
        fontSize: RFValue(30), 
        fontWeight: "bold", 
        color: "#efb141", 
        fontStyle: 'italic', 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: -3, height: 3 }, 
        textShadowRadius: 1
    }, 
    titleText2: { 
        fontSize: RFValue(30), 
        fontWeight: "bold", 
        color: "white",
        fontStyle: 'italic', 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: -3, height: 3 }, 
        textShadowRadius: 1 
    },
    subheading1: { 
        fontSize: RFValue(20), 
        color: "#efb141", 
        fontStyle: 'italic', 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: -3, height: 3 }, 
        textShadowRadius: 1 
    },
    subheading2: { 
        fontSize: RFValue(20), 
        color: "white", 
        fontStyle: 'italic', 
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: -3, height: 3 }, 
        textShadowRadius: 1 
    },
    cameraStyle: { 
        flex: 0.65 
    }, 
    framesContainer: { 
        flex: 0.2, 
        paddingLeft: RFValue(20), 
        paddingRight: RFValue(20), 
        paddingTop: RFValue(30), 
        backgroundColor: "#6278e4" 
    }, 
    filterImageContainer: { 
        height: RFPercentage(8), 
        width: RFPercentage(15), 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#e4e7f8", 
        borderRadius: 30, 
        marginRight: 30 
    },
    categoryBox: { 
        flex: 0.2,
        borderRadius: 30, 
        borderWidth: 1, 
        backgroundColor: "white", 
        width: "100%", 
        padding: RFValue(3), 
        margin: 1, 
        alignItems: "center" 
    },
    categoryBoxSelected: { 
        flex: 0.2, 
        borderRadius: 30, 
        borderWidth: 1, 
        backgroundColor: "#efb141", 
        width: "100%", 
        padding: RFValue(3), 
        margin: 1, 
        alignItems: "center" 
    }
    
})