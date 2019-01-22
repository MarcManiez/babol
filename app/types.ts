export class StandardError extends Error {
  message: string
  body: any

  constructor(message: string, body: any) {
    super(message)
    this.body = body
  }
}
