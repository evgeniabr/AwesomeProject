import 'react-native-gesture-handler';
import React from 'react'
import { Provider } from 'react-redux';
import {store} from './redux/store';
import CoreFile from './components/CoreFile';

export default function App() {
  return (
   <Provider store={store}>    
   <CoreFile/>
    </Provider>
    
  );
}




