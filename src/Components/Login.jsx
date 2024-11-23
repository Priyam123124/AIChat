import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppContext from '../../Context/AppContext'

import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const context = useContext(AppContext)
    const {loginonoff, setLoginonoff, fetchUser} = context
    const [flag, setFlag] = useState(true)
    const [loginNavigate, setLoginNavigate] = useState(true)
    const [val, setVal] = useState('')
    const [val2, setVal2] = useState('')
    const [shownot, setShownot] = useState(false)
    const eye = ()=>{
        setFlag(!flag)
    }

    const navigation = useNavigation()
    
    const login = async ()=>{
        const data = {
            email: val,
            password: val2
        }
        try{
            const api = 'https://ai-chat-backend-kappa.vercel.app/api/auth/login';
            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })

            if(!response.ok) {
                setShownot(true)
                setTimeout(()=>{
                    setShownot(false)
                },2000)
                setLoginonoff(true)
                return
            }
            const logged = await response.json()
            await AsyncStorage.setItem('auth-token', logged.authData)
            setLoginonoff(false)
            navigation.navigate('Chat')
            fetchUser() 
        }catch(error){
            console.log(error)
        }
        
    }

  return (
    <>
    <SafeAreaView style={styles.background}>
        <View style={styles.textareaView}>
        <Icon style={{marginLeft: 8}} name="envelope" size={20} color="black" />
        <TextInput style={{width: "70%"}} value={val} onChangeText={setVal} placeholder='Email Address'/>
        </View>
        <View style={[styles.textareaView, {marginTop: 10}]}>
        <Icon style={{marginLeft: 8}} name="lock" size={25} color="black" />
        <TextInput style={{width: "70%"}} value={val2} onChangeText={setVal2} secureTextEntry={flag} placeholder='Password'/>
        <Icon style={{marginLeft: 8, position: 'absolute', left: '85%'}} onPress={()=>{eye()}} name="eye" size={20} color="black" />
        </View>
        <View style={[{width: "80%"}, styles.margin]}>
            <Text>Forgot Password?</Text>
        </View>
        <TouchableOpacity onPress={login} style={[styles.button, {marginTop: 50}]}>
            <Text style={{color: 'white', fontSize: 25}}>Login</Text>
        </TouchableOpacity>
        {shownot && <View style={{marginTop: 100, backgroundColor: '#F8D7DA', width: '80%', justifyContent: 'center', alignItems: 'center', height: 35, borderRadius: 10}}>
            <Text style={{color: 'black'}}>Login using correct credentials</Text>
        </View>}
    </SafeAreaView>
    </>
  )
}

export default Login

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#e4f0f7',
        height: '100%',
        alignItems: 'center',
    },
    textareaView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'black',
        width: '80%',
        borderRadius: 10,
        marginTop: 50
    },
    margin: {
        marginTop: 10
    },
    button: {
        backgroundColor: '#007be5',
        width: '80%', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 10,
        height: 55,
    }
})