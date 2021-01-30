
import React from 'react'
import './loading.scss'
import spiner from './spiner.webp'

type Props = {
  visible: boolean
}


export const LoadingSpiner: React.FC<Props> = ({ visible }) => {
  return visible ? <img src={spiner} alt="loading" className="spiner" /> : null
}
