import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'
import {
	BOUGHT_PRODUCTS,
	BOUGHT_PRODUCTS_SUC,
	BOUGHT_PRODUCTS_FAIL,
	SOLD_PRODUCTS,
	SOLD_PRODUCTS_SUC,
	SOLD_PRODUCTS_FAIL,
	BUY_PRODUCT,
	BUY_PRODUCT_SUC,
	BUY_PRODUCT_FAIL,
	User,
	Products,
	GeneralAction,
	ProductsAction, BuyProduct, BuyProductAction,
} from '../../definitions'
import {boughtProducts, buyProduct, soldProducts} from '../../apis/products'

export const boughtProductsAction = (user: User): ProductsAction => ({ type: BOUGHT_PRODUCTS, payload: user})
export const soldProductsAction = (user: User): ProductsAction => ({ type: SOLD_PRODUCTS, payload: user})
export const buyProductAction = (product: BuyProduct) => ({type: BUY_PRODUCT, payload: product})

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

const buyProductEpic: Epic<GeneralAction> = (action$ => action$.thru(select(BUY_PRODUCT))
    .chain((action: BuyProductAction) => fromPromise(buyProduct(action.payload.sessionToken, action.payload.productId)))
    .map((buyProductResponse) => (
	    buyProductResponse ? {type: BUY_PRODUCT_SUC} : {type: BUY_PRODUCT_FAIL}
    )))

export const epics: Array<Epic<GeneralAction>> = [
    boughtProductsEpic,
    soldProductsEpic,
	  buyProductEpic,
]
