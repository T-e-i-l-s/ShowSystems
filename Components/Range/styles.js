
import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  container: { // Основной стиль

    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'flex-start',

    backgroundColor: '#e6e6e6',

    paddingBottom: 20,

  },


  header: { // Бар с навигацией

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',

    width: '90%',

    marginTop: 20

  },


  leftBar: { // Левая чась бара

    flexDirection: 'column',
    
    alignItems: 'flex-start',

    width: '20%',

  },


  rightBar: { // Правая часть

    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '20%',

  },


  icon: { // Стиль иконок

    height: 25,
    width: 25,

  },


  icon2: { // Стиль иконок

    height: 33,
    width: 33,

  },


  title: { // Стиль заголовка страницы

    flexDirection: 'column',

    width: '60%',

    fontSize: 25,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '400',
    fontFamily: 'rubik',

  },


  directory: {

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '90%',

    marginTop: 20

  },


  path: { // Стиль заголовка страницы

    flexDirection: 'column',

    fontSize: 17,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '300',
    fontFamily: 'rubik',

  },

  
  list: { // Стиль списка устройств

    width: '100%'

  },

  
  list2: { // Стиль списка устройств

    width: '100%'

  },

  
  pathList: { // Стиль списка устройств

    width: '100%',
    marginBottom: 10

  },


  foltherBlock: {

    flexDirection: 'row',

    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '100%',

    backgroundColor: '#fff',

    paddingVertical: 10,
    marginBottom: 5,

    borderRadius: 10,

  },


  folther: {

    width: '60%',

    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'rubik',

  },


  iconBlock: {

    width: "20%",

    alignItems: 'center',
    justifyContent: 'center',

  },


  editBar: {

    width: "20%",

    alignItems: 'center',
    justifyContent: 'center',

  },


  blockIcon: { // Стиль иконок

    height: 25,
    width: 25,

  },


  editIcon: { // Стиль иконок

    height: 25,
    width: 25,

  },


  block: {

    justifyContent: 'center',
    alignItems: 'flex-start',

    width: '100%',

    backgroundColor: '#fff',

    paddingVertical: 10,
    marginBottom: 5,

    borderRadius: 10,

  },


  top: {
    
    flexDirection: 'row',
    width: '100%'

  },


  name: {

    width: '40%',

    fontSize: 19,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'rubik',

  },


  cnt: {

    width: '20%',

    fontSize: 19,
    textAlign: 'right',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik',

  },


  moreIcon: { // Стиль иконок

    height: 20,
    width: 20,

  },


  bottom: {
    
    width: '100%'

  },


  button: {

    width: '95%',

    fontSize: 19,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik',

    marginLeft: '20%'

  },



});