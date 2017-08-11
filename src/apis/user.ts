import * as D from '../definitions'

export const login = (user: D.UserForLogin): Promise<D.User> => {
    const response = fetch('http://secondhand.leanapp.cn/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: user.password
        }),
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

export const logout = (sessionToken: string): Promise<D.User> => {
    let header = new Headers()
    header.append('sessionToken', sessionToken)

    const response = fetch('http://secondhand.leanapp.cn/users/logout', {
        method: 'GET',
        headers: header,
    })

    return response.then((Response) => {
        if (Response.status === 200) {
            return Response.json()
        }
    })
}

export const register = (user: D.UserForLogin): Promise<D.User> => {
    const response = fetch('http://secondhand.leanapp.cn/users/register', {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: user.password
        }),
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
