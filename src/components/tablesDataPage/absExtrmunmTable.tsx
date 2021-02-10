import React from 'react'
import {AbsExtremum} from '../../redusers/tableDataReduser'
import cn from 'classnames'
import './tablesDataPage.scss'

type Props = {
  date: AbsExtremum,
  visible: boolean,
}

export const AbsExtremumTable: React.FC<Props> = ({date, visible}) => {
  const createHeader = (name: string, data: boolean) => <div className={cn('table__row', 'header')}>
    <div>{name}</div>
    <div>Точка</div>
    <div>Значение</div>
    {data ? <div>Когда</div> : null}
  </div>
  const tableName = (type: string) => ({
    max: `Максимальная ${type}`,
    min: `Минемальная ${type}`,
    mid: `Средняя ${type}`,
  })
  return <>
    {visible
      ? <>
      {(Object.keys(tableName('температура')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
        item !== 'mid' ? <div className="absExtremum" key={item}>
          {createHeader(tableName('температура')[item], true)}
          {date.temperature[item].map(item =>
            <div className={cn('table__row', 'body')} key={`${item.point} ${Math.random()}`}>
              <div>Среди всех</div>
              <div>{item.point}</div>
              <div>{`${item.value} \u00B0C`}</div>
              <div>{item.date}</div>
            </div>)}
        </div>: null)}
      {(Object.keys(tableName('влажность')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
        item !== 'mid' ? <div className="absExtremum" key={item}>
          {createHeader(tableName('влажность')[item], true)}
          {date.humidity[item].map(item =>
            <div className={cn('table__row', 'body')} key={`${item.point} ${Math.random()}`}>
              <div>Среди всех</div>
              <div>{item.point}</div>
              <div>{`${item.value} %`}</div>
              <div>{item.date}</div>
            </div>)}
        </div> : null)}
        {(Object.keys(tableName('температура')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
          <div className="absMidExtremum" key={item}>
            {createHeader(tableName('температура')[item], false)}
            {date.temperature.mid[item].map(item =>
            <div className={cn('table__row', 'body')} key={`${item.point} ${Math.random()}`}>
              <div>Из средних</div>
              <div>{item.point}</div>
              <div>{`${item.value} \u00B0C`}</div>
            </div>)}
          </div>
        )}
          {(Object.keys(tableName('влажность')) as (keyof ReturnType<typeof tableName>)[]).map(item =>
          <div className="absMidExtremum" key={item}>
            {createHeader(tableName('влажность')[item], false)}
            {date.humidity.mid[item].map(item =>
            <div className={cn('table__row', 'body')} key={`${item.point} ${Math.random()}`}>
              <div>Из средних</div>
              <div>{item.point}</div>
              <div>{`${item.value} %`}</div>
            </div>)}
          </div>
        )}
      </>
      : null}
  </>
}