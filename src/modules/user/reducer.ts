import {
    USER_LOGIN_SUC,
    USER_LOGOUT_SUC,
    USER_REGISTER_SUC,
    UserAction,
    UserState,
} from '../../definitions'
import * as Redux from 'redux'

const initialState: UserState = {
    username: '',
    sessionToken: '',
}

const userReducer: Redux.Reducer<UserState> = (state: UserState, action: UserAction): UserState => {
    state = state || initialState
    switch (action.type) {
        case USER_LOGIN_SUC:
            return {
                ...state,
                ...action.payload,
            }
        case USER_LOGOUT_SUC:
            return {
                ...initialState
            }
        case USER_REGISTER_SUC:
            return {
                ...initialState
            }
        default:
    }
    return state
}

export default userReducer
