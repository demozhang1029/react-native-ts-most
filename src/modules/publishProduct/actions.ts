import { fromPromise } from 'most'
import { select, Epic } from 'redux-most'
import {
    UPLOAD_IMAGE,
    PUBLISH_PRODUCT,
    PUBLISH_PRODUCT_SUC,
    PUBLISH_PRODUCT_FAIL,
    UPLOAD_IMAGE_SUC,
    UPLOAD_IMAGE_FAIL,
    GeneralAction,
    UploadImageAction,
    PublishProductAction,
    User,
    DraftProduct,
} from '../../definitions'
import { uploadImage, createProduct } from '../../apis/products'

export const uploadProductImage =
    (user: User, fileData: string): UploadImageAction =>
        ({ type: UPLOAD_IMAGE, payload: { user, fileData } })

export const publishProduct =
    (user: User, draftProduct: DraftProduct): PublishProductAction =>
        ({ type: PUBLISH_PRODUCT, payload: { user, draftProduct } })

const uploadProductImageEpic: Epic<GeneralAction> = (action$) => action$.thru(select(UPLOAD_IMAGE))
    .chain((action: UploadImageAction) =>
        fromPromise(uploadImage(action.payload.user.sessionToken, action.payload.fileData))
    )
    .map((uploadImageResponse: null | string) => {
        return (
            uploadImageResponse
                ? { type: UPLOAD_IMAGE_SUC, payload: { url: uploadImageResponse } }
                : { type: UPLOAD_IMAGE_FAIL }
        )
    })

const publishProductEpic: Epic<GeneralAction> = (action$) => action$.thru(select(PUBLISH_PRODUCT))
    .chain((action: PublishProductAction) =>
        fromPromise(createProduct(action.payload.user.sessionToken, action.payload.draftProduct))
    ).map((publishProductResponse: null | string) => {
        return (
            publishProductResponse
                ? { type: PUBLISH_PRODUCT_SUC, payload: { url: publishProductResponse } }
                : { type: PUBLISH_PRODUCT_FAIL }
        )
    })

export const epics: Array<Epic<GeneralAction>> = [
    uploadProductImageEpic,
    publishProductEpic,
]