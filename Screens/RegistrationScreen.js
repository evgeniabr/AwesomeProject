import React, { useState } from "react";
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
} from "react-native";

export default function RegistrationScreen() {
  const [onFocusLogin, setFocusLogin] = useState(false);
  const [onFocusEmail, setFocusEmail] = useState(false);
  const [onFocusPassword, setFocusPassword] = useState(false);
  const [showPpassword, setshowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const inputValue = { login, email, password };
    console.log(inputValue);
    setLogin("");
    setEmail("");
    setPassword("");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.imgBox}>
            <Image style={styles.img} resizeMode="contain" />
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: onFocusLogin ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логін"
                value={login}
                onFocus={() => {
                  setFocusLogin(true);
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
                value={email}
                onFocus={() => {
                  setFocusEmail(true);
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
                value={password}
                secureTextEntry={showPpassword ? true : false}
                onFocus={() => {
                  setFocusPassword(true);
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
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  form: {
    alignItems: "stretch",
    marginHorizontal: 16,
    paddingBottom: 78,
  },
  title: {
    color: "black",
    // marginTop: 92,
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
    right: 16,
    top: 149,
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
  imgBox: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 120,
  },
  img: {
    marginTop: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "transparent",
  },
  addBtn: {
    marginLeft: "100%",
    transform: [{ translateX: -12.5 }, { translateY: -40 }],
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    color: "#FF6C00",
    fontSize: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
