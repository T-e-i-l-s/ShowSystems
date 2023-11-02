
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

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '20%',

  },


  rightBar: { // Правая часть

    flexDirection: 'row',
    
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '20%',

  },


  icon: { // Первый стиль иконок

    height: 25,
    width: 25,

  },


  icon2: { // Второй стиль иконок

    height: 33,
    width: 33,

  },


  title: { // Стиль заголовка страницы

    flexDirection: 'column',

    width: '60%',

    fontSize: 22,
    textAlign: 'center',
    color: '#333333',
    fontWeight: '400',
    fontFamily: 'rubik',

  },


  directory: { // Стиль пути

    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',

    width: '90%',

    marginTop: 20

  },

  
  pathList: { // Стиль списка папок в пути

    width: '100%',
    marginBottom: 10

  },


  path: { // Стиль текста пути

    flexDirection: 'column',

    fontSize: 17,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '300',
    fontFamily: 'rubik',

  },


  iconBlock: { // Стиль блока с иконки view

    width: "20%",

    alignItems: 'center',
    justifyContent: 'center',

  },


  blockIcon: { // Стиль иконки файла или устройства

    height: 25,
    width: 25,

  },

  
  list: { // Стиль списка файлов

    width: '100%'

  },


  folderBlock: { // Стиль блока файла

    flexDirection: 'row',

    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '100%',

    backgroundColor: '#fff',

    paddingVertical: 10,
    marginBottom: 5,

    borderRadius: 10,

  },


  folder: { // Стиль названия файла

    width: '60%',

    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'rubik',

  },


  editIcon: { // Стиль иконки "Редактировать"

    height: 25,
    width: 25,

  },


  editBar: { // Стиль блока иконки "Редактировать"

    flexDirection: 'row',
    
    width: "20%",

    alignItems: 'center',
    justifyContent: 'center',

  },

  
  list2: { // Стиль списка устройств

    width: '100%'

  },


  block: { // Стиль блока устройства

    justifyContent: 'center',
    alignItems: 'flex-start',

    width: '100%',

    backgroundColor: '#fff',

    paddingVertical: 10,
    marginBottom: 5,

    borderRadius: 10,

  },


  top: { // Стиль верхней части блока устройства
    
    flexDirection: 'row',
    width: '100%'

  },


  name: { // Стиль названия устройства

    width: '40%',

    fontSize: 19,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'rubik',

  },


  cnt: { // Стиль количества в блоке устройства

    width: '20%',

    fontSize: 19,
    textAlign: 'right',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik',

  },


  moreIcon: { // Стиль иконки ***

    height: 20,
    width: 20,

  },


  bottom: { // Стиль нижней части блока устройства
    
    width: '100%'

  },


  button: { // Стиль кнопок и информации об устройстве

    width: '70%',

    fontSize: 19,
    textAlign: 'left',
    color: '#333333',
    fontWeight: '500',
    fontFamily: 'rubik',

    marginLeft: '20%'

  },

});