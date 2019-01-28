import { links } from '../../routeHelpers'

export function postLink(link: string) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return fetch(`/api/v1${links}`, {
    body: JSON.stringify({ link }),
    headers,
    method: 'POST',
  })
}
