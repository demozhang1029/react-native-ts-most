import {
    AppState,
    USER_LOGIN_SUC,
    USER_LOGOUT_SUC
} from '../../definitions'
import * as Redux from 'redux'

const initialState: AppState  = {
    loading: false,
    logined: false,
}

const appReducer: Redux.Reducer<AppState> = (state: AppState, action: Redux.Action): AppState => {
    state = state || initialState
    switch (action.type) {
        case USER_LOGIN_SUC:
            return {
                ...state,
                logined: true
            }
        case USER_LOGOUT_SUC:
            return {
                ...state,
                logined: false
            }
        default:
    }
    return state
}

export default appReducer
