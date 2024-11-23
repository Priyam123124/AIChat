import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import AppContext from '../Context/AppContext'

const CustomDrawer = (props) => {
  const context = useContext(AppContext)
  const {loginonoff, setLoginonoff, fetchUser, user69, setUser69} = context
  const [color, setColor] = useState(false)
  const navigation = useNavigation()

  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}
      scrollEnabled={false}>
        <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#89c4b6', height: 220}}>
          <Icon name='user' size={69} color='#404242'/>
          <Text>{user69}</Text>
        </View>
        {/* <DrawerItemList {...props}/> */}
        {loginonoff && <TouchableOpacity onPress={()=>{navigation.navigate('Login'); setColor(true)}} style={[{flexDirection: 'row', height: 40, marginTop: 10, marginLeft: 10}, color == true ? {backgroundColor: '#E2EFFF'}: '']}>
          <Icon name='sign-in' size={30} color={color == true ? '#007AFF': 'black'}/>
          <Text style={[{fontSize: 20, color: 'black', fontWeight: '500', marginLeft: 10}, color == true ? {color: '#007AFF'}: '']}>Login</Text>
        </TouchableOpacity>}
        {!loginonoff && <TouchableOpacity onPress={async ()=>{await AsyncStorage.removeItem('auth-token'); await setLoginonoff(true); navigation.navigate('Login'), fetchUser()}} style={[{flexDirection: 'row', height: 40, marginLeft: 10, marginTop: 10}]}>
          <Icon name='sign-out' size={30} color='black'/>
          <Text style={[{fontSize: 20, color: 'black', fontWeight: '500', marginLeft: 10}]}>Logout</Text>
        </TouchableOpacity>}
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})