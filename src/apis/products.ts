import {
    Products,
    DraftProduct
} from '../definitions'
import {
    fetchJson,
    headerWithSessionToken
} from './utils'

export const boughtProducts = (sessionToken: string): Promise<Products> => {
    return fetchJson('http://secondhand.leanapp.cn/products/bought', {
        method: 'GET',
        headers: headerWithSessionToken(sessionToken),
    })
}

export const soldProducts = (sessionToken: string): Promise<Products> => {
    return fetchJson('http://secondhand.leanapp.cn/products/owned', {
        method: 'GET',
        headers: headerWithSessionToken(sessionToken),
    })
}

export const homeProducts = (): Promise<Products> => {
    return fetchJson('http://secondhand.leanapp.cn/products/', {
        method: 'GET'
    })
}

export const uploadImage = (sessionToken: string, fileData: string): Promise<string> => {
    const uri = fileData
    let uriParts = uri.split('.')
    let fileType = uriParts[uriParts.length - 1]
    let formData = new FormData()
    formData.append('img', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    })

    return fetchJson('http://secondhand.leanapp.cn/products/upload', {
        method: 'POST',
        body: formData,
        headers: {
            ...headerWithSessionToken(sessionToken),
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    })
}

export const createProduct = (sessionToken: string, draftProduct: DraftProduct): Promise<string> => {
    return fetchJson('http://secondhand.leanapp.cn/products/create', {
        method: 'POST',
        body: JSON.stringify(draftProduct),
        headers: {
            ...headerWithSessionToken(sessionToken),
            'Content-Type': 'application/json',
        },
    })
}
