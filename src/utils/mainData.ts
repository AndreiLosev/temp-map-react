import {myDatePars, roundIn10} from './lilteUtils'

export type MainItem = {
  temperature: number,
  humidity: number,
}

export type IntDate = number

export type MainData = {[point: string] :Map<IntDate, MainItem>}


export const getMainData = (data: string[], names: string[]) => {
  const reg = /\d\d.\d\d.\d\d\d\d\s\d\d:\d\d:\d\d;\S\S\S/
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
  const simleResult = data.get(keyInt)
  if (simleResult) return simleResult
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