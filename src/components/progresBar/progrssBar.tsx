import React from 'react'
import {useSelector} from 'react-redux'
import './progressBar.scss'
import {AppState} from '../../redusers/index'

export const ProgressBar: React.FC<{}> = () => {
  const ProgressState = useSelector((state: AppState) => state.progressBar)
  console.log(ProgressState.visible)
  return ProgressState.visible ? <div className="ProgressBar">
    {new Array(ProgressState.progres).map(() => <div key={Date.now()} className="ProgressBar__item"></div>)}
  </div> : null
}