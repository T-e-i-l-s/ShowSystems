import login from './Components/Login/page'
import menu from   './Components/Menu/page'
import range from   './Components/Range/page'
import addEquipment from './Components/CreateObject/page'
import createFolther from './Components/CreateFolther/page'
import info from   './Components/Info/page'
import create from './Components/Create/page'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate () {

  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={ login }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
      />
      <Stack.Screen
        name="menu"
        component={ menu }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
      />
      <Stack.Screen
        name="range"
        component={ range }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={false}
      />
      <Stack.Screen
        name="addEquipment"
        component={ addEquipment }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="createFolther"
        component={ createFolther }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
        initialParams={[]}
      />
      <Stack.Screen
        name="info"
        component={ info }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
      />
      <Stack.Screen
        name="create"
        component={ create }
        options={ { headerShown: false, animationTypeForReplace: 'pop' } }
      />
    </Stack.Navigator>
  </NavigationContainer>

}
