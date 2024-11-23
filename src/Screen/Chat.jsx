import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleGenerativeAI } from "@google/generative-ai";
import FastImage from 'react-native-fast-image'

const Chat = () => {
  const [value, setValue] = useState('')
  const [aival, setAival] = useState('')
  const [arr, setArr] = useState([])
  const [flag, setFlag] = useState(false)
  
  //Integrating Gemini AI in the application
  const genAI = new GoogleGenerativeAI("AIzaSyA3x6lbJDBuSoiKaVbLRX5eJz3E-VskOig");
  
  async function run() {

    setFlag(true)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const result = await model.generateContent(value);
    const response = result.response;
  
    // Extract the text using the `text` function
    const responseText = response.text();
    addChat('left', responseText)
  }

  //This function is used to render the chat on any change in the text or button click functionallity
  const renderChat = async ()=>{
    Keyboard.dismiss()
    await addChat('right', value)
    run()
    setValue('')
  }

  useEffect(()=>{
    fetchChat()
  },[value])

  //Fetch chat from database(MongoDB)
  const fetchChat = async ()=>{
    const api = 'https://ai-chat-backend-kappa.vercel.app/api/chat/getChat'
    const data2 = await AsyncStorage.getItem('auth-token')

    const response = await fetch(api, {
      method: 'GET',
      headers: {
        "content-type": "application/json",
        "auth-token": data2
      }
    })
    if (!response.ok) {
      return
    }
    const data = await response.json()
    setArr(data)
  }

  const addChat = async (float, message)=>{
    const datain = {
      float: float,
      message: message
    }
    const api = 'https://ai-chat-backend-kappa.vercel.app/api/chat/addChat'
    const data2 = await AsyncStorage.getItem('auth-token')

    const response = await fetch(api, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "auth-token": data2
      },
      body: JSON.stringify(datain)
    })
    fetchChat()
    if(datain.float == "left") {
      setFlag(false)
    }
    if (!response.ok) {
      if(datain.float == "left") {
        setFlag(false)
      }
      console.log(response.status)
    }
  }

  const deleteChat = async (id, user)=>{
    const url = `https://ai-chat-backend-kappa.vercel.app/api/chat/deleteChat/${id}`
    const data3 = {
      user: user
    }
    const data2 = await AsyncStorage.getItem('auth-token')
    const response = await fetch(url, {
      method: 'Delete',
      headers: {
        "Content-Type": "application/json",
        "auth-token": data2
      },
      body: JSON.stringify(data3)
    })
    fetchChat()
  }

  const clearChat = ()=>{
    arr.map(async(e)=>{
      await deleteChat(e._id, e.user)
    })
  }

  return (
    <>
    <View style={{position: "absolute", width: '100%',flexDirection: 'row-reverse'}}>
    <TouchableOpacity style={{position: "absolute", marginTop: -35, zIndex: 1}}>
        <Text onPress={clearChat} style={{color: 'black', marginRight: 20}}>Clear Chat</Text>
      </TouchableOpacity>
    </View>
    <ScrollView
    ref={ref => {this.scrollView = ref}}
    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
    >
        {arr.map((e, i)=>{
          return(
            <View key={i}style={e.float == 'right' ? styles.right : styles.left}>
               <View style={styles.content}>
               <Icon onPress={()=>{deleteChat(e._id, e.user)}} style={{marginLeft: 10}} name='trash' size={20} color="black"/>
                 <Text selectable={true} style={{fontSize: 18, color: 'black', margin: 10}}>{e.message}</Text>
               </View>
            </View>
          )
        })}
        {flag && <FastImage
            style={{ width: 50, height: 50, marginLeft: 15, marginBottom: 10 }}
            source={require('./assets/writing-loading.gif')}
            resizeMode={FastImage.resizeMode.contain}/>}
    </ScrollView>
    <KeyboardAvoidingView style={{backgroundColor: 'white', flexDirection: 'column-reverse', marginLeft: 10, marginBottom: 10, marginRight: 50, borderRadius: 70}}>
        <View style={{flexDirection: 'row',alignItems: 'center'}}>
          <TextInput multiline={true} value={value} onChangeText={setValue} style={{width: '100%'}} placeholder='message'/>
           <Icon style={{marginLeft: 8}} onPress={renderChat} name='paper-plane' size={25} color='black'/>
        </View>
    </KeyboardAvoidingView>
    </>
  )
}

export default Chat

const styles = StyleSheet.create({
    right: {
        flexDirection: 'row-reverse',
        marginRight: 15,
    },
    content: {
        backgroundColor: '#dceff2',
        marginTop: 20,
        maxWidth: '80%',
        borderRadius: 10
    },
    left: {
      flexDirection: 'row',
      marginLeft: 15,
    }
})