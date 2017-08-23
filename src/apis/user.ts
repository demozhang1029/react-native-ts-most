import {
    User,
    UserForLogin
} from '../definitions'
import { fetchJson, headerWithSessionToken } from './utils'

export const login = (user: UserForLogin): Promise<User> => {
    return fetchJson('http://secondhand.leanapp.cn/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: user.password
        }),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}

export const logout = (sessionToken: string): Promise<User> => {
    return fetchJson('http://secondhand.leanapp.cn/users/logout', {
        method: 'GET',
        headers: {
            ...headerWithSessionToken(sessionToken),
            'Content-Type': 'application/json; charset=utf-8',
        },
    })
}

export const register = (user: UserForLogin): Promise<User> => {
    return fetchJson('http://secondhand.leanapp.cn/users/register', {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: user.password
        }),
    })
}
