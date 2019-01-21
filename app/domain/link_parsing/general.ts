export enum StreamingServices {
  Spotify = 'spotify',
  Apple = 'apple',
}

export function detectStreamingService(link: string): StreamingServices | null {
  const serviceRegexLists: { [service: string]: RegExp[] } = {
    apple: [/^https?:\/\/itun\.es\/\S+/g],
    spotify: [
      /^https?:\/\/(play|open)\.spotify\.com\/\S+/g,
      /^spotify:(track|album|artist):.*/g,
    ],
  }
  for (const service in serviceRegexLists) {
    if (
      !serviceRegexLists[service] ||
      !Object.values(StreamingServices).includes(service)
    ) {
      continue
    }
    if (serviceRegexLists[service].some(regex => !!link.match(regex))) {
      return service as StreamingServices
    }
  }
  return null
}
