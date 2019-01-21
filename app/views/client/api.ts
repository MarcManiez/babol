export function postLink(link: string) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return fetch(`/api/v1/link`, {
    body: JSON.stringify({ link }),
    headers,
    method: 'POST',
  })
}
