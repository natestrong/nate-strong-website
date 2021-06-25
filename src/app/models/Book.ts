export interface Book {
  title: string,
  subtitle: string,
  author: string,
  website: string,
  image: string,
  startedDate: Date,
  finishedDate: Date,
  recommended: boolean,
  review: string,
  opacity?: number
}
