import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import {React, useContext, useState, useEffect} from 'react'
import AppContext from '../../Context/AppContext'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LogIn = () => {
    const context = useContext(AppContext)
    const {ls, setLs} = context

  return (
    <>
    <SafeAreaView>
        <View style={styles.maintext}>
            <Text style={styles.text}>Welcome to AIChat</Text>
            <Text style={{color: "black", fontSize: 20}}>LogIn or SignUp to access your</Text>
            <Text style={{color: "black", fontSize: 20}}>Account</Text>
        </View>
        <View style={styles.sidebyside}>
            <TouchableOpacity style={[styles.button, {backgroundColor: ls==true? "#F2F2F2" : "#e4f0f7"}]} onPress={()=>{setLs(true)}}>
                <Text style={{fontSize: 18, color: "black"}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: ls==true? "#e4f0f7" : "#F2F2F2"}]} onPress={()=>{setLs(false)}}>
                <Text style={{fontSize: 18, color: "black"}}>SignUp</Text>
            </TouchableOpacity>
        </View>
        {ls===true? <Login/> : <Signup/>}
    </SafeAreaView>
    </>
  )
}

export default LogIn

const styles = StyleSheet.create({
    maintext: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 30,
    },
    sidebyside: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        // backgroundColor: ls == true ? "#e4f0f7": "black",
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 10,
        height: 55,
        width: '50%'
    }
})