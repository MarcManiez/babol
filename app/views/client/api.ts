export function postLink(slug: string) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  return fetch(`/api/v1/link`, {
    body: JSON.stringify({ slug }),
    headers,
    method: 'POST',
  })
}
