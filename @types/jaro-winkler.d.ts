declare module 'jaro-winkler' {
  export = distance

  interface Options {
    caseSensitive: boolean
  }

  function distance(string1: string, string2: string, options?: Options): number
}
