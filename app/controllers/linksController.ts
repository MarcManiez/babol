import { Request, Response } from 'express-serve-static-core'

export function post(req: Request, res: Response) {
  res.send({ hello: 'world' })
}
