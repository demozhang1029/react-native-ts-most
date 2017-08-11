import * as D from '../definitions'

export const boughtProducts = (sessionToken: string): Promise<D.Products> => {
    let header = new Headers()
    header.append('sessionToken', sessionToken)

    const response = fetch('http://secondhand.leanapp.cn/products/bought', {
        method: 'GET',
        headers: header,
    })

    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
    })
}

export const soldProducts = (sessionToken: string): Promise<D.Products> => {
    let header = new Headers()
    header.append('sessionToken', sessionToken)
    const response = fetch('http://secondhand.leanapp.cn/products/owned', {
        method: 'GET',
        headers: header,
    })

    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
    })
}

export const homeProducts = (): Promise<D.Products> => {
    const response = fetch('http://secondhand.leanapp.cn/products/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
    })
}

export const uploadImage = (sessionToken: string, fileData: string): Promise<string> => {
    let formData = new FormData()
    formData.append('img', fileData)

    let header = new Headers()
    header.append('sessionToken', sessionToken)

    const response = fetch('http://secondhand.leanapp.cn/products/upload', {
        method: 'POST',
        body: formData,
        headers: header,
    })
    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
        return null
    })
}

export const createProduct = (sessionToken: string, draftProduct: D.DraftProduct): Promise<string> => {
    let header = new Headers()
    header.append('sessionToken', sessionToken)

    const response = fetch('http://secondhand.leanapp.cn/products/create', {
        method: 'POST',
        body: JSON.stringify(draftProduct),
        headers: header,
    })

    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
        return null
    })
}
