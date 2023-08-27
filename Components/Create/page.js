import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './styles'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Create</Text>
      <StatusBar style="auto" />
    </View>
  );
}
