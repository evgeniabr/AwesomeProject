import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import RegistrationScreen from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <View style={styles.container}>
    <ImageBackground source={require("./Images/ImageBg.jpg")}
      resizeMode="cover"
     style={styles.image}>
      <RegistrationScreen/> 
           {/* <LoginScreen />  */}
        <StatusBar style="auto" />
     </ImageBackground>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: "#fff",
    width: '100%'
  },
  image:{
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "center",
    
  },
});
