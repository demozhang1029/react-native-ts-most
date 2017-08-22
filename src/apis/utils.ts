export const fetchJson = (url, option) => fetch(url, {
    ...option,
    headers: {
      ...option.headers,
      'Content-Type': 'application/json;',
    },
  })
  .then(response => {
    if (response.status < 400) {
      return response.json()
    }
    throw response
  })

export const headerWithSessionToken = (sessionToken: string) => {
   return {
       sessionToken: sessionToken
   }
}