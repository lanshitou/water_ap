export function decodeURLParams() {
  const search = location.search
  let params: Map<string, string>
  if (search && search !== '' && /\?(.+?=.+)/.test(search)) {
    params = new Map()
    search.split('?')[1].split('&').forEach((both) => {
      let e = both.split('=')
      params.set(e[0], decodeURIComponent(e[1]))
    })
  }
  //更新url为不带参数的防止多次解析url参数
  history.replaceState(undefined, undefined, `${location.origin}${location.pathname}${location.hash}`)
  return params
}
