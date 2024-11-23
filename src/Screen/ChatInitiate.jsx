import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import plus from './plus.png'

const ChatInitiate = () => {
  return (
    <>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{width: 50, marginTop: 20, height: 50}} source={plus}/>
    </View>
    </>
  )
}

export default ChatInitiate

const styles = StyleSheet.create({})