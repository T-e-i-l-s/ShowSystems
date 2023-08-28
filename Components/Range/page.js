// Подгружаем все необходимое
import { StatusBar } from 'expo-status-bar'
import { Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import React , { useState } from 'react'
import db from '../../Hooks/initFirebase'
import { doc, getDoc, setDoc, updateDoc, deleteField } from 'firebase/firestore/lite'


let flag = false // Переменная для проверки состояния данных


export default function App ({ navigation }) {

  const [folders,setFolders] = useState([]) // Список папок на экране
  const [equip,setEquip] = useState([]) // Список оборудования на экране
  const [path,setPath] = useState(['Склад']) // Путь
  const [folderData,setFolderData] = useState() // Данные о всех папках
  const [equipData,setEquipData] = useState() // Данные о всех устройствах
  const [show,setShow] = useState([]) // Состояние dropdown списков


  const toMenu = () => { // Функция перехода на экран меню

    navigation.navigate('menu')

  }


  const toCreateFolther = () => { // Функция перехода на экран создать папку(для создания)

    const param = [path[path.length-1], folderData[path[path.length-1]]]
    navigation.navigate('createFolther', param)

  }


  const toCreateEquip = () => { // Функция перехода на экран создать устройство(для создания)

    const param = [path[path.length-1], equipData]
    navigation.navigate('addEquipment', param)

  }


  async function updateData(e) { // Функция перехода на экран создать устройство(для обновления)
    
    const param = [path[path.length-1], equipData, e]
    navigation.navigate('addEquipment', param)

  }


  async function updateFolder(e) { // Функция перехода на экран создать устройство(для обновления)
    
    const param = [path[path.length-1], folderData[path[path.length-1]], e, folderData[e], equipData[e]]
    navigation.navigate('createFolther', param)

  }


  React.useEffect(() => { // Хук загрузки данных при переходе на страницу

    const focusHandler = navigation.addListener('focus', async () => {

      loadData()

    });

    return focusHandler;

  }, [navigation]);


  async function loadData () { // Функция загрузки данных из бд

    // Загружаем данные о папках
    let docRef = doc(db, 'ShowSystems', 'Folders')
    let docSnap = await getDoc(docRef)
    let result = docSnap.data()

    await setFolderData(result)

    if ( !flag ) {
      await setFolders( result['Склад'] )
    } else {
      const folther = ( path[path.length-1] )
      setFolders( result[folther] )
    }


    // Загружаем данные об устройствах
    docRef = doc(db, 'ShowSystems', 'Equipment')
    docSnap = await getDoc(docRef)
    result = docSnap.data()
    let arr3 = []

    await setEquipData(result)

    if ( !flag ) {

      flag = true
      const arr = result['Склад']
      let arr2 = []
      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });
      setEquip(arr2)

    } else { 

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


  async function updatePage ( folther ) { // Функция обновления данных на странице при переходе между папками

    path.push(folther)
    setFolders(folderData[folther])

    let arr3 = []

    const result = equipData
    const arr = result[folther]
    let arr2 = []

    if ( arr != undefined || arr != null ) {

      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });


    }
    setEquip(arr2)
    
  }


  async function back (folther) { // Функция обновления данных на странице при возвращении на страницу

    let arr = path

    const i = arr.indexOf(folther)

    for ( let j = arr.length-1; j > i; j-- ) {

      arr.pop()

    }

    setPath(arr)
    setFolders(folderData[folther])

    let arr3 = []
    const result = equipData
    arr = result[folther]
    let arr2 = []

    if ( arr != undefined || arr != null ) {

      Object.keys(arr).forEach(e => {
        arr2.push([e,arr[e][0],arr[e][1],arr[e][2]])
        arr3.push(false)
        setShow(arr3)
      });

    }

    setEquip(arr2)

  }


  async function dropDown (e) { // Функция смены состояния dropDown

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

    // Удаляем локально
    let arr = equipData[path[path.length-1]]
    let arr2 = {}

    Object.keys(arr).forEach(el => {

      if ( el != e ) {

        arr2[el] = arr[el]

      }

    })

    let arr3 = equipData
    arr3[path[path.length-1]] = arr2
    setEquipData(arr3)


    // Удаляем в бд
    const cityRef = await doc(db, 'ShowSystems', 'Equipment');
    console.log(arr2)
    await setDoc(cityRef, arr3, { merge: false });
    const folther = path[path.length-1]

    const result = equipData
    arr = result[folther]
    arr2 = []
    arr3 = []

    if ( arr != undefined || arr != null ) {

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
            source={require('../../assets/icons/folder.png')}/>
          </TouchableHighlight>

          <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toCreateEquip}>
            <Image style={[styles.icon2,{marginLeft: 10}]}
            source={require('../../assets/icons/audio.png')}/>
          </TouchableHighlight>

        </View>


      </View>


      <View style={styles.directory}>

        <FlatList 
        scrollEnabled={true} 
        horizontal={true} 
        style={styles.pathList} 
        data={path} 
        renderItem={({ item }) => (

          <Text style={styles.path} onPress={() => {back(item)}}>{item + " > "}</Text>

        )}/>

      </View>


      <View style={{width: '90%'}}>

        <FlatList 
        style={[styles.list]} 
        data={folders} 
        renderItem={({ item }) => (

          <View style={styles.folderBlock}>
            
            <View style={styles.iconBlock}>
              <Image style={styles.blockIcon}
              source={require('../../assets/icons/folder.png')}/>
            </View>

            <Text style={styles.folder} numberOfLines={1} onPress={() => updatePage(item)}>{item}</Text>

            <View style={styles.editBar}>
              <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={() => updateFolder(item)}>
                <Image style={styles.editIcon}
                source={require('../../assets/icons/edit.png')}/>
              </TouchableHighlight>
            </View>

          </View>

        )}/>

      </View>


      <View style={{width: '90%'}}>


        <FlatList 
        data={equip} 
        style={styles.list2} 
        renderItem={({ item , index }) => (


          <View style={styles.block}>


            <View style={styles.top}>
            
              <View style={styles.iconBlock}>
                <Image style={styles.blockIcon}
                source={require('../../assets/icons/audio.png')}/>
              </View>

              <Text style={styles.name} numberOfLines={1}>{item[0]}</Text>
              <Text style={[styles.cnt]}>{item[1]} шт.</Text>

              <View style={styles.iconBlock}>

                <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={() => {dropDown(index)}} >
                  <Image style={styles.moreIcon}
                  source={require('../../assets/icons/more.png')}/>
                </TouchableHighlight>
                
              </View>

            </View>

          
            {

              show[index] ? (

                <View style={[styles.bottom]}>
        
                  <Text style={[styles.button,{color: '#333333'}]}>{item[2]}</Text>
                  <Text style={[styles.button,{color: '#333333'}]}>Владельцы: {item[3]}</Text>
                  <Text style={[styles.button,{color: '#008dd9'}]} onPress={() => {updateData(item)}}>Редактировать</Text>
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
