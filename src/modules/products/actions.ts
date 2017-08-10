import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'

import * as D from '../../definitions'
import { boughtProducts, soldProducts } from '../../apis/products'

export const BOUGHT_PRODUCTS = 'BOUGHT_PRODUCTS'
export const SOLD_PRODUCTS = 'SOLD_PRODUCTS'
export const BOUGHT_PRODUCTS_SUC = 'BOUGHT_PRODUCTS_SUC'
export const SOLD_PRODUCTS_SUC = 'SOLD_PRODUCTS_SUC'
export const BOUGHT_PRODUCTS_FAIL = 'BOUGHT_PRODUCTS_FAIL'
export const SOLD_PRODUCTS_FAIL = 'SOLD_PRODUCTS_FAIL'

export const boughtProductsAction = (user: D.User): D.ProductsAction => ({ type: BOUGHT_PRODUCTS, payload: user})
export const soldProductsAction = (user: D.User): D.ProductsAction => ({ type: SOLD_PRODUCTS, payload: user})

const boughtProductsEpic: Epic<D.GeneralAction> = (action$ => action$.thru(select(BOUGHT_PRODUCTS))
    .chain((action: D.ProductsAction) => fromPromise(boughtProducts(action.payload.sessionToken)))
    .map((boughtProductsResponse: null | D.Products) => (
        boughtProductsResponse
            ? {type: BOUGHT_PRODUCTS_SUC, success: boughtProductsResponse}
            : {type: BOUGHT_PRODUCTS_FAIL}
    )))

const soldProductsEpic: Epic<D.GeneralAction> = (action$ => action$.thru(select(SOLD_PRODUCTS))
    .chain((action: D.ProductsAction) => fromPromise(soldProducts(action.payload.sessionToken)))
    .map((soldProductsResponse: null | D.Products) => (
        soldProductsResponse
            ? {type: SOLD_PRODUCTS_SUC, success: soldProductsResponse}
            : {type: SOLD_PRODUCTS_FAIL}
    )))

export const epics: Array<Epic<D.GeneralAction>> = [
    boughtProductsEpic,
    soldProductsEpic,
]
