import {Reducer} from 'redux'

class ProgresActionT {
  static SET_PROGRES = 'SET_PROGRES' as const
  static SET_VISIBLE = 'SET_VISIBLE' as const
}

export class ProgresAction {

  static createSetProgres = (progres: number) =>
    ({ type: ProgresActionT.SET_PROGRES, pyload: progres })

  static createSetVisible = (visible: boolean) =>
    ({ type: ProgresActionT.SET_VISIBLE, pyload: visible })
}

type Action =
  | ReturnType<typeof ProgresAction.createSetProgres>
  | ReturnType<typeof ProgresAction.createSetVisible>

const initState = {
  visible: true,
  progres: 75,
}

type ProgresState = typeof initState

export const progresReduser: Reducer<ProgresState, Action> = (state=initState, action) => {
  switch (action.type) {
    case ProgresActionT.SET_VISIBLE:
      return {...state, visible: action.pyload}
    case ProgresActionT.SET_PROGRES:
      return {...state, progres: action.pyload}
    default:
      return state
  }
}