import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'

import * as D from '../../definitions'
import { homeProducts } from '../../apis/products'

export const FETCH_HOME_PRODUCTS = 'FETCH_HOME_PRODUCTS '
export const FETCH_HOME_PRODUCTS_SUC = 'FETCH_HOME_PRODUCTS_SUC'
export const FETCH_HOME_PRODUCTS_FAIL = 'FETCH_HOME_PRODUCTS_FAIL'

export const getHomeProducts = (): D.FetchHomeProductsAction => ({ type: FETCH_HOME_PRODUCTS })

const fetchHomeProductsEpic: Epic<D.GeneralAction> = (action$) => action$.thru(select(FETCH_HOME_PRODUCTS))
    .chain((action: D.FetchHomeProductsAction) => fromPromise(homeProducts()))
    .map((homeProductsRepoonse: null | D.Product[]) => {
        return (
            homeProductsRepoonse
                ? { type: FETCH_HOME_PRODUCTS_SUC, payload: homeProductsRepoonse }
                : { type: FETCH_HOME_PRODUCTS_FAIL }
        )
    })

export const epics: Array<Epic<D.GeneralAction>> = [
    fetchHomeProductsEpic,
]