import React from 'react'
import './tablesDataPage.scss'
import cn from 'classnames'
import {Extremums} from '../../redusers/tableDataReduser'

type Props = {
  data: Extremums,
  visible: boolean,
}

export const ExtremumTable: React.FC<Props> = ({data, visible}) => {
  return visible ? <div className="data-page-main">
    <div className={cn('table__row', 'header')}>
      <div>Точка</div>
      <div>Минимальная температруа</div>
      <div>Когда</div>
      <div>Средняя температруа</div>
      <div>За период</div>
      <div>Максимальная температруа</div>
      <div>Когда</div>
      <div>Минимальная влажность</div>
      <div>Когда</div>
      <div>Средняя влажность</div>
      <div>За период</div>
      <div>Максимальная влажность</div>
      <div>Когда</div>
    </div>
    {Object.keys(data).map(key => <div key={key} className={cn('table__row', 'body')}>
      <div>{key}</div>
      <div>{`${data[key].temperature.min.value} \u00B0C`}</div>
      <div>{data[key].temperature.min.date}</div>
      <div>{`${data[key].temperature.mid.value} \u00B0C`}</div>
      <div>{data[key].temperature.mid.date}</div>
      <div>{`${data[key].temperature.max.value} \u00B0C`}</div>
      <div>{data[key].temperature.max.date}</div>
      <div>{`${data[key].humidity.min.value} %`}</div>
      <div>{data[key].humidity.min.date}</div>
      <div>{`${data[key].humidity.mid.value} %`}</div>
      <div>{data[key].humidity.mid.date}</div>
      <div>{`${data[key].humidity.max.value} %`}</div>
      <div>{data[key].humidity.max.date}</div>
    </div>)}
  </div> : null
}