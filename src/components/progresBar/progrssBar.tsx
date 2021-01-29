import React from 'react'
import {useSelector} from 'react-redux'
import './progressBar.scss'
import {AppState} from '../../redusers/index'

export const ProgressBar: React.FC<{}> = () => {
  const ProgressState = useSelector((state: AppState) => state.progressBar)
  const progresItems = [] as JSX.Element[]
  for (let i = 0; i < ProgressState.progres; i++) {
    progresItems.push(<div key={i.toString()} className="ProgressBar__item"></div>)
  }
  return ProgressState.visible ? <div className="ProgressBar">
    {progresItems}
  </div> : null
}
