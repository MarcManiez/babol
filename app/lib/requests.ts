import fetch, { RequestInit, Response } from 'node-fetch'

function isJsonResponse(response: Response) {
  const contentType = response.headers.get('Content-Type')
  return contentType && contentType.includes('application/json')
}

function hasNoContent(response: Response) {
  return response.status === 204
}

function parseResponseBody(response: Response, body: string) {
  if (isJsonResponse(response)) {
    return body.length > 0 ? JSON.parse(body) : null
  } else {
    return body
  }
}

async function handleResponse(response: Response) {
  if (hasNoContent(response)) {
    return null
  }
  const text = await response.text()
  const body = parseResponseBody(response, text)
  console.log(body)
  console.log(response)
  if (response.ok) {
    return body
  } else {
    throw new ServerError(response, body)
  }
}

export async function post(path: string, options?: Partial<RequestInit>) {
  const requestOptions = Object.assign({ method: 'POST' }, options)
  return fetch(path, requestOptions).then(handleResponse)
}

export async function get(path: string, options?: Partial<RequestInit>) {
  return fetch(path, options).then(handleResponse)
}

export class ServerError extends Error {
  response: Response
  body: any

  constructor(response: Response, body: any) {
    super(response.statusText)
    this.response = response
    this.body = body
    Object.setPrototypeOf(this, ServerError.prototype)
  }

  get status(): number | string {
    return this.response.status || 0
  }
}
