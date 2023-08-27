// Подгружаем все необходимое
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import React , { useState } from 'react'
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'


let flag = false


export default function App ({ navigation }) {

  const [folthers,setFolthers] = useState([])
  const [equip,setEquip] = useState([])
  const [path,setPath] = useState(['Склад'])
  const [folterData,setFoltherData] = useState()
  const [equipData,setEquipData] = useState()
  const [show,setShow] = useState([])


  const toMenu = () => { // Функция перехода на экран меню

    navigation.navigate('menu')

  }


  const toCreateFolther = () => { // Функция перехода на экран добавить устройство(для создания)

    const param = [path[path.length-1], folterData[path[path.length-1]]]
    navigation.navigate('createFolther', param)

  }


  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      loadDirectories()

    });

    return focusHandler;

  }, [navigation]);


  async function loadDirectories () {

    let docRef = doc(db, 'ShowSystems', 'Folthers')
    let docSnap = await getDoc(docRef)
    let result = docSnap.data()

    await setFoltherData(result)

    if(!flag){
      await setFolthers(result['Склад'])
    }else{
      const folther = (path[path.length-1])
      setFolthers(result[folther])
    }

    let arr3 = []

    docRef = doc(db, 'ShowSystems', 'Equipment')
    docSnap = await getDoc(docRef)
    result = docSnap.data()

    await setEquipData(result)

    if(!flag){
      flag = true
      const arr = result['Склад']
      let arr2 = []
      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });
      setEquip(arr2)
    }else{
      const arr = result[path[path.length-1]]
      let arr2 = []
      if(arr != undefined || arr != null){
        Object.keys(arr).forEach(e => {
          arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
          arr3.push(false)
          setShow(arr3)
        });
      }
      setEquip(arr2)
    }

  }


  async function updatePage (folther) {

    path.push(folther)
    setFolthers(folterData[folther])

    let arr3 = []

    const result = equipData
    const arr = result[folther]
    let arr2 = []
    if(arr != undefined || arr != null){
      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });
    }
    setEquip(arr2)
    
  }


  async function back (folther) {

    let arr = path

    const i = arr.indexOf(folther)

    for (let j = arr.length-1; j > i; j--) {
      arr.pop()
    }

    setPath(arr)

    setFolthers(folterData[folther])

    let arr3 = []
    
    const result = equipData
    arr = result[folther]
    let arr2 = []
    if(arr != undefined || arr != null){
      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });
    }
    setEquip(arr2)

  }


  async function dropDown (e) {

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


  async function deleteData(e) { // Функция удаления данных

    let arr = equipData[path[path.length-1]]
    let arr2 = {}
    Object.keys(arr).forEach(el => {
      if(el != e){
        arr2[el] = arr[el]
      }
    })

    let arr3 = equipData
    arr3[path[path.length-1]] = arr2
    setEquipData(arr3)

    const folther = path[path.length-1]

    const cityRef = await doc(db, 'ShowSystems', 'Equipment');
    console.log(arr2)
    await setDoc(cityRef, arr3, { merge: false });

    const result = equipData
    arr = result[folther]
    arr2 = []
    arr3 = []
    if(arr != undefined || arr != null){
      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });
    }
    setEquip(arr2)

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

          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toCreateFolther}>
            <Image style={styles.icon2}
            source={require('../../assets/icons/folther.png')}/>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} >
            <Image style={[styles.icon2,{marginLeft: 10}]}
            source={require('../../assets/icons/audio.png')}/>
          </TouchableHighlight>

        </View>

      </View>


      <View style={styles.directory}>

        <FlatList scrollEnabled={true} horizontal={true} style={styles.pathList} data={path} renderItem={({ item }) => (

          <Text style={styles.path} onPress={() => {back(item)}}>{item + " > "}</Text>

        )}/>

      </View>


      <View style={{width: '100%'}}>

        <FlatList style={[styles.list,{borderTopWidth: 2}]} data={folthers} renderItem={({ item, index }) => (

          <View style={styles.foltherBlock}>
            <Text style={[styles.folther]} onPress={() => {updatePage(item)}}>{item}</Text>

            <TouchableHighlight style={styles.editBar} underlayColor={'rgba(255, 0, 255,0)'}>
              <Image style={[styles.editIcon]}
              source={require('../../assets/icons/edit.png')}/>
            </TouchableHighlight>
          </View>

        )}/>

      </View>


      <View style={{width: '90%'}}>

        <FlatList data={equip} style={styles.list2} renderItem={({ item , index }) => (

          <View style={styles.block}>

            <View style={styles.top}>

              <Text style={styles.name}>{item[0]}</Text>

              <View style={styles.more}>

                <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={() => {dropDown(index)}} style={styles.iconBlock}>
                  <Image style={styles.moreIcon}
                  source={require('../../assets/icons/more.png')}/>
                </TouchableHighlight>
                
              </View>

            </View>

            <Text style={styles.name}>{item[1]} шт.</Text>
          
            {

              show[index] ? (
                <View style={[styles.bottom]}>
        
                  <Text style={[styles.button,{color: '#333333'}]}>{item[2]}</Text>
                  <Text style={[styles.button,{color: '#333333'}]}>Владельцы:
                    <Text style={[styles.button,{color: '#333333'},{fontWeight: '600'}]}> {item[3]}</Text>
                  </Text>
                  <Text style={[styles.button,{color: '#008dd9'}]}>Редактировать</Text>
                  <Text style={[styles.button,{color: '#ff0000'}]} onPress={() => {deleteData(item[0])}}>Удалить</Text>
        
                </View>
              ): null
            
            }

          </View>

        )}/>

      </View>
      
    </SafeAreaView>

  );

}
