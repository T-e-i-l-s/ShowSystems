import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: { // Основной стиль
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#e6e6e6',
    paddingBottom: 20,
  },

  scroll: { // Стиль scrollView
    width: '100%'
  },

  header: { // Стиль верхней части
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '90%',
    marginTop: 20
  },

  icon: { // Стиль иконок
    height: 35,
    width: 35,
    marginLeft: 10
  },

  title: { // Стиль заголовка
    width: '90%',
    fontSize: 25,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '400',
    fontFamily: 'rubik',
    marginTop: 10
  },

  addNew: { // Стиль кнопки добавить новые проект
    width: '90%',
    backgroundColor: '#333333',
    fontSize: 18,
    color: '#e6e6e6',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'rubik',
    borderRadius: 40,
    padding:15,
    marginTop: 20
  },
  
  list: { // Стиль списка проектов
    width: '90%',
  },

  block: { // Стиль блока проекта
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginTop: 20
  },

  name: { // Стиль названия проекта
    width: '90%',
    fontSize: 18,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik'
  },
  
  info: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    height: '100%',
    width: '85%'
  },

  open: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '15%'
  },

  date: { // Стиль даты
    width: '90%',
    fontSize: 18,
    textAlign: 'left',
    color: '#a6a6a6',
    fontWeight: '400',
    fontFamily: 'rubik'
  },

  button: { // Кнопка подробнее
    width: 20,
    height: 20
  },
});