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
  const [folther, setFolther] = useState('')


  React.useEffect(() => { // Хук для загрузки данных

    const focusHandler = navigation.addListener('focus', () => {

      if ( param != undefined ) {

        setName(param.name)
        setDescription(param.description)
        setOwner(param.owner)
        setCnt(param.cnt)
        setFolther(param.dir)

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



  const updateFolther = (e) => { // Функция обработки данных из поля textInput

    setFolther(e)

  }


  const saveData = async () => { // Функция обработки данных из поля textInput

    if ( name != param.name || description != param.description || owner != param.owner || cnt != param.cnt || folther != param.dir ) {

      const cityRef = await doc(db, 'ShowSystems', 'Equipment');

      let arr = [description, owner, cnt, folther]
      if ( cnt == undefined ) {
        arr[2] = 0
      }
      if ( description == undefined ) {
        arr[0] = ''
      }
      if ( owner == undefined ) {
        arr[1] = ''
      }
      if ( folther == undefined ) {
        arr[3] = ''
      }

      await setDoc(cityRef, { [name]: arr }, { merge: true });
      if ( name != param.name ) {
        await updateDoc(cityRef, {
          [param.name]: deleteField()
        });
      }
      
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

        <Text style={styles.title}>Добавить устройство</Text>

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

      <Text style={styles.inputName}>Папка</Text>
      <TextInput style={styles.input}
                  placeholder=''
                  placeholderTextColor={'#333333'}
                  onChangeText={updateFolther}
                  value={folther}/>


      <Text style={styles.button} onPress={saveData}>Создать</Text>
      
    </SafeAreaView>

  );

}