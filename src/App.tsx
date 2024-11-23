import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppState from '../Context/AppState'
import App2 from './App2'

const App = () => {
  return (
    <AppState>
      <App2/>
    </AppState>
  )
}

export default App

const styles = StyleSheet.create({})