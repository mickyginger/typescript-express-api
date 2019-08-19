import { RequestHandler } from 'express'
import { Cheese, ICheeseModel } from '../models/Cheese'

export const indexRoute: RequestHandler = (_req, res, next): void  => {
  Cheese.find()
    .then((cheeses: ICheeseModel[]) => res.json(cheeses))
    .catch(next)
}

export const showRoute: RequestHandler = (req, res, next): void  => {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => res.json(cheese))
    .catch(next)
}

export const createRoute: RequestHandler = (req, res, next): void  => {
  Cheese.create(req.body)
    .then((cheese: ICheeseModel) => res.status(201).json(cheese))
    .catch(next)
}

export const updateRoute: RequestHandler = (req, res, next): void  => {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => cheese.set(req.body))
    .then((cheese: ICheeseModel) => cheese.save())
    .then((cheese: ICheeseModel) => res.json(cheese))
    .catch(next)
}

export const deleteRoute: RequestHandler = (req, res, next): void  => {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => cheese.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}
