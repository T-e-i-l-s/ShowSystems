// Подгружаем все необходимое
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, updateDoc, deleteField  } from 'firebase/firestore/lite'
import React , { useState } from 'react'


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


export default function App ({ navigation }) {

  const [list,setList] = useState([]) // Список аппаратуры
  const [show,setShow] = useState([]) // Массив раскрытых dorpdown списков


  const toMenu = () => { // Функция перехода на экран меню

    navigation.navigate('menu')

  }


  const toAdd = () => { // Функция перехода на экран добавить устройство(для создания)

    setShow([])
    navigation.navigate('addEquipment')

  }


  const update = (e) => { // Функция перехода на экран добавить устройство(для редактирования)

    navigation.navigate('addEquipment', e)

  }


  const toggleDropDown = async (e) => { // Функция раскрытия dropdown списка

    var arr = show
    var arr2 = []

    for ( let i = 0; i < arr.length; i++ ) {

      if ( i != e ) {

        arr2.push(arr[i])

      } else {

        arr2.push(!arr[i])

      }

    }

    await setShow(arr2)
     
  }


  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', () => {

      loadData()

    });

    return focusHandler;

  }, [navigation]);


  async function loadData () { // Функция загрузки данных

    const docRef = doc(db, 'ShowSystems', 'Equipment')
    const docSnap = await getDoc(docRef)

    var data = docSnap.data()
    let arr = []
    let arr2 = []
    let i = 0

    Object.keys(data).forEach(element => {

      arr.push({ 'name': element, 'description': data[element][0], 'owner': data[element][1] , 'cnt': data[element][2], 'show': false, 'num': i })
      arr2.push(false)
      setList(arr)
      setShow(arr2)
      i++

    });

  }


  async function deleteData(e,ind) { // Функция удаления данных

    const cityRef = doc(db, 'ShowSystems', 'Equipment');

    await updateDoc(cityRef, {
      [e]: deleteField()
    });

    let arr = []
    let arr2 = []
    let i1 = 0
    let i2 = 0
    while(i1 < list.length){
      if(i1 != ind){
        arr[i2] = list[i1] 
        arr2[i2] = show[i1]
        i2++
      }
      i1++
    }

    setShow(arr2)
    setList(arr)

  }


  return (

    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />

      <View style={styles.header}>

        <View style={styles.leftBar}>
          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toMenu}>
            <Image style={styles.icon}
            source={require('../../assets/icons/back.png')}/>
          </TouchableHighlight>
        </View>

        <Text style={styles.title}>
          Аппаратура
        </Text>

        <View style={styles.rightBar}>
          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toAdd}>
            <Image style={styles.icon}
            source={require('../../assets/icons/add.png')}/>
          </TouchableHighlight>
        </View>

      </View>
      



      <FlatList data={list} style={styles.list} renderItem={({ item , index }) => (

        <View style={styles.block}>


          <View style={styles.top}>

            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.more}>

              <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={() => {toggleDropDown(index)}}>
                <Image style={styles.moreIcon}
                source={require('../../assets/icons/more.png')}/>
              </TouchableHighlight>
              
            </View>

          </View>

          <Text style={styles.name}>{item.cnt} шт.</Text>
          
          {

            show[index] ? (
              <View style={[styles.bottom]}>
      
                <Text style={[styles.button,{color: '#333333'}]}>{item.description}</Text>
                <Text style={[styles.button,{color: '#333333'}]}>Владельцы:
                  <Text style={[styles.button,{color: '#333333'},{fontWeight: '600'}]}> {item.owner}</Text>
                </Text>
                <Text style={[styles.button,{color: '#008dd9'}]} onPress={() => {update(item)}}>Редактировать</Text>
                <Text style={[styles.button,{color: '#ff0000'}]} onPress={() => {deleteData(item.name, index)}}>Удалить</Text>
      
              </View>
            ): null

          }


        </View>

      )}/>
      
    </SafeAreaView>

  );

}
