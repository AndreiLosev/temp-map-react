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
  const {loadingFiles, tablesData, tempChart, humChart, temp3DChart, hun3DChart} = React.useContext(NavigatorContext)
  return <Provider store={store}>
    <NavBar />
    <main className="pages">
      {loadingFiles ? <LoadingPage /> : null}
      {tablesData ? 'tablePahe' : null}
      {tempChart ? 'tempChartPahe' : null}
      {humChart ? 'HumChartPahe' : null}
      {temp3DChart ? 'temp3DChart' : null}
      {hun3DChart ? 'hun3DChart' : null}
    </main>

  </Provider>
}

export default App;

