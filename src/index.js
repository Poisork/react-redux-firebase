import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import store from './store'
import Popup from 'react-popup'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
    <Popup/>
  </Provider>
  , document.getElementById('app'))
