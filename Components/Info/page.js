import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import styles from './styles'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Info</Text>
      <StatusBar style="auto" />
    </View>
  );
}
