import { reducer as nav } from './Router'
import app from '../modules/app/reducer'
import user from '../modules/user/reducer'
import homeProducts from '../modules/home/reducer';

export default {
    nav,
    app,
    user,
	  homeProducts,
}
