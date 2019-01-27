import { StreamingService } from './types'

// tslint:disable:max-classes-per-file
export class StandardError extends Error {
  message: string
  body: any

  constructor(message: string, body: any) {
    super(message)
    this.body = body
    Object.setPrototypeOf(this, StandardError.prototype)
  }
}

export class UnknownStreamingServiceError extends Error {
  message: string

  constructor(url: string) {
    const message = `Url "${url}" could not be matched to services: ${Object.keys(
      StreamingService,
    ).join(', ')}`
    super(message)
    Object.setPrototypeOf(this, UnknownStreamingServiceError.prototype)
  }
}

export class IdParsingError extends Error {
  message: string

  constructor(url: string, streamingService: StreamingService) {
    const message = `Could not extract id for url "${url}" and streaming service "${streamingService}"`
    super(message)
    Object.setPrototypeOf(this, IdParsingError.prototype)
  }
}

export class LinkTypeParsingError extends Error {
  message: string

  constructor(url: string, streamingService: StreamingService) {
    const message = `Could not infer content type for url "${url}" and streaming service "${streamingService}"`
    super(message)
    Object.setPrototypeOf(this, LinkTypeParsingError.prototype)
  }
}
