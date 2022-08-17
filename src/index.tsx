import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { store } from 'store'
import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

reportWebVitals()
