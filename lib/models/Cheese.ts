import { Document, Schema, Model, model } from 'mongoose'
import { ICheese } from '../interfaces/ICheese'

export interface ICheeseModel extends ICheese, Document {

}

export const cheeseSchema: Schema = new Schema({
  name: { type: String, required: true },
  origin: { type: String, required: true },
  image: { type: String, required: true },
  tastingNotes: { type: String, required: true }
})

export const Cheese: Model<ICheeseModel> = model<ICheeseModel>('Cheese', cheeseSchema)
