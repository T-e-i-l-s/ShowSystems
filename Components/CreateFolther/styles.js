
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


  icon: { // Стиль иконок

    height: 25,
    width: 25,

  },


  title: { // Стиль заголовка страницы

    flexDirection: 'column',

    width: '80%',

    fontSize: 25,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '400',
    fontFamily: 'rubik',

  },


  inputName: { // Стиль названия textInput

    width: '90%',

    fontSize: 15,
    color: '#6b6b6b',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'rubik',

    marginTop: 35

  },


  input: { // Стиль textInput

    width: '90%',
    height: 40,
    
    backgroundColor: '#e6e6e6',

    fontSize: 23,
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'rubik',

    borderBottomColor: '#6b6b6b',
    borderBottomWidth: 2,

    outlineStyle: 'none',

  },


  button: { // Стиль кнопки

    width: '90%',

    backgroundColor: '#333333',

    fontSize: 20,
    color: '#e6e6e6',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'rubik',

    borderRadius: 40,

    padding:20,
    marginTop: 35

  }
  
});