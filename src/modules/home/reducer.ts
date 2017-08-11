import {
    FETCH_HOME_PRODUCTS_SUC,
    HomeProductsState,
    HomeProducts,
    Products,
    GeneralAction,
} from '../../definitions'
import * as Redux from 'redux'

const initialState: HomeProducts = {
    products: [],
}

const productReducer: Redux.Reducer<HomeProductsState> =
    (state: HomeProductsState, action: GeneralAction): HomeProductsState => {
        state = state || initialState
        switch (action.type) {
            case FETCH_HOME_PRODUCTS_SUC:
                const products = action.payload as Products
                return {
                    ...state,
                    products,
                }
            default:
        }
        return state
    }

export default productReducer
