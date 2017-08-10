import * as D from '../../definitions'
import * as Redux from 'redux'

const initialState: D.HomeProducts = {
    products: [],
}

const productReducer: Redux.Reducer<D.HomeProductsState> =
    (state: D.HomeProductsState, action: D.GeneralAction): D.HomeProductsState => {
        state = state || initialState
        switch (action.type) {
            case 'FETCH_HOME_PRODUCTS_SUC':
                const products = action.payload as D.Product[]
                return {
                    ...state,
                    products,
                }
            default:
        }
        return state
    }

export default productReducer
