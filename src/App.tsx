import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import './App.scss'
import {NavigatorContext} from './navigation'
import {NavBar} from './components/navbar/navBar'
import {LoadingPage} from './components/loadingPage/loadingPage'


const store = createStore(rootReduser, applyMiddleware(thunk))

const App = () => {
  const {loding, table, tempChart, humChart} = React.useContext(NavigatorContext)
  return <Provider store={store}>
    <NavBar />
    <main className="pages">
      {loding ? <LoadingPage /> : null}
      {table ? 'tablePahe' : null}
      {tempChart ? 'tempChartPahe' : null}
      {humChart ? 'HumChartPahe' : null}
    </main>

  </Provider>
}

export default App;

