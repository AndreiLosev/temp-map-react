import React from 'react'
import './setPeriodAndCalc.scss'
import Inputmask from 'inputmask'
import {myDatePars} from '../../utils/lilteUtils'

type Props = {
  start: number,
  end: number,
  maxPeriod: {start: number, end: number},
  setPeriod: (dateTime: number, type: 'start' | 'end') => void,
  calculate: () => void,
}

export const SetPeriodAndCalc: React.FC<Props> = ({ start, end, maxPeriod, setPeriod, calculate }) => {
  const refStart = React.useRef<HTMLInputElement>(null)
  const refEnd = React.useRef<HTMLInputElement>(null)
  const [periodS, setPeriodS] = React.useState({start: '', end: ''})
  // const OneHours = 60 * 60 * 1000
  React.useEffect(() => {
    const mask = new Inputmask('99.99.9999, 99:99')
    if (refStart.current && refEnd.current) {
      mask.mask(refStart.current)
      mask.mask(refEnd.current)
    }
    if (!start && !end)
      setPeriodS({
        start: new Date(maxPeriod.start).toLocaleString(),
        end: new Date(maxPeriod.end).toLocaleString(),
      })
    else
    setPeriodS({
      start: new Date(start).toLocaleString(),
      end: new Date(end).toLocaleString(),
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const setAndValidPeriod = (type: 'start' | 'end') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const [Year, Munth, Day, Hours, Minuts] = myDatePars(e.target.value)
      .map(i => i ? i : 0)
    setPeriod(+new Date(Year, Munth, Day, Hours, Minuts), type)
    setPeriodS(prev => ({...prev, [type]: e.target.value}))
  }
  return <div className="period-settings">
    <span>start</span>
    <input
      type="text" className="period" ref={refStart}
      value={periodS.start}
      onChange={setAndValidPeriod('start')}
    />
    <span>end</span>
    <input
      type="text" className="period" ref={refEnd}
      value={periodS.end}
      onChange={setAndValidPeriod('end')}
    />
    <button className="calculate" onClick={calculate}>Calculate</button>
  </div>
}