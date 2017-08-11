import { combineEpics } from 'redux-most'

import { epics as userEpic } from '../modules/user/actions'
import { epics as productEpic } from '../modules/products/actions'
import { epics as homeEpic } from '../modules/home/actions'
import { epics as publishProductEpic } from '../modules/publishProduct/actions'

export default combineEpics([
    ...userEpic,
    ...productEpic,
    ...homeEpic,
    ...publishProductEpic,
])