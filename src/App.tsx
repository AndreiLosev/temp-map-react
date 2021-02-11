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
import {Temp3DChartPage} from './components/temp3DChartPage/temp3DChartPage'
import {Hum3DChartPage} from './components/hum3DChartPage/hum3DChartPage'


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
      {temp3DChart ? <Temp3DChartPage /> : null}
      {hun3DChart ? <Hum3DChartPage /> : null}
    </main>

  </Provider>
}

export default App;

