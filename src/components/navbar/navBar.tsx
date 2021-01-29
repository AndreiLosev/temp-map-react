import React from 'react'
import './navBar.scss'
import {NavigatorContext, Pages} from '../../navigation'
import cn from 'classnames'


export const NavBar = () => {
  const {goTo, ...pages} = React.useContext(NavigatorContext)
  const pagesNames = Object.keys(pages) as Pages[]
  return (
    <nav className="navBar">
      {pagesNames.map(i => <div key={i}
        className={cn({'navBarActive': pages[i]}, 'navBar__Item')} onClick={() => goTo(i)}>
        {i}
      </div>)}
    </nav>
  )
}
