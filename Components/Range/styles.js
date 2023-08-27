
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

    width: '100%',
    borderColor: '#333333'

  },

  
  list2: { // Стиль списка устройств

    width: '100%',
    marginTop: 10,

  },

  
  pathList: { // Стиль списка устройств

    width: '100%',
    marginBottom: 20

  },


  foltherBlock: {

    flexDirection: 'row',

    width: '100%',

    backgroundColor: '#e6e6e6',

    borderColor: '#333333',
    borderBottomWidth: 2,

    paddingVertical: 13,
    paddingHorizontal: 17,

  },


  folther: {

    width: '80%',

    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik',

  },


  editBar: {

    width: "20%",

    alignItems: 'flex-end',
    justifyContent: 'center',

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
    paddingLeft: 20,
    marginTop: 10,

    borderRadius: 18,

  },


  top: {
  
    flexDirection: 'row',
    width: '100%'

  },


  name: {

    width: '95%',

    fontSize: 19,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'rubik',

  },


  iconBlock: {

    width: "5%",

    alignItems: 'flex-end',
    justifyContent: 'center',

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

  },



});