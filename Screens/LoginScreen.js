import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";


export default function LoginScreen() {
  const [onFocusEmail, setFocusEmail] = useState(false);
  const [onFocusPassword, setFocusPassword] = useState(false);
  const [showPpassword, setshowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const navigation = useNavigation();

  const onSubmit = () => {
    const inputValue = { email, password };
    console.log(inputValue);
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
      <ImageBackground source={require("../Images/ImageBg.jpg")} style={styles.image} resizeMode="cover" >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{...styles.form, paddingBottom: isShowKeyboard ? 0 : 90}}>
            <Text style={styles.title}>Увійти</Text>

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
              <Text style={styles.btnTitle}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.linkTitle}>
                Немає акаунту?
                <Text style={styles.linkText}  >Зареєструватися</Text>
              </Text>
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
  },
  title: {
    color: "black",
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#E8E8E8",
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
  linkTitle: {
    color: "#1B4371",
    textAlign: "center",
    fontSize: 16,
  },
  linkText: {
    textDecorationLine: "underline",
  },
  showBtn: {
    position: "absolute",
    top: 182,
    right: 32,
  },
  showBtnText: {
    color: "#1B4371",
    fontSize: 16,
  },
});
