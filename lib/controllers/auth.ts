import { RequestHandler } from 'express'
import { sign } from 'jsonwebtoken'
import { User, IUserModel } from '../models/User'
import { SECRET } from '../config/environment'

export const registerRoute: RequestHandler = (req, res, next): void => {
  User.create(req.body)
    .then(() => res.json({ message: 'Registeration successful' }))
    .catch(next)
}

export const loginRoute: RequestHandler = (req, res, next): void => {
  User.findOne({ email: req.body.email })
    .then((user: IUserModel) => {
      const token = sign({ sub: user._id }, SECRET, { expiresIn: '6h' })
      res.json({
        message: 'Login successful',
        token,
        user
      })
    })
    .catch(next)
}
