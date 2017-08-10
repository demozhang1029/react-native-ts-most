import * as D from '../../definitions'
import * as Redux from 'redux'

const initialState: D.ProductsState = []

const boughtProducts: Redux.Reducer<D.ProductsState> =
    (state: D.ProductsState, action: D.ProductsAction): D.ProductsState => {
        state = state || initialState
        switch (action.type) {
            case 'BOUGHT_PRODUCTS_SUC':
            {
                return action.success
            }
            default:
        }
        return state
    }

const soldProducts: Redux.Reducer<D.ProductsState> =
    (state: D.ProductsState, action: D.ProductsAction): D.ProductsState => {
        state = state || initialState
        switch (action.type) {
            case 'SOLD_PRODUCTS_SUC':
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
