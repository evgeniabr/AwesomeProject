// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyADYYJfov2-KCFGwEan9jMA-lmnGK5pwoc",
    authDomain: "awesomeproject-400318.firebaseapp.com",
    projectId: "awesomeproject-400318",
    storageBucket: "awesomeproject-400318.appspot.com",
    messagingSenderId: "285477683225",
    appId: "1:285477683225:web:ce5b72d543184406ecea88",
    measurementId: "G-3MMBJ3841K"
  };


  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);
  export const storage = getStorage(app);