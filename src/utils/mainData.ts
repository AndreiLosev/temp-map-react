import { Extremums } from '../redusers/tableDataReduser'
import {myDatePars, roundIn10, temperature2color} from './lilteUtils'
import {FileMetaData} from '../redusers/loadingFileReduser'

export type MainItem = {
  temperature: number,
  humidity: number,
}
export type valueType = 'temperature' | 'humidity'
export type funMode = 'max' | 'min' | 'mid'

export type IntDate = number

export type MainData = {[point: string] :Map<IntDate, MainItem>}


export const getMainData = (data: string[], names: string[]) => {
  const reg = /\d\d.\d\d.\d\d\d\d\s\d\d:\d\d:\d\d;\S/
  const rafData = data
    .map(i => i.split('\n'))
    .map(i => i.filter(j => reg.test(j)))
    .map(i => i.map(j => j.split(';')))
    .map(i => i.map(j => {
      const intDate = myDatePars(j[0])
      return [
        +new Date(intDate[0], intDate[1], intDate[2], intDate[3], intDate[4]),
        roundIn10(parseFloat(j[1].replace(',', '.'))),
      ] as [IntDate, number]
    }))
    const result = rafData.reduce((acc, item, i) => {
      const key = names[i]
      const value = new Map<IntDate, MainItem>()
      item.forEach(i => {
        if (Boolean(value.get(i[0]))) {
          const a = value.get(i[0]) as MainItem
          if (a.temperature) value.set(i[0], {temperature: a.temperature, humidity: i[1]})
        } else {
          value.set(i[0], {temperature: i[1], humidity: 0})
        }
      })
      return {...acc, [key]: value}
    }, {} as MainData)
  return result
}

export const getPeriod = (data: MainData) => {
  const keys = Object.keys(data)
  const mapKeys = keys.map(i => Array.from(data[i].keys()))
  let maxTimeStart = mapKeys[0][0]
  let minTimeEnd = mapKeys[0][mapKeys[0].length - 1]
  mapKeys.forEach(i => {
    if (i[0] > maxTimeStart) { maxTimeStart = i[0] }
    if (i[i.length - 1] < minTimeEnd) { minTimeEnd = i[i.length - 1] }
  })
  return {start: maxTimeStart, end: minTimeEnd}
}

export const findByMainData = (data: Map<IntDate, MainItem>, key: number) => {
  const keyInt = key
  const simpleResult = data.get(keyInt)
  if (simpleResult) return simpleResult
  const keys = Array.from(data.keys())
  if (keys[0] > keyInt) throw new Error('fun findByMainData: key is vary litle')
  if (keys[keys.length - 1] < keyInt) throw new Error('fun findByMainData: key is vary big')
  const [x1, x2] = binFind(keys, keyInt)
  const [y1, y2] = [data.get(x1), data.get(x2)] as [MainItem, MainItem]
  const temperature = roundIn10(y1.temperature + (y1.temperature - y2.temperature) * (keyInt - x1) / (x1 - x2))
  const humidity = roundIn10(y1.humidity + (y1.humidity - y2.humidity) * (keyInt - x1) / (x1 - x2))
  return {temperature, humidity}
}

export const binFind = (data: number[], target: number) => {
  let start = 0
  let end = data.length - 1
  let mid = Math.floor((start + end) / 2)

  while (true) {
    if (target > data[mid]) {
      start = mid
      mid = Math.floor((start + end) / 2)
    } else {
      end = mid
      mid = mid = Math.floor((start + end) / 2)
    }
    if ((end - start) === 1) return [data[start], data[end]]
  }
}

export const getExtremun = (
  mainData: MainData, period: {start: number, end: number},
  param: valueType, mod: funMode, pseudonyms: {[point: string]: string},
) => {
  const points = Object.keys(mainData)
  const more = (a: number, b: number) => a > b
  const les = (a: number, b: number) => a < b
  const condition = (mod === 'max') ? more : les
  return points.reduce((acc, point) => {
    const data = mainData[point]
    const pseudonym = pseudonyms[point]
    const keys = Array.from(data.keys())
    const start = getStartPoint(period.start, keys)
    const step = keys[1] - keys[0]
    let extremum = findByMainData(data, keys[0])[param]
    let extremumKey = start
    for (let i = start; i <= period.end; i += step) {
      const current = findByMainData(data, i)[param]
      if (condition(current, extremum)) {
        extremum = current
        extremumKey = i
      }
    }
    return   {...acc, [pseudonym]: {value: extremum, date: new Date(extremumKey).toLocaleString()}}
  }, {} as {[point: string]: {value: number, date: string}})

}

