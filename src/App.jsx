import { useState } from 'react'

import './App.css'
import Sismo from './pages/Sismo'
import { Provider } from 'react-redux'; // Import Provider
import store from './js/store'; // Your Redux store

function App() {
 

  return (
    <Provider store={store}>
       <Sismo/>
   </Provider>

  )
}

export default App
