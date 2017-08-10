import * as D from '../../definitions'
import * as Redux from 'redux'

const initialState: D.PublishProductsState = {
  currentImageUrl: '',
}

const publishProductReducer: Redux.Reducer<D.PublishProductsState> =
  (state: D.PublishProductsState, action: D.GeneralAction): D.PublishProductsState => {
    state = state || initialState
    switch (action.type) {
      case 'UPLOAD_IMAGE_SUC':
        return {
          ...state,
          currentImageUrl: (action as D.UploadImageSucAction).payload.url,
        }
      default:
    }
    return state
  }

export default publishProductReducer
