// Подгружаем все необходимое
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableHighlight, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'
import React, { useState } from 'react'


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


export default function App({ route, navigation }) {

  // Данные для textInput
  const param = route.params
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [owner, setOwner] = useState('')
  const [cnt, setCnt] = useState(0)
  const [pageTitle, setPageTitle] = useState('Добавить устройство')
  const [buttonTitle, setButtonTitle] = useState('Создать')


  React.useEffect(() => { // Хук для загрузки данных

      const focusHandler = navigation.addListener('focus', () => {

      if ( param[2] != undefined ) {

        let arr = param[2]
        setPageTitle('Редактировать устройство')
        setButtonTitle('Изменить')
        setName(arr[0])
        setCnt(arr[1])
        setDescription(arr[2])
        setOwner(arr[3])

      }

    });

    return focusHandler;

  }, [navigation]);


  const toRange = () => { // Функция перехода на страницу со списком устройств

    navigation.navigate('range')

  }


  const updateName = (e) => { // Функция обработки данных из поля textInput

    setName(e)

  }


  const updateDescription = (e) => { // Функция обработки данных из поля textInput

    setDescription(e)

  }


  const updateOwner = (e) => { // Функция обработки данных из поля textInput

    setOwner(e)

  }



  const updateCnt = (e) => { // Функция обработки данных из поля textInput

    setCnt(e)

  }


  const saveData = async () => { // Функция обработки данных из поля textInput

    let flag = false
    let arr = param[1][param[0]]
    if(arr != undefined && arr != null){
      Object.keys(arr).forEach(el => {
  
        if(el == name){
          flag = true
          return
        }
  
      })
    }

    if(flag){
      await alert('Такое устройство уже существует','')
      return
    }


    const res = [ cnt, description, owner ]
    const dir = param[0]
    if ( cnt == undefined ) {
      res[0] = 0
    }
    if ( description == undefined ) {
      res[1] = ''
    }
    if ( owner == undefined ) {
      res[2] = ''
    }
    arr = param[1][dir]
    if(arr == undefined){
      arr = {}
    }
    arr[name] = res


    if( param[2] != undefined ){
      let arr2 = {}
      Object.keys(arr).forEach(el => {
  
        if(el != param[2][0] || param[2][0] == name){
          arr2[el] = arr[el]
        }
  
      })
      arr = arr2

    }

    const cityRef = await doc(db, 'ShowSystems', 'Equipment')

    await updateDoc(cityRef, {
      [dir]: deleteField()
    });

    await setDoc(cityRef, { [dir]: arr }, { merge: true })


    navigation.navigate('range')

  }


  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />

      <View style={styles.header}>

        <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toRange} style={{width: '10%'}}>
          <Image style={styles.icon}
          source={require('../../assets/icons/back.png')}/>
        </TouchableHighlight>

        <Text style={styles.title}>{pageTitle}</Text>

        <View style={{width: '10%'}} >

        </View>

      </View>


      <Text style={styles.inputName}>Название</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateName}
                  value={name}/>


      <Text style={styles.inputName}>Описание</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateDescription}
                  value={description}/>


      <Text style={styles.inputName}>Владельцы</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateOwner}
                  value={owner}/>


      <Text style={styles.inputName}>Количество</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateCnt}
                  value={cnt}
                  keyboardType="numeric"/>


      <Text style={styles.button} onPress={saveData}>{buttonTitle}</Text>
      
    </SafeAreaView>

  );

}
