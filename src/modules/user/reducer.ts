import * as D from '../../definitions'
import * as Redux from 'redux'

const initialState: D.UserState = {
    username: '',
    sessionToken: '',
}

const userReducer: Redux.Reducer<D.UserState> = (state: D.UserState, action: D.UserAction): D.UserState => {
    state = state || initialState
    switch (action.type) {
        case 'USER_LOGIN_SUC':
            return {
                ...state,
                ...action.payload,
            }
        case 'USER_LOGOUT_SUC':
            return {
                ...initialState
            }
        case 'USER_REGISTER_SUC':
            return {
                ...initialState
            }
        default:
    }
    return state
}

export default userReducer
