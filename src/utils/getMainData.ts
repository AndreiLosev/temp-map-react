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