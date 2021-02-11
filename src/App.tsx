import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {rootReduser} from './redusers'
import thunk from 'redux-thunk'
import './App.scss'
import {NavigatorContext} from './navigation'
import {NavBar} from './components/navbar/navBar'
import {LoadingPage} from './components/loadingPage/loadingPage'
import {TablesDataPage} from './components/tablesDataPage/tablesDataPage'
import {TempChartPage} from './components/tempChartPage/tempChartPage'
import {HumChartPage} from './components/humChartPage/humChartPage'
import {Temp3DChart} from './components/temp3DChart/temp3DChart'


const store = createStore(rootReduser, applyMiddleware(thunk))

const App = () => {
  const {loadingFiles, tablesData, tempChart, humChart, temp3DChart, hun3DChart} = React.useContext(NavigatorContext)
  return <Provider store={store}>
    <NavBar />
    <main className="pages">
      {loadingFiles ? <LoadingPage /> : null}
      {tablesData ? <TablesDataPage /> : null}
      {tempChart ? <TempChartPage /> : null}
      {humChart ? <HumChartPage /> : null}
      {temp3DChart ? <Temp3DChart /> : null}
      {hun3DChart ? 'hun3DChart' : null}
    </main>

  </Provider>
}

export default App;

