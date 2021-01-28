import React from 'react'
import './App.scss'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import {NavigatorContext} from './navigation'

const store = createStore(rootReduser, applyMiddleware(thunk))

const App = () => {
  const {loding, table, tempChart, humChart} = React.useContext(NavigatorContext)
  return <Provider store={store}>
    <nav></nav>
    <main>
      {loding ? 'loadavgPahe' : null}
      {table ? 'tablePahe' : null}
      {tempChart ? 'tempChartPahe' : null}
      {humChart ? 'HumChartPahe' : null}
    </main>

  </Provider>
}

export default App;

