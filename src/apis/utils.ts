export const fetchJson = (url, option) => {
    const {headers, ...reset} = option
    return fetch(url, {
        ...reset,
        headers: headers,
    }).then(response => {
        if (response.status < 400) {
            return response.json()
        }
        throw response
    })
}

export const headerWithSessionToken = (sessionToken: string) => {
   return {
       sessionToken: sessionToken
   }
}