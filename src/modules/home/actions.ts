import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'
import {
    FETCH_HOME_PRODUCTS,
    FETCH_HOME_PRODUCTS_SUC,
    FETCH_HOME_PRODUCTS_FAIL,
    GeneralAction,
    FetchHomeProductsAction,
    Products,
} from '../../definitions'
import { homeProducts } from '../../apis/products'

export const getHomeProducts = (): FetchHomeProductsAction => ({ type: FETCH_HOME_PRODUCTS })

const fetchHomeProductsEpic: Epic<GeneralAction> = (action$) => action$.thru(select(FETCH_HOME_PRODUCTS))
    .chain((action: FetchHomeProductsAction) => fromPromise(homeProducts()))
    .map((homeProductsRepoonse: null | Products) => {
        return (
            homeProductsRepoonse
                ? { type: FETCH_HOME_PRODUCTS_SUC, payload: homeProductsRepoonse }
                : { type: FETCH_HOME_PRODUCTS_FAIL }
        )
    })

export const epics: Array<Epic<GeneralAction>> = [
    fetchHomeProductsEpic,
]