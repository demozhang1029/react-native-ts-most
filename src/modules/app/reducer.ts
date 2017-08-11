import {
    AppState,
} from '../../definitions'
import * as Redux from 'redux'

const initialState: AppState  = {
    loading: false,
    logined: false,
}

const appReducer: Redux.Reducer<AppState> = (state: AppState, action: Redux.Action): AppState => {
    state = state || initialState
    return state
}

export default appReducer
