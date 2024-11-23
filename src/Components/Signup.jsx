import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {React, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'

const Signup = () => {
  const [flag, setFlag] = useState(true)
  const [val, setVal] = useState('')
  const [val1, setVal1] = useState('')
  const [val2, setVal2] = useState('')
  const [shownot, setShownot] = useState(false)

  const signup = async ()=>{
    const data = {
        name: val,
        email: val1,
        password: val2
    }
    try{
        const api = 'https://ai-chat-backend-kappa.vercel.app/api/auth/signup';
        const response = await fetch(api, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const logged = await response.json()
        await AsyncStorage.setItem('auth-token', logged.authData)
        console.log(logged.authData)
    }catch(error){
      setShownot(true)
      setTimeout(()=>{
        setShownot(false)
      },2000)
        console.log(error)
    }
    
}
  return (
    <>
      <ScrollView style={{backgroundColor: "#e4f0f7", height: "100%"}}>
        <View style={styles.mainscreen}>
          <View style={styles.textfield}>
          <Text style={styles.text}>Name</Text>
          <View style={styles.textareastyle}>
            <TextInput value={val} onChangeText={setVal} styel={{width: '90%'}} placeholder='Name'/>
          </View>
          <Text style={styles.text}>Email</Text>
          <View style={styles.textareastyle}>
            <TextInput value={val1} onChangeText={setVal1} styel={{width: '90%'}} placeholder='Email'/>
          </View>
          <Text style={styles.text}>Password</Text>
          <View style={[styles.textareastyle]}>
            <TextInput value={val2} onChangeText={setVal2} styel={{width: '90%'}} secureTextEntry={flag} placeholder='Password'/>
            <Icon onPress={()=>{setFlag(!flag)}} style={{position: "absolute", top: "30%", left: "90%"}} name="eye" size={20} color="black"/>
          </View>
          <TouchableOpacity onPress={signup} style={styles.button}>
            <Text style={{color: 'white', fontSize: 25}}>SignUp</Text>
          </TouchableOpacity>

          {shownot && <View style={{marginTop: 100, backgroundColor: '#F8D7DA', width: '100%', justifyContent: 'center', alignItems: 'center', height: 35, borderRadius: 10}}>
            <Text style={{color: 'black'}}>Write correct email password format</Text>
        </View>}
          </View>  
        </View>
      </ScrollView>
    </>
  )
}

export default Signup

const styles = StyleSheet.create({
  mainscreen: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textfield:{
    width: '80%',
    height: '100%'
  },
  textareastyle: {
    backgroundColor: 'white', 
    borderRadius: 10,
    marginTop: 10
  },
  text: {
    color: 'black'
  },
  button: {
    backgroundColor: "#007be5",
    marginTop: 50,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})