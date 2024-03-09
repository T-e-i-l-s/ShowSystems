import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Image, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React , { useState } from 'react';
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite'

// Подключаем firebase
const firebaseConfig = {
  apiKey: "AIzaSyCZ_i5HPtPnAGf_3lPvlvCn0ZoCGwpc5u0",
  authDomain: "showsystems-19052.firebaseapp.com",
  projectId: "showsystems-19052",
  storageBucket: "showsystems-19052.appspot.com",
  messagingSenderId: "845493109194",
  appId: "1:845493109194:web:85ccdecfccba092bf14f33",
  measurementId: "G-D6Z18BMJTF"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let flag = false

export default function App({ navigation }) {
  const [equipment, setEquipment] = useState(false)

  React.useEffect(() => { // Хук загрузки данных при переходе на страницу
    const focusHandler = navigation.addListener('focus', () => {
      loadData()
    })
    return focusHandler
  }, [navigation])

  async function loadData () {
    const docRef = doc(db, 'ShowSystems', 'Users')//EquipmentButton
    const docSnap = await getDoc(docRef)
    let data = docSnap.data()
    let button = data.EquipmentButton
    const value = await AsyncStorage.getItem('username');
    if(button.includes(value)){
      setEquipment(true)
    }
  }

  // Массив данных о проектах
  const projects = []

  async function logout () {
    await AsyncStorage.setItem('username', null)
    navigation.navigate('login')
  }
  
  const toRange = () => {
    navigation.navigate('range')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <StatusBar style="auto" />

        <View style={styles.header}>
          {
            equipment ? (
              <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toRange}>
                <Image style={styles.icon}
                source={require('../../assets/icons/book.png')}/>
              </TouchableHighlight>
            ):null
          }
        
          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={logout}>
            <Image style={styles.icon}
            source={require('../../assets/icons/exit.png')}/>
          </TouchableHighlight>
        </View>

        <Text style={styles.title}>
          Проекты:
        </Text>
        
        <Text style={styles.addNew}>Создать новый проект</Text>

        <FlatList data={projects} style={styles.list} renderItem={({ item }) => (
          <View style={styles.block}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>

            <View style={styles.open}>
              <Image style={styles.button}
              source={require('../../assets/icons/open.png')}/>
            </View>
          </View>
        )}/>
      </ScrollView>
    </SafeAreaView>
  )
}
