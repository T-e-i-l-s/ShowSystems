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
  const [edit, setEdit] = useState(false)


  React.useEffect(() => { // Хук для загрузки данных

    const focusHandler = navigation.addListener('focus', () => {

      if ( param[2] != undefined ) {

        console.log(param)
        setName(param[2])
        setEdit(true)

      }else{

        setEdit(false)

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


  const saveData = async () => { // Функция обработки данных из поля textInput

    if ( edit ){

      editData()
      navigation.navigate('range')
      return

    }

    const cityRef = await doc(db, 'ShowSystems', 'Folders');

    await setDoc(cityRef, { [name]: [] }, { merge: true });
    let arr = param[1]
    if(param[1] == undefined){
      arr = []
    }
    arr.push(name)
    await setDoc(cityRef, { [param[0]]: arr }, { merge: true });

    navigation.navigate('range')

  }


  const editData = async () => { // Функция обработки данных из поля textInput

    let cityRef = await doc(db, 'ShowSystems', 'Folders');

    await updateDoc(cityRef, {
      [param[2]]: deleteField()
    });

    await setDoc(cityRef, { [name]: param[3] }, { merge: true });
    let arr = param[1]
    if(param[1] == undefined){
      arr = []
    }
    arr.splice(arr.indexOf(param[2],1))
    arr.push(name)
    console.log(arr)
    await setDoc(cityRef, { [param[0]]: arr }, { merge: true });


    cityRef = await doc(db, 'ShowSystems', 'Equipment');

    await updateDoc(cityRef, {
      [param[2]]: deleteField()
    });
    await setDoc(cityRef, { [name]: param[4] }, { merge: true });

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

        <Text style={styles.title}>Создать папку</Text>

        <View style={{width: '10%'}} >

        </View>

      </View>

      
      <Text style={styles.inputName}>Название</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateName}
                  value={name}/>


      <Text style={styles.button} onPress={saveData}>Создать</Text>
      
    </SafeAreaView>

  );

}
