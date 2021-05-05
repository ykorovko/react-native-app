import { NavigationActions } from '@react-navigation/compat'

let navigator

export const setNavigator = (nav) => {
  navigator = nav
}

export const navigate = (routeName: string, params?: object) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}
