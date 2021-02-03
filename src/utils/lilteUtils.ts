type Year = 2021 | 2022 | 2023 | 2024 
type Munth = 0 | 1 | 2 | 3 | 4 | 5 | 6
type Day = 1 | 2 | 3 | 4 | 5 | 6
type Hours = 1 | 2 | 3 | 4 | 5 | 6 | 7
type Minuts = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const myDatePars = (date: string): [Year, Munth, Day, Hours, Minuts] => {
  const [dateS, timeS] = date.split(' ')
  const dateArrS = dateS ? dateS.split('.') : ''
  const timeArrS = timeS ? timeS.split(':') : ''
  const year =  parseInt(dateArrS[2]) as Year
  const month = parseInt(dateArrS[1]) - 1 as Munth
  const day = parseInt(dateArrS[0]) as Day
  const hours = parseInt(timeArrS[0]) as Hours
  const minuts = parseInt(timeArrS[1]) as Minuts
  return [year, month, day, hours, minuts]
}

export const roundIn10 = (value: number) => {
  return Math.round(value * 10) / 10
}

export const promisifySyncFun = (calbek: (...values: any) => any, ...params: any) => new Promise((resolve, _) => {
  setTimeout(() => resolve(calbek.apply(undefined, params)))
})