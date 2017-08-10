import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'

import * as D from '../../definitions'
import { uploadImage, createProduct } from '../../apis/products'

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE '
export const UPLOAD_IMAGE_SUC = 'UPLOAD_IMAGE_SUC'
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL'
export const PUBLISH_PRODUCT = 'PUBLISH_PRODUCT '
export const PUBLISH_PRODUCT_SUC = 'PUBLISH_PRODUCT_SUC'
export const PUBLISH_PRODUCT_FAIL = 'PUBLISH_PRODUCT_FAIL'

export const uploadProductImage =
    (user: D.User, fileData: string): D.UploadImageAction =>
        ({ type: UPLOAD_IMAGE, payload: { user, fileData } })

export const publishProduct =
    (user: D.User, draftProduct: D.DraftProduct): D.PublishProductAction =>
        ({ type: PUBLISH_PRODUCT, payload: { user, draftProduct } })

const uploadProductImageEpic: Epic<D.GeneralAction> = (action$) => action$.thru(select(UPLOAD_IMAGE))
    .chain((action: D.UploadImageAction) => 
        fromPromise(uploadImage(action.payload.user.sessionToken, action.payload.fileData))
    )
    .map((uploadImageResponse: null | string) => {
        return (
            uploadImageResponse
                ? { type: UPLOAD_IMAGE_SUC, payload: { url: uploadImageResponse } }
                : { type: UPLOAD_IMAGE_FAIL }
        )
    })

const publishProductEpic: Epic<D.GeneralAction> = (action$) => action$.thru(select(PUBLISH_PRODUCT))
    .chain((action: D.PublishProductAction) =>
        fromPromise(createProduct(action.payload.user.sessionToken, action.payload.draftProduct))
    ).map((publishProductResponse: null | string) => {
        return (
            publishProductResponse
                ? { type: PUBLISH_PRODUCT_SUC, payload: { url: publishProductResponse } }
                : { type: PUBLISH_PRODUCT_FAIL }
        )
    })

export const epics: Array<Epic<D.GeneralAction>> = [
    uploadProductImageEpic,
    publishProductEpic,
]