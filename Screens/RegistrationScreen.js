import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";


export default function RegistrationScreen() {
  const [onFocusLogin, setFocusLogin] = useState(false);
  const [onFocusEmail, setFocusEmail] = useState(false);
  const [onFocusPassword, setFocusPassword] = useState(false);
  const [showPpassword, setshowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const navigation = useNavigation();
 

  const onSubmit = () => {
    const inputValue = { login, email, password };
    console.log(inputValue);
    setLogin("");
    setEmail("");
    setPassword("");
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    navigation.navigate('Home', {
      screen: 'PostsScreen'
   });
  };


  return (
    <TouchableWithoutFeedback 
    onPress={() => {Keyboard.dismiss();
    setIsShowKeyboard(false)}}>
      <View style={styles.container}>
      <ImageBackground source={require("../Images/ImageBg.jpg")} style={styles.image} resizeMode="cover">
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
         
            <Image style={styles.img} resizeMode="contain" />
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
         
          <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 78}}>
            <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: onFocusLogin ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                value={login}
                onFocus={() => {
                  setFocusLogin(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusLogin(false);
                }}
                onChangeText={setLogin}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: onFocusEmail ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                value={email}
                onFocus={() => {
                  setFocusEmail(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusEmail(false);
                }}
                onChangeText={setEmail}
              />

              <TextInput
                style={{
                  ...styles.input,
                  borderColor: onFocusPassword ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                value={password}
                secureTextEntry={showPpassword ? true : false}
                onFocus={() => {
                  setFocusPassword(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusPassword(false);
                }}
                onChangeText={setPassword}
              />

              <TouchableOpacity activeOpacity={0.7} style={styles.showBtn}>
                <Text
                  style={styles.showBtnText}
                  onPress={() => setshowPassword(!showPpassword)}
                >
                  {" "}
                  {!showPpassword ? "Приховати" : "Показати"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={onSubmit}>
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            
          </View>
         
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
      position: 'relative',
      
      
  },
  image:{
    flex: 1,
    justifyContent: 'flex-end',
      },
      form: {
        backgroundColor: '#fff',
          paddingHorizontal: 16,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,  
          alignItems: "stretch",    
      },
  title: {
    color: "black",
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#E8E8E8",
    height: 50,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },

  btn: {
    display: "flex",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,
  },
  btnTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },

  showBtn: {
    position: "absolute",
    right: 32,
    top: 308,
  },
  showBtnText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 19,
    color: "#1B4371",
    marginLeft: "auto",
    marginRight: "auto",
  },
  img: {
    width: 120,
    height: 120,
    position: 'absolute',
    alignSelf: 'center',
    top: -60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    borderColor: "transparent",
    zIndex: 10,
  },
  addBtn: {
    position: 'absolute',
    width: 25,
    height: 25,
    left: 235,
    top: 21,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  addBtnText: {
    color: "#FF6C00",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
