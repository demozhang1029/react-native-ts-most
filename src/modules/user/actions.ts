import { fromPromise } from 'most'
import * as _ from 'lodash'
import { Epic, select } from 'redux-most'
import {
    GeneralAction,
    User,
    USER_LOGIN,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUC,
    USER_LOGOUT,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_SUC,
    USER_REGISTER,
    USER_REGISTER_FAIL,
    USER_REGISTER_SUC,
    UserAction,
    UserForLogin,
} from '../../definitions'
import { login, logout, register } from '../../apis/user'
import { NavigationActions } from 'react-navigation'

export const userLogin = (user: UserForLogin): UserAction => ({ type: USER_LOGIN, payload: user })
export const userLogout = (user: User): UserAction => ({ type: USER_LOGOUT, payload: user })
export const userRegister = (user: UserForLogin): UserAction => ({ type: USER_REGISTER, payload: user })

const loginEpic: Epic<GeneralAction> = (action$) => action$.thru(select(USER_LOGIN))
    .chain((action: UserAction) => fromPromise(login((action.payload as UserForLogin))))
    .map((loginResponse: null | User) => (
        loginResponse
            ? {type: USER_LOGIN_SUC, payload: loginResponse}
            : {type: USER_LOGIN_FAIL}
    ))

const logoutEpic: Epic<GeneralAction> = (action$) => action$.thru(select(USER_LOGOUT))
    .chain((action: UserAction) => fromPromise(logout((action.payload as User).sessionToken)))
    .map((logoutResponse: null | User) => (
        logoutResponse
            ? {type: USER_LOGOUT_SUC, payload: logoutResponse}
            : {type: USER_LOGOUT_FAIL}
    ))

const registerEpic: Epic<GeneralAction> = (action$, store) => {
    return action$.thru(select(USER_REGISTER))
        .chain((action: UserAction) => fromPromise(register((action.payload as UserForLogin))))
        .map((registerResponse: null | User) => {
            if (!_.isEmpty(registerResponse)) {
                store.dispatch(NavigationActions.back())
                return {type: USER_REGISTER_SUC, payload: registerResponse}
            } else {
                return {type: USER_REGISTER_FAIL}
            }
        })
}

export const epics: Array<Epic<GeneralAction>> = [
    loginEpic,
    logoutEpic,
    registerEpic,
]
