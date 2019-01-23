import { StreamingService } from '../../types'

export function detectStreamingService(link: string): StreamingService | null {
  const serviceRegexLists: { [service: string]: RegExp[] } = {
    apple: [/^https?:\/\/itun\.es\/\S+/g, /^https?:\/\/itunes.apple.com\/\S+/g],
    spotify: [
      /^https?:\/\/(play|open)\.spotify\.com\/\S+/g,
      /^spotify:(track|album|artist):.*/g,
    ],
  }
  for (const service in serviceRegexLists) {
    if (
      !serviceRegexLists[service] ||
      !Object.values(StreamingService).includes(service)
    ) {
      continue
    }
    if (serviceRegexLists[service].some(regex => !!link.match(regex))) {
      return service as StreamingService
    }
  }
  return null
}
