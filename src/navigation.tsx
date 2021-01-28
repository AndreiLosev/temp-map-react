import React from 'react'


type NavContext = {
  loding: boolean,
  table: boolean,
  tempChart: boolean,
  humChart: boolean,
  goTo: (page: 'loding' | 'table' | 'tempChart' | 'humChart') => void
}

export const NavigatorContext = React.createContext<NavContext>({} as NavContext)

type Props = {
  child: JSX.Element
}

export const ContexNavigator: React.FC<Props> = ({child}) => {
  const [navigator, setNavigator] = React.useState({
    loding: true,
    table: false,
    tempChart: false,
    humChart: false,
  })
  type TPage = keyof typeof navigator
  const goTo = (page: TPage) => {
    const newNavigator = Object.keys(navigator).reduce((acc, item) => {
      if (item === page) return {...acc, [item]: true}
      else return {...acc, [item]: false}
    }, {} as typeof navigator)
    setNavigator(newNavigator)
  }
  return <NavigatorContext.Provider value={{...navigator, goTo}}>
      {child}
    </NavigatorContext.Provider>
}