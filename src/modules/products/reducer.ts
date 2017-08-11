import {
    BOUGHT_PRODUCTS_SUC,
    SOLD_PRODUCTS_SUC,
    ProductsState,
    ProductsAction,
} from '../../definitions'
import * as Redux from 'redux'

const initialState: ProductsState = []

const boughtProducts: Redux.Reducer<ProductsState> =
    (state: ProductsState, action: ProductsAction): ProductsState => {
        state = state || initialState
        switch (action.type) {
            case BOUGHT_PRODUCTS_SUC:
            {
                return action.success
            }
            default:
        }
        return state
    }

const soldProducts: Redux.Reducer<ProductsState> =
    (state: ProductsState, action: ProductsAction): ProductsState => {
        state = state || initialState
        switch (action.type) {
            case SOLD_PRODUCTS_SUC:
            {
                return action.success
            }
            default:
        }
        return state
    }

export default {
    boughtProducts,
    soldProducts,
}
