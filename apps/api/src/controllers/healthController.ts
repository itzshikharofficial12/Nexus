import { Response } from 'express'

export const getHealth = (_req: unknown, res: Response) => {
  res.json({ status: 'OK' })
}
