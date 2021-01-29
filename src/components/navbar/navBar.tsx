import React from 'react'
import './navBar.scss'
import {NavigatorContext} from '../../navigation'
import cn from 'classnames'


export const NavBar = () => {
  const {goTo, loding, table, tempChart, humChart} = React.useContext(NavigatorContext)
  return (
    <nav className="navBar">
      <div className={cn('navBar__Item', {'navBarActive': loding})} onClick={() => goTo('loding')}>
        Файлы
      </div>
      <div className={cn('navBar__Item', {'navBarActive': table})} onClick={() => goTo('table')}>
        Таблицы
      </div>
      <div className={cn('navBar__Item', {'navBarActive': tempChart})} onClick={() => goTo('tempChart')}>
        График температуры
      </div>
      <div className={cn('navBar__Item', {'navBarActive': humChart})} onClick={() => goTo('humChart')}>
        График влажности
      </div>
    </nav>
  )
}