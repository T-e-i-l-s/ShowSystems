// Подгружаем все необходимое
import { StatusBar } from 'expo-status-bar'
import { Text, View, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import * as SplashScreen from 'expo-splash-screen'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


SplashScreen.preventAutoHideAsync() // Включаем экран загрузка


// Подключаем firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZ_i5HPtPnAGf_3lPvlvCn0ZoCGwpc5u0",
  authDomain: "showsystems-19052.firebaseapp.com",
  projectId: "showsystems-19052",
  storageBucket: "showsystems-19052.appspot.com",
  messagingSenderId: "845493109194",
  appId: "1:845493109194:web:85ccdecfccba092bf14f33",
  measurementId: "G-D6Z18BMJTF"
};
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


// Исходные переменные
let flag = false
let data = null



export default function App({ navigation }) {

  const [code,setCode] = useState('') // Введенный пользователем код
  const [loaded,setLoaded] = useState(false) // Введенный пользователем код
  
  
  if ( !flag ) { // Начальная загрузка данных из бд

    flag = true
    loadData()

  }


  async function check () { // Проверка верный ли код и перенаправление пользователя в личный кабинет

    if ( data[code] != undefined ) {

      AsyncStorage.setItem('username', data[code])
      navigation.navigate('menu')

    }

  }


  async function loadData () { // Функция загрузки данных

    const value = await AsyncStorage.getItem('username');
    if('' + value != 'null'){
      navigation.navigate('menu')
    }

    const docRef = doc(db, 'ShowSystems', 'Users')
    const docSnap = await getDoc(docRef)
    data = docSnap.data()
    SplashScreen.hideAsync()
    setLoaded(true)

  }


  if (!loaded) {
    return null;
  }


  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />

      <Text style={styles.greeting}>Здравствуйте!</Text>

      <Text style={styles.inputName}>Код аккаунта</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  maxLength={8}
                  onChangeText={setCode}
                  />

      <Text onPress={check} style={styles.button}>Войти</Text>
      
    </SafeAreaView>

  );

}
