import { Router, Request, Response } from 'express'
import * as cheeses from '../controllers/cheeses'
import * as auth from '../controllers/auth'

export const router: Router = Router()

router.get('/', (_req: Request, res: Response) => res.json({ message: 'Hello World!' }))

router.route('/cheeses')
  .get(cheeses.indexRoute)
  .post(cheeses.createRoute)

router.route('/cheeses/:id')
  .get(cheeses.showRoute)
  .put(cheeses.updateRoute)
  .delete(cheeses.deleteRoute)

router.post('/register', auth.registerRoute)
router.post('/login', auth.loginRoute)
