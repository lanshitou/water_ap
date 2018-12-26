export let ServerUrl = 'http://192.168.0.42:8000/v2'
export const MockServerUrl = 'http://result.eolinker.com/RNjf818c8cc1ceca89570334084bdefe70e711d4c50b20c?uri={{host}}/{{v}}'
export const OpenYs = '/openYs'


export function changeServerUrl(v: string) {
  ServerUrl = v
}

// export const ServerUrl = 'http://localhost:8000/v2'
// export const OpenYs = 'https://open.ys7.com/api'
