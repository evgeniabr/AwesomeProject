import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  

export default function LoginScreen() {
    const [onFocusEmail, setFocusEmail] = useState(false);
    const [onFocusPassword, setFocusPassword] = useState(false);
    const [showPpassword, setshowPassword] = useState(false)
  return (
    <View style={styles.container}>
  <View style={styles.form}>
  <Text style={styles.title}>
  Увійти
        </Text>
         <TextInput
        style={{...styles.input,  borderColor: onFocusEmail ? "#FF6C00" : "#E8E8E8"}}
       placeholder="Адреса електронної пошти"
       onFocus={() => {
        setFocusEmail(true);
      }}
      onBlur={() => {
        setFocusEmail(false);
      }}/>

         <TextInput
       style={{...styles.input,  borderColor: onFocusPassword ? "#FF6C00" : "#E8E8E8"}}
       placeholder="Пароль"
       secureTextEntry={showPpassword ? true : false}
       onFocus={() => { setFocusPassword(true)}}
       onBlur={() => {setFocusPassword(false)}}/>

<TouchableOpacity
        activeOpacity={0.7}
        style={styles.showBtn}>
      <Text style={styles.showBtnText}
      onPress={() => setshowPassword(!showPpassword)}> {!showPpassword ? 'Приховати' : 'Показати'}
      
    </Text>
    </TouchableOpacity>
       <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnTitle}>Увійти</Text>
        </TouchableOpacity> 
        <TouchableOpacity>
          <Text style={styles.linkTitle}>
            Немає акаунту?
            <Text style={styles.linkText}>Зареєструватися</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 32,
      paddingBottom: 132,
      backgroundColor: '#fff',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      justifyContent: 'flex-end',
    },
    form: {
      alignItems: "stretch",
      marginHorizontal: 16,
    },
    title: {
        color: 'black',
        marginTop: 32,
        marginBottom: 32,
        fontSize: 30,
        lineHeight: 35,
        fontWeight: '500',
        textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderRadius: 8,
      height: 50,
      padding: 10,
      marginBottom: 16,
      fontSize: 16,
    },
   
    btn:{
        display: "flex",
        height: 51,
        backgroundColor: '#FF6C00',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 43,
        marginBottom: 16,
      },
      btnTitle:{
        color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
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