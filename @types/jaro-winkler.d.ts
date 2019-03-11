declare module 'jaro-winkler' {
  interface Options {
    caseSensitive: boolean
  }
  export default function distance(
    string1: string,
    string2: string,
    options?: Options,
  ): number
}
