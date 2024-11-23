import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContext from "./AppContext";
import { useState } from "react";

const AppState = (props)=> {
    const [ls, setLs] = useState(true)
    const data = AsyncStorage.getItem('auth-token')
    const [loginonoff, setLoginonoff] = useState(true)
    const [user69, setUser69] = useState('')

    const fetchUser = async ()=>{
        const url = 'https://ai-chat-backend-kappa.vercel.app/api/auth/fetchUserData'
        const authdata = await AsyncStorage.getItem('auth-token')
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': authdata
          }
        })
        const data = await response.json()
        setUser69(data.name)
      }

    return(
        <AppContext.Provider value={{ls, setLs, loginonoff, setLoginonoff, fetchUser, user69, setUser69}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState