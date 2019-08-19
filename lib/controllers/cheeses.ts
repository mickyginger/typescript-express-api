import { Request, Response, NextFunction } from 'express'
import { Cheese, ICheeseModel } from '../models/Cheese'

export function indexRoute(_req: Request, res: Response, next: NextFunction): void {
  Cheese.find()
    .then((cheeses: ICheeseModel[]) => res.json(cheeses))
    .catch(next)
}

export function showRoute(req: Request, res: Response, next: NextFunction): void {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => res.json(cheese))
    .catch(next)
}

export function createRoute(req: Request, res: Response, next: NextFunction): void {
  Cheese.create(req.body)
    .then((cheese: ICheeseModel) => res.status(201).json(cheese))
    .catch(next)
}

export function updateRoute(req: Request, res: Response, next: NextFunction): void {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => cheese.set(req.body))
    .then((cheese: ICheeseModel) => cheese.save())
    .then((cheese: ICheeseModel) => res.json(cheese))
    .catch(next)
}

export function deleteRoute(req: Request, res: Response, next: NextFunction): void {
  Cheese.findById(req.params.id)
    .then((cheese: ICheeseModel) => cheese.remove())
    .then(() => res.sendStatus(204))
    .catch(next)
}
