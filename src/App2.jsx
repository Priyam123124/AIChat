import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import CustomDrawer from './CustomDrawer'
import Chat from './Screen/Chat'
import LogIn from './Screen/LogIn'
import AppContext from '../Context/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

const drawer = createDrawerNavigator()
const App2 = () => {
    const context = useContext(AppContext)
    const {loginonoff, setLoginonoff} = context

    const screenoption = async ()=>{
        const data = await AsyncStorage.getItem('auth-token')

        if(data) {
            setLoginonoff(false)
        } else {
            setLoginonoff(true)
        }
    }

    useEffect(()=>{
        screenoption()
    },[])
  return (
    <NavigationContainer>
      <drawer.Navigator drawerContent={CustomDrawer}>
      {loginonoff && <drawer.Screen name='Login' component={LogIn}/>}
        <drawer.Screen name='Chat' component={Chat}/>
      </drawer.Navigator>
    </NavigationContainer>
  )
}

export default App2

const styles = StyleSheet.create({})