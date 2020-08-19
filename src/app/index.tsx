import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import devToolsEnhancer from 'remote-redux-devtools'
import { rootReducer } from './store/reducers'

// const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
const store = configureStore({
  devTools: true,
  reducer: rootReducer,
  enhancers: [devToolsEnhancer({ realtime: true, port: 8000 })],
})
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

import './index.css'
import App from './App'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
