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
  const param = route.params[0]
  const param2 = route.params[1]
  const [name, setName] = useState('')
  const [edit, setEdit] = useState(false)
  const [pageTitle, setPageTitle] = useState('Добавить папку')
  const [buttonTitle, setButtonTitle] = useState('Создать')


  React.useEffect(() => { // Хук для загрузки данных

    const focusHandler = navigation.addListener('focus', () => {

      if ( param[2] != undefined ) {

        setPageTitle('Редактировать папку')
        setButtonTitle('Изменить')
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


  const saveData = async () => { // Функция сохранения данных

    let flag = false
    let arr = param2
    if(arr != undefined && arr != null){
      Object.keys(arr).forEach(el => {
  
        if(el == name){
          flag = true
          return
        }
  
      })
    }

    if(flag){
      await alert('Такая папка уже существует','')
      return
    }


    if ( edit ){

      await editData()

    } else {

      const cityRef = await doc(db, 'ShowSystems', 'Folders');

      await setDoc(cityRef, { [name]: [] }, { merge: true });
      let arr = param[1]
      if(arr == undefined){
        arr = []
      }
      arr.push(name)
      await setDoc(cityRef, { [param[0]]: arr }, { merge: true });

      navigation.navigate('range')

    }

  }


  const editData = async () => { // Функция обновления данных

    let cityRef = await doc(db, 'ShowSystems', 'Folders');

    console.log(param)

    await updateDoc(cityRef, {
      [param[2]]: deleteField()
    });

    await setDoc(cityRef, { [name]: [] }, { merge: true });
    let arr = param[1]
    if(param[1] == undefined){
      arr = []
    }
    arr.splice(arr.indexOf(param[2]),1)
    arr.push(name)
    await setDoc(cityRef, { [param[0]]: arr }, { merge: true });


    cityRef = await doc(db, 'ShowSystems', 'Equipment');

    await updateDoc(cityRef, {
      [param[2]]: deleteField()
    });

    if(param[4] != undefined){
      await setDoc(cityRef, { [name]: param[4] }, { merge: true });
    }

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


      <Text style={styles.button} onPress={saveData}>{buttonTitle}</Text>
      
    </SafeAreaView>

  );

}
