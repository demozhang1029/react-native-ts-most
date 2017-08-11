import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'
import {
    BOUGHT_PRODUCTS,
    BOUGHT_PRODUCTS_SUC,
    BOUGHT_PRODUCTS_FAIL,
    SOLD_PRODUCTS,
    SOLD_PRODUCTS_SUC,
    SOLD_PRODUCTS_FAIL,
    User,
    Products,
    GeneralAction,
    ProductsAction,
} from '../../definitions'
import { boughtProducts, soldProducts } from '../../apis/products'

export const boughtProductsAction = (user: User): ProductsAction => ({ type: BOUGHT_PRODUCTS, payload: user})
export const soldProductsAction = (user: User): ProductsAction => ({ type: SOLD_PRODUCTS, payload: user})

const boughtProductsEpic: Epic<GeneralAction> = (action$ => action$.thru(select(BOUGHT_PRODUCTS))
    .chain((action: ProductsAction) => fromPromise(boughtProducts(action.payload.sessionToken)))
    .map((boughtProductsResponse: null | Products) => (
        boughtProductsResponse
            ? {type: BOUGHT_PRODUCTS_SUC, success: boughtProductsResponse}
            : {type: BOUGHT_PRODUCTS_FAIL}
    )))

const soldProductsEpic: Epic<GeneralAction> = (action$ => action$.thru(select(SOLD_PRODUCTS))
    .chain((action: ProductsAction) => fromPromise(soldProducts(action.payload.sessionToken)))
    .map((soldProductsResponse: null | Products) => (
        soldProductsResponse
            ? {type: SOLD_PRODUCTS_SUC, success: soldProductsResponse}
            : {type: SOLD_PRODUCTS_FAIL}
    )))

export const epics: Array<Epic<GeneralAction>> = [
    boughtProductsEpic,
    soldProductsEpic,
]
