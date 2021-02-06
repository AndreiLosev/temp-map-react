import React from 'react'
import {AbsExtremum} from '../../redusers/tableDataReduser'
import cn from 'classnames'
import './tablesDataPage.scss'

type Props = {
  date: AbsExtremum,
  visible: boolean,
}

export const AbsExtremumTable: React.FC<Props> = ({date, visible}) => {
  const createHeader = (name: string) => <div className={cn('table__row', 'header')}>
    <div>{name}</div>
    <div>Точка</div>
    <div>Значение</div>
    <div>Когда</div>
  </div>
  const tableName = (type: string) => ({
    max: `Максимальная ${type}`,
    min: `Минемальная ${type}`,
    // mid: `Средняя ${type}`,
  })
  return <>
    {visible
      ? <>
      {(Object.keys(tableName('температура')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
        <div className="absExtremum" key={item}>
          {createHeader(tableName('температура')[item])}
          {date.temperature[item].map(item =>
            <div className={cn('table__row', 'body')} key={item.point}>
              <div></div>
              <div>{item.point}</div>
              <div>{`${item.value} \u00B0C`}</div>
              <div>{item.date}</div>
            </div>)}
        </div>)}
        {(Object.keys(tableName('влажность')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
        <div className="absExtremum" key={item}>
          {createHeader(tableName('влажность')[item])}
          {date.humidity[item].map(item =>
            <div className={cn('table__row', 'body')} key={item.point}>
              <div></div>
              <div>{item.point}</div>
              <div>{`${item.value} %`}</div>
              <div>{item.date}</div>
            </div>)}
        </div>)}
        <div className="absMidExtremum">

        </div>
      </>
      : null}
  </>
}