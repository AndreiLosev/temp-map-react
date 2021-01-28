import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ContexNavigator} from './navigation'

ReactDOM.render(

  <React.StrictMode>
    <ContexNavigator child={<App />}>
    </ContexNavigator>
  </React.StrictMode>,
  document.getElementById('root')
)
