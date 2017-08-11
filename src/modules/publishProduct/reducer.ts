import {
    UPLOAD_IMAGE_SUC,
    GeneralAction,
    PublishProductsState,
    UploadImageSucAction,
} from '../../definitions'
import * as Redux from 'redux'

const initialState: PublishProductsState = {
    currentImageUrl: '',
}

const publishProductReducer: Redux.Reducer<PublishProductsState> =
  (state: PublishProductsState, action: GeneralAction): PublishProductsState => {
    state = state || initialState
    switch (action.type) {
      case UPLOAD_IMAGE_SUC:
        return {
          ...state,
          currentImageUrl: (action as UploadImageSucAction).payload.url,
        }
      default:
    }
    return state
  }

export default publishProductReducer