export const getMidleValue = (
  mainData: MainData, param: 'temperature' | 'humidity',
  period: {start: number, end: number}, pseudonyms: {[point: string]: string},
) => {
  const points = Object.keys(mainData)
  return points.reduce((acc, point) => {
    const data = new Map(mainData[point].entries())
    const pseudonym = pseudonyms[point]
    for (let key of Array.from(data.keys())) {
      if (key < period.start) data.delete(key)
      if (key > period.end) data.delete(key)
    }
      const mid = Array.from(data.keys())
        .reduce((acc, key) => acc + findByMainData(data, key)[param] / data.size, 0)
        const periodD = period.end - period.start
      const Days = Math.trunc(periodD / (24 * 60 * 60 * 1000))
      const Hours = Math.trunc((periodD % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
      const Minust = Math.trunc((periodD % (60 * 60 * 1000)) / (60 * 1000))
      const dateResult = `${Days} д. ${Hours} ч. ${Minust} мин.`
      return {...acc, [pseudonym]: {value: roundIn10(mid), date: dateResult}}
  }, {} as {[point: string]: {value: number, date: string}})
}

export const getAbsoluteExtremum = (data: {[point: string]: {value: number, date: string}}, mod: 'max' | 'min') => {
  const keys = Object.keys(data)
  const more = (a: number, b: number) => a > b
  const les = (a: number, b: number) => a < b
  const condition = (mod === 'max') ? more : les
  let result = [{point: keys[0], value: data[keys[0]].value, date: data[keys[0]].date}]
  for (let key of keys) {
    if (condition(data[key].value, result[0].value)) {
      result = [{point: key, value: data[key].value, date: data[key].date}]
    } else if (data[key].value === result[0].value) {
      result.push({point: key, value: data[key].value, date: data[key].date})
    }
  }
  return result

}

const getStartPoint = <T>(periodStart: T, points: T[]) => {
  let start = points[0]
  for (let i = 0; i < points.length; i++) {
    if (periodStart <= points[i]) {
      start = points[i]
      break
    }
  }
  return start
}

export const createChartData = (
  mainData: MainData, period: {start: number, end: number}, step: number,
  param: valueType, pseudonyms: {[point: string]: string},
) => {
  const points = Object.keys(pseudonyms)
  return points.map((point) => {
    const newMap = new Map(mainData[point].entries())
    const resultX = [] as string[]
    const resultY = [] as number[]
    
    for (let i = period.start; i <= period.end; i += step) {
      const strDate = new Date(i).toLocaleString().replace(/.20\d\d,/, '')

      resultX.push(strDate.slice(0, strDate.length - 3))
      resultY.push(findByMainData(newMap, i)[param])
    }
    return {
      x: resultX,
      y: resultY,
      name: pseudonyms[point],
    }
  })
}

export const pointsPositionForPlot3D = (points: {[point: string]: {x: number, y: number, z: number}}) => {
  const result = {
    x: [] as number[],
    y: [] as number[],
    z: [] as number[],
    text: [] as string[],
  }
  Object.keys(points).forEach(point => {
    result.x.push(points[point].x)
    result.y.push(points[point].y)
    result.z.push(points[point].z)
    result.text.push(point)
  })
  return result
}

export const colorsArr = [
  '#8504b1', '#6900c2', '#4d12d1', '#3026de', '#0438ec', '#0048f9', '#006ef9',
  '#0092f8', '#00b4f6', '#00d6f6', '#00faf9', '#00fce3', '#00fdcf', '#00fdba',
  '#00fea6', '#22ff72', '#44ff53', '#64ff36', '#85ff19', '#b7ff00', '#c9ff00',
  '#dbff00', '#edff00', '#fefe00', '#fef100', '#fee300', '#ffd600', '#ffca00',
  '#ffb900', '#ff9200', '#ff6d00', '#ff4700', '#ff2000', '#ff0000', '#fb0000',
  '#e80000', '#d60000', '#c30000', '#af0000',
]

export const findColorsFromValue = (data: Map<number, string>, key: number) => {
  const keyInt = key
  const simpleResult = data.get(keyInt)
  if (simpleResult) return simpleResult
  const keys = Array.from(data.keys())
  if (keys[0] > keyInt) throw new Error('fun findByMainData: key is vary litle')
  if (keys[keys.length - 1] < keyInt) throw new Error('fun findByMainData: key is vary big')
  const key1 = binFind(keys, keyInt)[1]
  if (!data.get(key1)) new Error('fun findByMainData: bin search error')
  return data?.get(key1) as string
}

export const getChart3dData = (
  pointsPosition: ReturnType<typeof pointsPositionForPlot3D>,
  param: valueType, mode: funMode, maxValue: number,
  minValue: number, extremum: Extremums,
) => {
  const points = pointsPosition.text
  const values = points.map(point => extremum[point][param][mode].value)
  const pointsAndValues = points.map(point => `${extremum[point][param][mode].value}`)
  const colorsValuesMap = temperature2color(colorsArr, minValue , maxValue)
  const positionData = {...pointsPosition, text: pointsAndValues}
  const colorsValues = points.map((_, i) => findColorsFromValue(colorsValuesMap, values[i]))
  return {positionData, colorsValues, colorsValuesMap}
}

export const getChart3dDataFromTime = (
  pointsPosition: ReturnType<typeof pointsPositionForPlot3D>,
  param: valueType, mainData: MainData,
  time: number, fileMetaData: FileMetaData[],
) => {
  const points = pointsPosition.text
  const values = points.map(point => {
  const index = (() => {
    for (let i = 0; i < fileMetaData.length; i++) {
      console.log(point, fileMetaData[i].pseudonym)
      if (fileMetaData[i].pseudonym === point) return i
    }
    })()
    console.log({index})
    if (index === undefined) throw new Error('getChart3dDataFromTime no valid pseudinim')
    return findByMainData(mainData[fileMetaData[index].fileName], time)[param]
  })
  const maxValue = Math.max.apply(null, values)
  const minValue = Math.min.apply(null, values)
  const colorsValuesMap = temperature2color(colorsArr, minValue , maxValue)
  const positionData = {...pointsPosition, text: values.map(i => i.toString())}
  const colorsValues = points.map((_, i) => findColorsFromValue(colorsValuesMap, values[i]))
  return {positionData, colorsValues, colorsValuesMap}
} 

